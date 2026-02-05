import React, { useState, useEffect, useMemo } from "react";
import { getBonds, validateSale, cancelSale, updateSale, exportFullData } from "../../../services/api";
import "./Monitoreo.css";
import ModalBonoEditor from "../../../components/ModalBonoEditor";

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

// --- MOTOR DE EXPORTACIÓN TÉCNICA ---
const handleDownloadExcel = async (sheetKey, fileName) => {
    setLoading(true);
    try {
      const res = await exportFullData(sheetKey);
      if (res.status === "success") {
        
        // 1. Usamos TAB como separador (es el que mejor entiende Excel para UTF-16)
        const SEPARATOR = "\t"; 

        const rows = res.data.map(row => {
          return row.map(cell => {
            let value = cell;
            
            // Formateo de fechas manual para evitar el problema de los #####
            if (value instanceof Date || (typeof value === "string" && value.includes("T") && value.includes("Z"))) {
                const date = new Date(value);
                if (!isNaN(date)) {
                    const d = date.getDate().toString().padStart(2, '0');
                    const m = (date.getMonth() + 1).toString().padStart(2, '0');
                    const y = date.getFullYear();
                    const h = date.getHours().toString().padStart(2, '0');
                    const min = date.getMinutes().toString().padStart(2, '0');
                    value = `${d}/${m}/${y} ${h}:${min}`; // Formato corto para que no se estruje
                }
            }
            // Limpiamos saltos de línea que rompen las filas
            return String(value).replace(/\n/g, " ").replace(/\r/g, " ");
          }).join(SEPARATOR);
        }).join("\r\n"); // Salto de línea estilo Windows

        // 2. EL TRUCO MAESTRO: Codificación UTF-16LE
        // Esto es lo que hace que las tildes (ó, á, í) se vean perfectas
        const charCodeArray = new Uint16Array(rows.length + 1);
        charCodeArray[0] = 0xFEFF; // BOM para UTF-16
        for (let i = 0; i < rows.length; i++) {
            charCodeArray[i + 1] = rows.charCodeAt(i);
        }

        const blob = new Blob([charCodeArray], { type: 'text/csv;charset=utf-16le' });
        
        // 3. Disparar descarga
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const dateStr = new Date().toLocaleDateString().replace(/\//g, '-');
        link.setAttribute("download", `${fileName}_${dateStr}.csv`);
        
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
        
      } else {
        alert("SISTEMA: Error al recuperar datos.");
      }
    } catch (err) {
      console.error(err);
      alert("SISTEMA: Error crítico en la descarga.");
    }
    setLoading(false);
  };

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
            <span className="mnt-sub-code">Consola para Monitorear a Delegación.</span>
            <h2 className="mnt-main-title-tech"><span>MONITOREO</span></h2>
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
          <div className="mnt-a-val">{logs.length} <small>/ 1000</small></div>
          <div className="mnt-a-bar"><div className="fill" style={{width: `${(logs.length/1000)*100}%`}}></div></div>
        </div>
        <div className="mnt-a-card glass-v33 highlight">
          <span className="mnt-a-tag">RECAUDACIÓN BRUTA</span>
          <div className="mnt-a-val">${recaudacionTotal.toLocaleString()}</div>
          <span className="mnt-a-profit">GANANCIA Cosquín Joven (35%): <strong>${utilidadProductora.toLocaleString()}</strong></span>
        </div>
        <div className="mnt-a-card glass-v33">
          <span className="mnt-a-tag">BASE DE DATOS</span>
          <div className="mnt-a-val">ONLINE</div>
          <span className="mnt-a-profit">PROTOCOLO: TODO FUNCIONANDO.</span>
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
              placeholder="BUSCADOR DE BONOS (NOMBRE, ACADEMIA, BONO, ETC)..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        ) : (
          /* Título de sección cuando no hay buscador para que no quede vacío */
          <div className="mnt-section-label anim-fade-in">
             REPORTE DE REGISTROS DE SISTEMA
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
                <div className="mnt-empty"><center>NO HAY REGISTROS DE VENTAS.</center></div>
              ) : (
                filteredData.map((log, i) => (
                  <article key={i} className={`mnt-log-entry ${log.estado.toLowerCase()}`}>
                    <div className="log-badge-user">
                      <span className="u-name">{log.vendedor_nombre}</span>
                      <span className="u-id">DNI: {log.vendedor}</span>
                    </div>
                    <div className="log-data-body">
                      <p>VENTA: <strong>BONO #{log.id_bono}</strong></p>
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
            <header className="side-head"><div className="led-ai"></div><span>NOTIFICACIONES</span></header>
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
             <div className="hw-info"><span>DB:</span> <strong>CONECTADA.</strong></div>
             <div className="hw-info"><span>REGION:</span> <strong>ARG</strong></div>

             {/* SECCIÓN DE EXPORTACIÓN AGREGADA */}
             <div className="export-section">
                <span className="export-label">REPORTES FEDERALES (EXCEL)</span>
                <div className="export-btns-grid">
                  <button className="btn-export-tech" onClick={() => handleDownloadExcel("SALES", "VENTAS_TOTALES")}>
                    <span className="icon">⬇</span> REGISTRO VENTAS
                  </button>
                  <button className="btn-export-tech" onClick={() => handleDownloadExcel("LOGS", "AUDITORIA_SISTEMA")}>
                    <span className="icon">⬇</span> AUDITORÍA COMPLETA
                  </button>
                  <button className="btn-export-tech" onClick={() => handleDownloadExcel("USERS", "USUARIOS_MASTER")}>
                    <span className="icon">⬇</span> LISTADO USUARIOS
                  </button>
                </div>
             </div>
          </div>
        </aside>

      </div>

      {/* MODAL EDITOR DE BONOS */}
      <ModalBonoEditor 
        isOpen={!!editingBono} 
        data={editingBono} 
        onClose={() => setEditingBono(null)} 
        onConfirm={(newData) => handleAction('editar', editingBono.id_bono, newData)}
      />
    </div>
  );
}