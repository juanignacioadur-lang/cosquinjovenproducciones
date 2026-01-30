import ReactDOM from "react-dom";
import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getBonds, registerSale } from "../../../services/api";
import "./MasterBonos.css";

export default function MasterBonos() {
  const { user } = useAuth();
  const [data, setData] = useState({ sales: [], delegates: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDelegate, setSelectedDelegate] = useState(null); 
  const [numeroManual, setNumeroManual] = useState("");
  const [detailedBono, setDetailedBono] = useState(null); 
  const [selectedBono, setSelectedBono] = useState(null); 
  const [form, setForm] = useState({ nombre: "", dni: "", tel: "", dir: "" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    const res = await getBonds();
    setData(res);
    setLoading(false);
  };

const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await registerSale({
      id_bono: numeroManual, // <--- Ahora leemos de aquí
      vendedor_dni: user.dni,
      vendedor_nombre: user.nombre,
      comprador_nombre: form.nombre,
      comprador_dni: form.dni,
      telefono: form.tel,
      direccion: form.dir,
      academia: user.academia
    });

    if (res.status === "success") {
      alert(`¡BONO #${numeroManual} REGISTRADO!`);
      setSelectedBono(null);
      setNumeroManual(""); // Limpiamos para la próxima
      setForm({ nombre: "", dni: "", tel: "", dir: "" });
      fetchAll();
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  // --- 1. PROCESAMIENTO DE DATOS FEDERALES ---
  const delegatesWithStats = useMemo(() => {
    return data.delegates.map((d) => {
      const asignados = Number(d.cantidad) || 0;
      // Filtramos solo las ventas que le pertenecen a este DNI
      const sales = data.sales.filter(s => s.vendedor.toString() === d.dni.toString());
      return { 
        ...d, 
        totalAsignados: asignados,
        soldCount: sales.length, 
        sales: sales.sort((a,b) => a.id_bono - b.id_bono) 
      };
    });
  }, [data]);

  const activeDelegateData = selectedDelegate ? delegatesWithStats.find(d => d.dni === selectedDelegate.dni) : null;

  // --- 2. VISTA DUEÑO: TABLERO DE CONTROL ---
  const renderOwnerView = () => (
    <div className="owner-master-grid anim-fade-in">
      <header className="owner-header-tools">
        <div className="search-wrap">
          <span>🔍</span>
          <input type="text" placeholder="BUSCAR POR ACADEMIA O DELEGADO..." onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="global-counter">TOTAL VENTAS NACIONAL: {data.sales.length}</div>
      </header>

      <div className="delegates-grid">
        {delegatesWithStats
          .filter(d => d.academia.toLowerCase().includes(searchTerm.toLowerCase()) || d.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((d, i) => (
          <div key={i} className="delegate-card" onClick={() => setSelectedDelegate(d)}>
            <div className="d-card-header">
               <span className="d-prov">{d.academia}</span>
               <h4>{d.nombre}</h4>
            </div>
            <div className="d-card-stats">
               {/* BARRA DE PROGRESO BASADA EN CUPO REAL */}
               <div className="d-progress">
                  <div className="fill" style={{width: `${(d.soldCount / (d.totalAsignados || 1)) * 100}%`}}></div>
               </div>
               <span>{d.soldCount} / {d.totalAsignados} VENDIDOS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- 3. VISTA DELEGADO: MI HISTORIAL ---
  const renderDelegateView = () => {
    const me = delegatesWithStats.find(d => d.dni.toString() === user.dni.toString());
    if (!me) return <div className="loader-tech">ERROR DE IDENTIDAD TÉCNICA.</div>;

    return (
      <div className="delegate-slots-view anim-fade-in">
        <header className="slots-header">
           <h3>MIS VENTAS REGISTRADAS</h3>
           <p>Cupo utilizado: <strong>{me.soldCount}</strong> de <strong>{me.totalAsignados}</strong></p>
           <button className="btn-add-manual" onClick={() => setSelectedBono("prompt")}>+ REGISTRAR NUEVO BONO</button>
        </header>

        <div className="slots-grid-pro">
           {me.sales.length === 0 ? (
             <p className="mnt-empty">No has registrado ventas todavía.</p>
           ) : (
             me.sales.map(sale => (
               <div key={sale.id_bono} className="slot-card-v28 sold" onClick={() => setDetailedBono(sale)}>
                  <span className="s-id">#{sale.id_bono}</span>
                  <span className="s-status">VER INFO</span>
                  <span className="s-buyer">{sale.comprador.split(' ')[0]}</span>
               </div>
             ))
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="master-bonos-root">
      {loading ? (
        <div className="loader-tech"><center>SINCRONIZANDO DATOS...</center></div>
      ) : (
        user?.rol === "DUEÑO" ? renderOwnerView() : renderDelegateView()
      )}

      {/* --- MODAL INSPECTOR (DUEÑO) --- */}
      {activeDelegateData && ReactDOM.createPortal(
        <div className="inspector-overlay" onClick={() => setSelectedDelegate(null)}>
           <div className="inspector-card-centered" onClick={e => e.stopPropagation()}>
              <header className="ins-header">
   <div className="ins-header-content">
      <h3>REPORTE FEDERAL DE VENTAS <span>{activeDelegateData.academia}</span></h3>
      <p>RESPONSABLE: {activeDelegateData.nombre}</p>
   </div>
   <button className="btn-close-x" onClick={() => setSelectedDelegate(null)}>&times;</button>
</header>
              
              <div className="ins-grid-scroll">
                 {activeDelegateData.sales.length === 0 ? (
                   <div className="mnt-empty" style={{gridColumn: '1/-1', padding: '50px'}}>ESTA ACADEMIA NO TIENE VENTAS</div>
                 ) : (
                   activeDelegateData.sales.map((sale) => (
                      <div key={sale.id_bono} className="ins-slot sold" onClick={() => setDetailedBono(sale)}>
                         <span className="ins-num">#{sale.id_bono}</span>
                         <span className="ins-status">VER INFO</span>
                      </div>
                   ))
                 )}
              </div>
           </div>
        </div>,
        document.body
      )}

      {/* --- MODAL FICHA TÉCNICA (DETALLE) --- */}
      {detailedBono && ReactDOM.createPortal(
        <div className="detail-overlay" onClick={() => setDetailedBono(null)}>
          <div className="detail-card-pro anim-scale-up" onClick={e => e.stopPropagation()}>
            <button className="btn-close-x" onClick={() => setDetailedBono(null)}>&times;</button>
            <header className="detail-header">
              <span className="detail-tag">FICHA TÉCNICA DE VENTA</span>
              <h4>BONO #{detailedBono.id_bono}</h4>
            </header>
            <div className="detail-body">
              <div className="detail-section">
                <h5>DATOS DEL COMPRADOR</h5>
                <p><span>NOMBRE:</span> {detailedBono.comprador}</p>
                <p><span>DNI:</span> {detailedBono.dni_comp || '---'}</p>
                <p><span>TEL:</span> {detailedBono.tel || '---'}</p>
                <p><span>DIR:</span> {detailedBono.dir || '---'}</p>
              </div>
              <div className="detail-section">
                <h5>GESTIÓN</h5>
                <p><span>ACADEMIA:</span> {detailedBono.vendedor_nombre}</p>
                <p><span>ESTADO:</span> <strong className={detailedBono.estado.toLowerCase()}>{detailedBono.estado}</strong></p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* --- MODAL CARGA MANUAL (DELEGADO) --- */}
      {selectedBono === "prompt" && ReactDOM.createPortal(
        <div className="form-modal-overlay" onClick={() => setSelectedBono(null)}>
           <div className="form-modal-card" onClick={e => e.stopPropagation()}>
              <button className="btn-close-x" onClick={() => setSelectedBono(null)}>&times;</button>
              <h3>NUEVA VENTA</h3>
              <form onSubmit={handleRegister} className="form-tech-grid">
                 <input 
  type="number" 
  placeholder="NÚMERO DE BONO (1-1000)" 
  required 
  value={numeroManual}
  onChange={e => setNumeroManual(e.target.value)} // <--- CAMBIO CLAVE
/>
                 <input type="text" placeholder="NOMBRE COMPRADOR" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                 <input type="number" placeholder="DNI COMPRADOR" required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
                 <input type="tel" placeholder="WHATSAPP" required value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} />
                 <input type="text" placeholder="CIUDAD" required value={form.dir} onChange={e => setForm({...form, dir: e.target.value})} />
                 <div className="form-tech-actions">
                    <button type="button" className="btn-modal-tech cancel" onClick={() => setSelectedBono(null)}>ABORTAR</button>
                    <button type="submit" className="btn-modal-tech save">REGISTRAR</button>
                 </div>
              </form>
           </div>
        </div>,
        document.body
      )}
    </div>
  );
}