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
      n_bono: selectedBono.n,
      vendedor_dni: user.dni,
      vendedor_nombre: user.nombre,
      comprador_nombre: form.nombre,
      comprador_dni: form.dni,
      telefono: form.tel,
      direccion: form.dir,
      academia: user.academia,
      id_bono: selectedBono.idGlobal
    });
    if (res.status === "success") {
      alert("¡Bono Registrado!");
      setSelectedBono(null);
      setForm({ nombre: "", dni: "", tel: "", dir: "" });
      fetchAll();
    }
    setLoading(false);
  };

  const delegatesWithStats = useMemo(() => {
    return data.delegates.map((d) => {
      // 1. Convertimos a números reales los datos del Excel
      const start = Number(d.de);
      const end = Number(d.hasta);
      const asignados = Number(d.cantidad) || (end - start + 1); // Si no hay cantidad, la calcula
      
      // 2. Filtramos las ventas de este delegado específico
      const sales = data.sales.filter(s => s.vendedor.toString() === d.dni.toString());
      
      return { 
        ...d, 
        start, 
        end, 
        totalAsignados: asignados, // <--- Guardamos el total real
        soldCount: sales.length,   // <--- Cantidad vendida real
        sales 
      };
    });
  }, [data]);

  // --- VARIABLES DE SELECCIÓN EN VIVO (CORREGIDAS DE POSICIÓN) ---
  const activeDelegateData = selectedDelegate ? delegatesWithStats.find(d => d.dni === selectedDelegate.dni) : null;
  const liveBonoData = detailedBono ? data.sales.find(s => s.id_bono.toString() === detailedBono.id_bono.toString()) : null;

  const renderOwnerView = () => (
    <div className="owner-master-grid anim-fade-in">
      <header className="owner-header-tools">
        <div className="search-wrap">
          <span>🔍</span>
          <input type="text" placeholder="BUSCAR POR ACADEMIA O DELEGADO..." onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="global-counter">TOTAL DE VENTAS: {data.sales.length}</div>
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
               <div className="d-progress"><div className="fill" style={{width: `${(d.soldCount/32)*100}%`}}></div></div>
               <span>{d.soldCount} / {d.totalAsignados} VENDIDOS</span>
            </div>
            <div className="d-card-footer">RANGO: {d.start} - {d.end}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDelegateView = () => {
    // Buscamos nuestra propia info en la lista de delegados
    const me = delegatesWithStats.find(d => d.dni.toString() === user.dni.toString());
    if (!me) return <div className="loader-tech">ERROR: NO TIENES RANGO ASIGNADO. CONTACTA AL ADMINISTRADOR.</div>;

    const slots = [];
    // Creamos la grilla dinámicamente desde nuestro 'inicio' hasta nuestro 'fin'
    for (let i = me.start; i <= me.end; i++) {
      const sale = data.sales.find(s => s.id_bono.toString() === i.toString());
      slots.push({ idGlobal: i, nRelativo: (i - me.start) + 1, data: sale });
    }

    return (
      <div className="delegate-slots-view anim-fade-in">
        <header className="slots-header">
   <h3>GESTIÓN DE MIS BONOS</h3>
   <p>Progreso: <strong>{me.soldCount} vendidos</strong> de <strong>{me.totalAsignados}</strong></p>
   <div className="d-progress" style={{maxWidth: '300px', margin: '15px auto'}}>
      <div className="fill" style={{width: `${(me.soldCount / me.totalAsignados) * 100}%`}}></div>
   </div>
</header>
        <div className="slots-grid-pro">
           {slots.map(slot => (
             <div 
              key={slot.idGlobal} 
              className={`slot-card-v28 ${slot.data ? 'sold' : 'free'}`}
              onClick={() => slot.data ? setDetailedBono(slot.data) : setSelectedBono({n: slot.nRelativo, idGlobal: slot.idGlobal})}
             >
                <span className="s-id">#{slot.idGlobal}</span>
                <span className="s-status">{slot.data ? "VENDIDO" : "LIBRE"}</span>
                {slot.data && <span className="s-buyer">{slot.data.comprador.split(' ')[0]}</span>}
             </div>
           ))}
        </div>
      </div>
    );
  };

 return (
    <div className="master-bonos-root">
      {loading ? (
        <div className="loader-tech"><center>CARGANDO DATOS...</center></div>
      ) : (
        user?.rol === "DUEÑO" ? renderOwnerView() : renderDelegateView()
      )}

      {/* --- 1. MODAL INSPECTOR (DUEÑO) --- */}
      {activeDelegateData && ReactDOM.createPortal(
        <div className="inspector-overlay" onClick={() => setSelectedDelegate(null)}>
           <div className="inspector-card-centered anim-scale-up" onClick={e => e.stopPropagation()}>
              <header className="ins-header">
                 <div className="ins-header-content">
                    <h3>ACADEMIA: <span>{activeDelegateData.academia}</span></h3>
                    <p>Responsable: {activeDelegateData.nombre}</p>
                 </div>
                 <button className="btn-close-x" onClick={() => setSelectedDelegate(null)}>&times;</button>
              </header>
              <div className="ins-grid-scroll">
                 {Array.from({length: activeDelegateData.totalAsignados}, (_, i) => {
                    const id = activeDelegateData.start + i;
                    const sale = activeDelegateData.sales.find(s => s.id_bono.toString() === id.toString());
                    return (
                      <div key={id} className={`ins-slot ${sale ? 'sold' : 'free'}`} onClick={() => sale && setDetailedBono(sale)}>
                         <span className="ins-num">#{id}</span>
                         <span className="ins-status">{sale ? "VER INFO" : "LIBRE"}</span>
                      </div>
                    );
                 })}
              </div>
           </div>
        </div>,
        document.body
      )}

      {/* --- 2. MODAL FICHA TÉCNICA (DETALLE) --- */}
      {liveBonoData && ReactDOM.createPortal(
        <div className="detail-overlay" onClick={() => setDetailedBono(null)}>
          <div className="detail-card-pro anim-scale-up" onClick={e => e.stopPropagation()}>
            <button className="btn-close-x" onClick={() => setDetailedBono(null)}>&times;</button>
            <header className="detail-header">
              <span className="detail-tag">FICHA TÉCNICA DE VENTA</span>
              <h4>BONO # {liveBonoData.n_bono} <small>({liveBonoData.id_bono})</small></h4>
            </header>
            <div className="detail-body">
              <div className="detail-section">
                <h5>DATOS DEL COMPRADOR</h5>
                <p><span>NOMBRE:</span> {liveBonoData.comprador}</p>
                <p><span>DNI:</span> {liveBonoData.dni_comp || '---'}</p>
                <p><span>TEL:</span> {liveBonoData.tel || '---'}</p>
                <p><span>DIR:</span> {liveBonoData.dir || '---'}</p>
              </div>
              <div className="detail-section">
                <h5>GESTIÓN DE VENTA</h5>
                <p><span>DEL:</span>{" "} {liveBonoData.vendedor_nombre}</p>
                <p><span>ESTADO:</span> <strong className={liveBonoData.estado.toLowerCase()}>{liveBonoData.estado}</strong></p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* --- 3. MODAL REGISTRAR VENTA --- */}
      {selectedBono && ReactDOM.createPortal(
        <div className="form-modal-overlay" onClick={() => setSelectedBono(null)}>
           <div className="form-modal-card anim-scale-up" onClick={e => e.stopPropagation()}>
              <h3>REGISTRAR VENTA: BONO #{selectedBono.idGlobal}</h3>
              <form onSubmit={handleRegister} className="form-tech-grid">
                 <input type="text" placeholder="NOMBRE COMPRADOR" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                 <input type="number" placeholder="DNI COMPRADOR" required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
                 <input type="tel" placeholder="WHATSAPP" required value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} />
                 <input type="text" placeholder="DIRECCIÓN / CIUDAD" required value={form.dir} onChange={e => setForm({...form, dir: e.target.value})} />
                 <div className="form-tech-actions">
                    <button type="button" className="btn-modal-tech cancel" onClick={() => setSelectedBono(null)}>CANCELAR</button>
                    <button type="submit" className="btn-modal-tech save" disabled={loading}>CONFIRMAR CARGA</button>
                 </div>
              </form>
           </div>
        </div>,
        document.body
      )}
    </div>
  );
}