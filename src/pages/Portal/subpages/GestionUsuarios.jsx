import React, { useState, useEffect } from "react";
import { getBonds, saveDelegate, deleteDelegate } from "../../../services/api";
import "./GestionUsuarios.css";
import ReactDOM from "react-dom";

export default function GestionUsuarios() {
  const [delegates, setDelegates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); 
  const [form, setForm] = useState({ 
    dni: "", nombre: "", academia: "", provincia: "", password: "",
    cantidad: "" // <--- Solo pedimos cantidad
  });

  useEffect(() => {
    fetchDelegates();
  }, []);

  const fetchDelegates = async () => {
    setLoading(true);
    try {
      const res = await getBonds();
      setDelegates(res.delegates || []);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const qty = parseInt(form.cantidad);

  if (isNaN(qty) || qty < 1) {
    alert("POR FAVOR INGRESA UNA CANTIDAD VÁLIDA");
    return;
  }

  setLoading(true);

  let start, end;
  if (modalMode === 'add') {
    // BUSCAMOS EL ÚLTIMO NÚMERO REAL EN EL EXCEL
    // Usamos Number() para asegurarnos que la comparación sea matemática
    const lastBono = delegates.reduce((max, d) => {
      const hastaVal = Number(d.hasta) || 0;
      return hastaVal > max ? hastaVal : max;
    }, 0);

    start = lastBono + 1;
    end = start + qty - 1;
  } else {
    // Si editamos, el inicio se queda igual y recalculamos el fin
    start = Number(form.de);
    end = start + qty - 1;
  }

  // Enviamos al script
  const res = await saveDelegate({ 
    ...form, 
    cantidad: parseInt(form.cantidad) 
  });

  if (res.status === "success") {
    alert("Sincronización Exitosa: Los rangos se han re-acomodado.");
    setModalMode(null);
    fetchDelegates(); // Esto recarga la lista y verás los nuevos rangos
  } else {
    alert("Error: " + res.message);
  }
  setLoading(false);
};
  const openAddModal = () => {
    setForm({ dni: "", nombre: "", academia: "", provincia: "", password: "", cantidad: "" });
    setModalMode('add');
  };
  

  const handleDelete = async (dni) => {
    if (!window.confirm("¿ORDEN DE BAJA?")) return;
    setLoading(true);
    const res = await deleteDelegate(dni);
    if (res.status === "success") fetchDelegates();
    setLoading(false);
  };

  return (
    <div className="gestion-user-root anim-fade-in">
      <header className="area-title-tech">
        <h3>ADMINISTRACIÓN DE RED FEDERAL</h3>
        <p>El sistema asigna rangos automáticamente para evitar duplicados.</p>
      </header>

      <div className="nodes-grid">
        {/* CASILLA ÚNICA PARA NUEVO USUARIO */}
        <div className="node-card empty add-btn-node" onClick={openAddModal}>
           <div className="add-content">
              <span className="plus">+</span>
              <p>NUEVO DELEGADO</p>
           </div>
        </div>

        {/* LISTADO DINÁMICO */}
        {delegates.map((d, i) => (
          <div key={d.dni} className="node-card active">
            <div className="node-header">
              <span className="node-id">DEL_{i + 1}</span>
              <div className="node-header-meta">
                <span className="node-range">DNI: {d.dni}</span>
                <span className="node-range">RANGO: {d.de} — {d.hasta}</span>
              </div>
            </div>
            <div className="node-info">
             <h4>{d.nombre}</h4>
                   <p>{d.academia}</p>
       <div className="node-stats-footer">
        <div className="stat-item-pro">
         <span className="stat-label2">NÚMEROS</span>
         <span className="stat-value">{d.hasta - d.de + 1}</span>
        </div>
       </div>
  
           {/* NUEVO: Contador de números asignados */}
                <div className="node-counter-badge">
                 <span className="count-num">{d.hasta - d.de + 1}</span>
                  <span className="count-text">NÚMEROS ASIGNADOS</span>
                </div>

          <div className="node-actions">
                <button className="btn-node edit" onClick={() => {
                  setForm({ ...d, cantidad: (d.hasta - d.de + 1) });
                  setModalMode('edit');
                  }}>EDITAR</button>
                <button className="btn-node delete" onClick={() => handleDelete(d.dni)}>BAJA</button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {modalMode && ReactDOM.createPortal(
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div className="modal-card-tech" onClick={e => e.stopPropagation()}>
            <h3>{modalMode === 'add' ? 'CONFIGURAR' : 'RE-AJUSTAR'} DELEGADO</h3>
            
            <form onSubmit={handleSubmit} className="modal-form-tech">
              <div className="m-row">
                <div className="m-input">
                  <label>DNI</label>
                  <input type="number" value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} required disabled={modalMode === 'edit'} />
                </div>
                <div className="m-input">
                  <label>CONTRASEÑA</label>
                  <input type="text" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                </div>
              </div>

              <div className="m-input">
                <label>NOMBRE COMPLETO</label>
                <input type="text" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              </div>

              <div className="m-row">
                <div className="m-input">
                  <label>ACADEMIA</label>
                  <input type="text" value={form.academia} onChange={e => setForm({...form, academia: e.target.value})} required />
                </div>
                <div className="m-input">
                  <label>CANTIDAD DE BONOS</label>
                  <input 
                    type="number" 
                    placeholder="Ej: 32 o 100" 
                    value={form.cantidad} 
                    onChange={e => setForm({...form, cantidad: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              
              <div className="modal-actions-pro">
                <button type="button" className="btn-modal-tech cancel" onClick={() => setModalMode(null)}>ABORTAR</button>
                <button type="submit" className="btn-modal-tech save">
                  {loading ? "PROCESANDO..." : "CONFIRMAR"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}