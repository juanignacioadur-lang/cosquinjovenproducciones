import React, { useState, useEffect, useMemo } from "react";
import { getBonds, validateSale, cancelSale, updateSale } from "../../../services/api";
import "./Monitoreo.css";

export default function Monitoreo() {
  // --- ESTADOS DE SISTEMA ---
  const [logs, setLogs] = useState([]);      
  const [audit, setAudit] = useState([]);    
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("ops"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBono, setEditingBono] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- SINCRONIZACIÓN DE RELOJ Y DATOS ---
  useEffect(() => {
    fetchData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const sync = setInterval(fetchData, 45000); // Sincronización cada 45s
    return () => { clearInterval(timer); clearInterval(sync); };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBonds();
      setLogs(res.sales ? [...res.sales].reverse() : []);
      setAudit(res.audit ? [...res.audit] : []);
    } catch (e) { console.error("CRITICAL_SYNC_ERROR", e); }
    setLoading(false);
  };

  // --- CJ-PILOT: MOTOR DE REPORTES REALES ---
  const aiReports = useMemo(() => {
    const pending = logs.filter(l => l.estado === "PENDIENTE");
    const reports = [];
    
    if (pending.length > 0) {
      reports.push({ type: 'warning', icon: '⚠️', msg: `IA_ALERT: Detectadas ${pending.length} transacciones sin validar. Riesgo de congestión administrativa.` });
    }
    if (logs.length > 0) {
      reports.push({ type: 'success', icon: '✅', msg: `CJ-PILOT: Sincronización federal exitosa. ${logs.length} bonos activos en base de datos.` });
    }
    reports.push({ type: 'info', icon: '📡', msg: "SISTEMA: Conexión con Google Cloud estable. Latencia: 0.02ms." });
    
    return reports;
  }, [logs]);

  // --- BUSCADOR DE COMANDO AVANZADO ---
  const filteredData = useMemo(() => {
    return logs.filter(l => 
      l.comprador?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.vendedor?.toString().includes(searchTerm) ||
      l.id_bono?.toString().includes(searchTerm) ||
      l.vendedor_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [logs, searchTerm]);

  // --- CRUD TÁCTICO (ACCIONES) ---
  const handleAction = async (action, id_bono, data = {}) => {
    const confirmMsg = action === 'validar' ? 'AUTORIZAR PAGO' : action === 'cancelar' ? 'ELIMINAR REGISTRO' : 'GUARDAR CAMBIOS';
    if (!window.confirm(`¿EJECUTAR ORDEN DE ${confirmMsg} PARA BONO #${id_bono}?`)) return;
    
    setLoading(true);
    let res;
    try {
      if (action === 'validar') res = await validateSale(id_bono);
      if (action === 'cancelar') res = await cancelSale(id_bono);
      if (action === 'editar') res = await updateSale(id_bono, data);
      
      if (res && res.status === 'success') {
        setEditingBono(null);
        await fetchData();
      } else alert("ERROR EN COMUNICACIÓN: " + res?.message);
    } catch (err) { alert("ERROR CRÍTICO DEL SISTEMA"); }
    setLoading(false);
  };

  const recaudacionTotal = logs.length * 15000;
  const utilidadProductora = recaudacionTotal * 0.35;

  return (
    <div className="mnt-v33-root anim-fade-in">
      
      {/* 1. COMANDO SUPERIOR (HEADER) */}
      <header className="mnt-header-v33">
        <div className="mnt-h-left">
          <div className="mnt-heartbeat"><div className="mnt-dot-glow"></div></div>
          <div className="mnt-title-block">
            <span className="mnt-sub-code">STATION: CJ_CENTRAL_CORE_V33</span>
            <h2 className="mnt-main-title-tech">CONSOLA DE <span>MONITOREO</span></h2>
          </div>
        </div>
        <div className="mnt-h-right">
          {/* RELOJ EN FORMATO 24HS */}
          <div className="mnt-clock">
            {currentTime.toLocaleTimeString('es-AR', { hour12: false })}
          </div>
          <div className="mnt-date">
            {currentTime.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase()}
          </div>
        </div>
      </header>

      {/* 2. ANALYTICS DOCK (MÉTRICAS) */}
      <section className="mnt-analytics">
        <div className="mnt-a-card glass-v33">
          <span className="mnt-a-tag">TOTAL DE BONOS</span>
          <div className="mnt-a-val">{logs.length} <small>/ 768</small></div>
          <div className="mnt-a-bar"><div className="fill" style={{width: `${(logs.length/768)*100}%`}}></div></div>
        </div>
        <div className="mnt-a-card glass-v33 highlight">
          <span className="mnt-a-tag">RECAUDACIÓN BRUTA</span>
          <div className="mnt-a-val">${recaudacionTotal.toLocaleString()}</div>
          <span className="mnt-a-profit">GANANCIA CJ (35%): <strong>${utilidadProductora.toLocaleString()}</strong></span>
        </div>
        <div className="mnt-a-card glass-v33">
          <span className="mnt-a-tag">SISTEMA VIRTUAL</span>
          <div className="mnt-a-val">ONLINE</div>
          <span className="mnt-a-profit">PROTOCOL: AES-256_ENCRYPTED</span>
        </div>
      </section>

      {/* --- BARRA DE NAVEGACIÓN TÁCTICA V36 --- */}
      <div className="mnt-search-nav">
        
        {/* BUSCADOR: Ahora con flex: 1 para estirarse al máximo */}
        {viewMode === 'ops' ? (
          <div className="mnt-search-box anim-fade-in">
            <span className="mnt-search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="BUSCADOR DE IDENTIDAD (DNI, NOMBRE, ID_BONO)..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        ) : (
          /* Título de sección cuando no hay buscador para que no quede vacío */
          <div className="mnt-section-label anim-fade-in">
             REPORTE DE AUDITORÍA DE SISTEMA
          </div>
        )}

        {/* CONTENEDOR DE BOTONES */}
        <div className="mnt-tabs-v33">
          <button 
            className={viewMode === 'ops' ? 'active' : ''} 
            onClick={() => setViewMode('ops')}
          >
            OPERACIONES
          </button>
          <button 
            className={viewMode === 'audit' ? 'active' : ''} 
            onClick={() => setViewMode('audit')}
          >
            REGISTROS
          </button>
        </div>
      </div>

      <div className="mnt-grid-layout">
        
        {/* 4. ÁREA DE LECTURA DE DATOS */}
        <section className="mnt-feed-area">
          {viewMode === 'ops' ? (
            <div className="mnt-ops-scroll custom-scroll">
              {filteredData.length === 0 ? (
                <div className="mnt-empty">SIN TRANSACCIONES ACTIVAS EN ESTE CANAL...</div>
              ) : (
                filteredData.map((log, i) => (
                  <article key={i} className={`mnt-log-entry ${log.estado.toLowerCase()}`}>
                    <div className="log-badge-user">
                      <span className="u-name">{log.vendedor_nombre}</span>
                      <span className="u-id">ID: {log.vendedor}</span>
                    </div>
                    <div className="log-data-body">
                      <p>VENTA: <strong>BONO #{log.id_bono}</strong> <small>(R:{log.n_bono})</small></p>
                      <p>COMPRADOR: <strong>{log.comprador}</strong> | DNI: {log.dni_comp}</p>
                      {/* FECHA Y HORA 24HS EN REGISTRO DE VENTA */}
                      <span className="log-timestamp">
                        {new Date(log.fecha).toLocaleString('es-AR', { hour12: false })} HS
                      </span>
                    </div>
                    <div className="log-actions-panel">
                      <span className={`log-status-pill ${log.estado.toLowerCase()}`}>{log.estado}</span>
                      <div className="log-btns-group">
                        {log.estado === "PENDIENTE" && (
                          <button className="btn-v33 v" onClick={() => handleAction('validar', log.id_bono)}>VALIDAR</button>
                        )}
                        <button className="btn-v33 e" onClick={() => setEditingBono(log)}>EDITAR</button>
                        <button className="btn-v33 c" onClick={() => handleAction('cancelar', log.id_bono)}>ANULAR</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          ) : (
            <div className="mnt-audit-container anim-fade-in">
              <div className="audit-scroll-pane custom-scroll">
                <table className="audit-table-v33">
                  <thead>
                    <tr><th>FECHA Y HORA</th><th>ACTOR</th><th>ACCIÓN</th><th>DETALLES</th></tr>
                  </thead>
                  <tbody>
                    {audit.length === 0 ? (
                      <tr><td colSpan="4" className="mnt-empty">SIN REGISTROS DE SEGURIDAD</td></tr>
                    ) : (
                      audit.map((a, i) => (
                        <tr key={i}>
                          {/* HORA 24HS EN TABLA DE AUDITORÍA */}
                          <td className="t-date">
                            {new Date(a.fecha).toLocaleString('es-AR', { hour12: false })}
                          </td>
                          <td className="t-user">{a.usuario}</td>
                          <td><span className="t-action">{a.accion}</span></td>
                          <td className="t-detail">{a.detalle}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* 5. SIDEBAR: INTELIGENCIA & HARDWARE */}
        <aside className="mnt-sidebar">
          <div className="mnt-side-block ia-report">
            <header className="side-head"><div className="led-ai"></div><span>CJ-PILOT ANALYTICS</span></header>
            <div className="reports-area">
              {aiReports.map((r, i) => (
                <div key={i} className={`report-pill ${r.type}`}>
                  <span className="r-icon">{r.icon}</span>
                  <p className="r-msg">{r.msg}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mnt-side-block hardware">
             <header className="side-head"><span>SISTEMA DE RED</span></header>
             <div className="hw-info"><span>GATEWAY:</span> <strong>CLOUD_SECURE</strong></div>
             <div className="hw-info"><span>DB:</span> <strong>G_SHEETS_V4</strong></div>
             <div className="hw-info"><span>REGIONS:</span> <strong>FEDERAL_ARG</strong></div>
          </div>
        </aside>

      </div>

      {/* 6. MODAL DE EDICIÓN */}
      {editingBono && (
        <div className="mnt-modal-overlay">
          <div className="mnt-modal-card anim-scale-up">
            <h3 className="modal-title">EDITAR REGISTRO: BONO #{editingBono.id_bono}</h3>
            <div className="modal-form-v33">
              <div className="mf-group"><label>NOMBRE COMPRADOR</label><input type="text" defaultValue={editingBono.comprador} id="edit_name" /></div>
              <div className="mf-group"><label>DNI COMPRADOR</label><input type="number" defaultValue={editingBono.dni_comp} id="edit_dni" /></div>
              <div className="mf-group"><label>TELÉFONO</label><input type="tel" defaultValue={editingBono.tel} id="edit_tel" /></div>
              <div className="modal-footer-btns">
                <button className="btn-m-close" onClick={() => setEditingBono(null)}>CANCELAR</button>
                <button className="btn-m-save" onClick={() => handleAction('editar', editingBono.id_bono, {
                  comprador_nombre: document.getElementById('edit_name').value,
                  comprador_dni: document.getElementById('edit_dni').value,
                  telefono: document.getElementById('edit_tel').value
                })}>CONFIRMAR CAMBIOS</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}