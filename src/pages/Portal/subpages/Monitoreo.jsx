import React, { useState, useEffect, useMemo, useRef } from "react";
import { getBonds, validateSale, cancelSale, updateSale, getAuditLogs } from "../../../services/api";
import "./Monitoreo.css";

export default function Monitoreo() {
  // --- ESTADOS DE DATOS ---
  const [logs, setLogs] = useState([]);      // Ventas reales desde el Excel
  const [audit, setAudit] = useState([]);    // Historial de acciones (Auditoría)
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("ops"); // 'ops' (Ventas) o 'audit' (Caja Negra)
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBono, setEditingBono] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- RELOJ Y SINCRONIZACIÓN ---
  useEffect(() => {
    fetchData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const sync = setInterval(fetchData, 60000); // Sincroniza cada 1 minuto
    return () => { clearInterval(timer); clearInterval(sync); };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Traemos tanto las ventas como los logs de auditoría en paralelo
      const res = await getBonds();
      // El App Script V33 devuelve { sales: [], delegates: [], audit: [] }
      setLogs(res.sales ? [...res.sales].reverse() : []);
      setAudit(res.audit ? [...res.audit] : []);
    } catch (e) { 
      console.error("SYSTEM_SYNC_ERROR", e); 
    }
    setLoading(false);
  };

  // --- MOTOR DE INTELIGENCIA (CJ-PILOT INSIGHTS) ---
  const aiInsights = useMemo(() => {
    const pending = logs.filter(l => l.estado === "PENDIENTE");
    const totalV = logs.length;
    const insights = [];

    if (pending.length > 0) {
      insights.push({ type: 'warning', msg: `IA_ALERT: Hay ${pending.length} transacciones esperando tu validación.` });
    }
    if (totalV > 0) {
      insights.push({ type: 'success', msg: `CJ-PILOT: Se han registrado ${totalV} ventas exitosas en el sistema federal.` });
    }
    insights.push({ type: 'info', msg: `SISTEMA: Estación CJ_ADMIN conectada. Base de datos: G_SHEETS_V33.` });
    
    return insights;
  }, [logs]);

  // --- BUSCADOR TÁCTICO (FILTRO TOTAL) ---
  const filteredData = useMemo(() => {
    return logs.filter(l => 
      l.comprador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.vendedor.toString().includes(searchTerm) ||
      l.id_bono?.toString().includes(searchTerm) ||
      l.vendedor_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  // --- ACCIONES DE COMANDO (CRUD) ---
  // IMPORTANTE: Ahora usamos id_bono (el ID global único) para no confundir números
  const handleAction = async (action, id_bono_global, data = {}) => {
    if (!window.confirm(`¿EJECUTAR ORDEN DE ${action.toUpperCase()} PARA EL BONO #${id_bono_global}?`)) return;
    
    setLoading(true);
    let res;
    try {
      if (action === 'validar') res = await validateSale(id_bono_global);
      if (action === 'cancelar') res = await cancelSale(id_bono_global);
      if (action === 'editar') res = await updateSale(id_bono_global, data);
      
      if (res && res.status === 'success') {
        setEditingBono(null);
        await fetchData(); // Recargamos todo
      } else {
        alert("Error: " + (res?.message || "Fallo en el servidor"));
      }
    } catch (err) {
      alert("Error crítico de comunicación con la base de datos.");
    }
    setLoading(false);
  };

  const totalRecaudado = logs.length * 15000;
  const utilidadCJ = totalRecaudado * 0.35;

  return (
    <div className="monitoreo-v32-root anim-fade-in">
      
      {/* 1. TERMINAL HEADER */}
      <header className="terminal-header-v32">
        <div className="th-branding">
          <div className="pulse-aura"><div className="dot"></div></div>
          <div className="th-titles">
            <span className="th-code">STATION_ID: CJ_ADMIN_CENTRAL_CORE</span>
            <h2 className="th-main-title">CONSOLA DE <span>MONITOREO</span></h2>
          </div>
        </div>
        <div className="th-clock-box">
          <div className="th-time">{currentTime.toLocaleTimeString()}</div>
          <div className="th-date">{currentTime.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
        </div>
      </header>

      {/* 2. ANALYTICS DOCK */}
      <section className="analytics-dock-v32">
        <div className="a-card glass-impact">
          <span className="a-label">OPERACIONES FEDERALES</span>
          <div className="a-value">{logs.length} <small>/ 768</small></div>
          <div className="a-bar"><div className="a-fill" style={{width: `${(logs.length/768)*100}%`}}></div></div>
        </div>
        <div className="a-card glass-impact highlight">
          <span className="a-label">RECAUDACIÓN BRUTA</span>
          <div className="a-value">${totalRecaudado.toLocaleString()}</div>
          <span className="a-subtext">GANANCIA PRODUCTORA (35%): <strong>${utilidadCJ.toLocaleString()}</strong></span>
        </div>
        <div className="a-card glass-impact">
          <span className="a-label">ESTADO DE RED</span>
          <div className="a-value">99.9<small>%</small></div>
          <span className="a-subtext">ENCRYPT_MODE: AES-256_ACTIVE</span>
        </div>
      </section>

      {/* 3. TACTICAL NAVIGATION */}
      <nav className="tactical-nav-v32">
        <div className="tactical-search">
          <span className="t-icon">🔍</span>
          <input 
            type="text" 
            placeholder="BUSCAR POR NOMBRE, DNI, ID_BONO O DELEGADO..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="tactical-tabs">
          <button className={viewMode === 'ops' ? 'active' : ''} onClick={() => setViewMode('ops')}>OPERACIONES</button>
          <button className={viewMode === 'audit' ? 'active' : ''} onClick={() => setViewMode('audit')}>AUDITORÍA_LOGS</button>
        </div>
      </nav>

      {/* 4. MAIN MONITORING VIEWPORT */}
      <div className="main-viewport-grid">
        
        <section className="viewport-content">
          {viewMode === 'ops' ? (
            <div className="ops-scroll-area">
              {filteredData.length === 0 ? (
                <div className="empty-tech">NO SE DETECTAN TRANSACCIONES ACTIVAS...</div>
              ) : (
                filteredData.map((log, i) => (
                  <article key={i} className={`op-log-card ${log.estado.toLowerCase()}`}>
                    <div className="op-log-header">
                      <div className="op-log-user">
                        {/* AHORA SÍ APARECE EL NOMBRE DEL DELEGADO */}
                        <span className="u-name">{log.vendedor_nombre}</span>
                        <span className="u-id">DNI_VENDEDOR: {log.vendedor}</span>
                      </div>
                      <div className="op-log-status">{log.estado}</div>
                    </div>
                    <div className="op-log-body">
                      {/* CORREGIDO: Muestra el ID_BONO Real (1-768) */}
                      <p>TRANSACCIÓN: <strong>BONO #{log.id_bono}</strong> <small>(Num: {log.n_bono})</small></p>
                      <p>CLIENTE: <strong>{log.comprador}</strong> | DNI: {log.dni_comp}</p>
                      <span className="op-log-time">{new Date(log.fecha).toLocaleString()}</span>
                    </div>
                    <div className="op-log-actions">
                      {log.estado === "PENDIENTE" && (
                        <button className="btn-op green" onClick={() => handleAction('validar', log.id_bono)}>VALIDAR</button>
                      )}
                      <button className="btn-op blue" onClick={() => setEditingBono(log)}>EDITAR</button>
                      <button className="btn-op red" onClick={() => handleAction('cancelar', log.id_bono)}>ANULAR</button>
                    </div>
                  </article>
                ))
              )}
            </div>
          ) : (
            <div className="audit-table-wrap">
              <table className="audit-table-v32">
                <thead>
                  <tr><th>HORA</th><th>USUARIO</th><th>ACCIÓN</th><th>DETALLE TÉCNICO</th></tr>
                </thead>
                <tbody>
                  {audit.length === 0 ? (
                    <tr><td colSpan="4" style={{textAlign:'center', padding:'50px'}}>SIN REGISTROS DE AUDITORÍA</td></tr>
                  ) : (
                    audit.map((a, i) => (
                      <tr key={i}>
                        <td>{new Date(a.fecha).toLocaleTimeString()}</td>
                        <td className="txt-white">{a.usuario}</td>
                        <td><span className="pill-action">{a.accion}</span></td>
                        <td className="txt-dim">{a.detalle}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 5. SIDEBAR: IA */}
        <aside className="viewport-sidebar">
          <div className="sidebar-module ia-engine">
            <header className="mod-head">
              <div className="led-status"></div>
              <span>CJ-PILOT ANALYTICS</span>
            </header>
            <div className="ia-insights-list">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className={`insight-card ${insight.type}`}>
                  <p>{insight.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-module hardware-stats">
             <header className="mod-head"><span>SISTEMA VIRTUAL</span></header>
             <div className="hw-line"><span>GATEWAY:</span> <strong>GOOGLE_CLOUD</strong></div>
             <div className="hw-line"><span>STORAGE:</span> <strong>G_SHEETS_V33</strong></div>
             <div className="hw-line"><span>PROTOCOL:</span> <strong>SSL_ENCRYPTED</strong></div>
          </div>
        </aside>

      </div>

      {/* 6. MODAL DE EDICIÓN */}
      {editingBono && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card anim-scale-up">
            <h3>EDITAR TRANSACCIÓN: BONO #{editingBono.id_bono}</h3>
            <div className="admin-modal-form">
              <div className="am-field"><label>NOMBRE COMPRADOR</label><input type="text" defaultValue={editingBono.comprador} id="edit_name" /></div>
              <div className="am-field"><label>DNI COMPRADOR</label><input type="number" defaultValue={editingBono.dni_comp} id="edit_dni" /></div>
              <div className="am-field"><label>TELÉFONO</label><input type="tel" defaultValue={editingBono.tel} id="edit_tel" /></div>
              <div className="am-btns">
                <button className="btn-am-close" onClick={() => setEditingBono(null)}>CANCELAR</button>
                <button className="btn-am-save" onClick={() => handleAction('editar', editingBono.id_bono, {
                  comprador_nombre: document.getElementById('edit_name').value,
                  comprador_dni: document.getElementById('edit_dni').value,
                  telefono: document.getElementById('edit_tel').value
                })}>GUARDAR CAMBIOS</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}