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
      alert("INGRESA UNA CANTIDAD VÁLIDA");
      return;
    }

    setLoading(true);

    // Solo enviamos los datos y la cantidad, el script hace el resto
    const res = await saveDelegate({ 
      ...form, 
      cantidad: qty 
    });

    if (res.status === "success") {
      alert("NODO SINCRONIZADO EXITOSAMENTE.");
      setModalMode(null);
      fetchDelegates(); // Refresca la lista
    } else {
      alert("Error: " + res.message);
    }
    setLoading(false);
  };
  const openEditModal = (delegate) => {
    setForm({ 
      ...delegate, 
      password: "" // Dejamos la clave vacía por seguridad al editar
    });
    setModalMode('edit');
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
        <p>Gestión de credenciales y cupo de ventas asignado a cada delegación.</p>
      </header>

      <div className="nodes-grid">
        {/* CASILLA ÚNICA PARA NUEVO USUARIO */}
        <div className="node-card empty add-btn-node" onClick={openAddModal}>
           <div className="add-content">
              <span className="plus">+</span>
              <p>NUEVO DELEGADO</p>
           </div>
        </div>

        {/* LISTADO DE DELEGADOS CARGADOS */}
        {delegates.map((d, i) => (
          <div key={d.dni} className="node-card active">
            <div className="node-header">
              <span className="node-id">DEL_{i + 1}</span>
              <div className="node-header-meta">
                <span className="node-range">DNI: {d.dni}</span>
              </div>
            </div>

            <div className="node-info">
              <h4>{d.nombre}</h4>
              <p>{d.academia}</p>
              
              {/* SECCIÓN DE CUPO ASIGNADO */}
              <div className="node-stats-footer">
                <div className="stat-item-pro">
                  <span className="stat-label">CANTIDAD ASIGNADA</span>
                  <span className="stat-value">{d.cantidad}</span>
                </div>
              </div>

              <div className="node-actions">
                <button className="btn-node edit" onClick={() => openEditModal(d)}>EDITAR</button>
                <button className="btn-node delete" onClick={() => handleDelete(d.dni)}>BAJA</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL UEFI V3.0 (PORTAL) --- */}
      {modalMode && ReactDOM.createPortal(
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div className="modal-card-tech" onClick={e => e.stopPropagation()}>
            <button className="btn-close-x" onClick={() => setModalMode(null)}>&times;</button>
            <h3>{modalMode === 'add' ? 'CONFIGURAR' : 'RE-AJUSTAR'} DELEGADO</h3>
            
            <form onSubmit={handleSubmit} className="modal-form-tech">
              <div className="m-row">
                <div className="m-input">
                  <label>DNI USUARIO</label>
                  <input 
                    type="number" 
                    value={form.dni} 
                    onChange={e => setForm({...form, dni: e.target.value})} 
                    required 
                    disabled={modalMode === 'edit'} 
                  />
                </div>
                <div className="m-input">
                  <label>CONTRASEÑA</label>
                  <input 
                    type="text" 
                    placeholder={modalMode === 'edit' ? "CAMBIAR CLAVE" : "CREAR CLAVE"} 
                    value={form.password} 
                    onChange={e => setForm({...form, password: e.target.value})} 
                    required={modalMode === 'add'} 
                  />
                </div>
              </div>

              <div className="m-input">
                <label>NOMBRE COMPLETO</label>
                <input 
                  type="text" 
                  value={form.nombre} 
                  onChange={e => setForm({...form, nombre: e.target.value})} 
                  required 
                />
              </div>

              <div className="m-row">
                <div className="m-input">
                  <label>ACADEMIA</label>
                  <input 
                    type="text" 
                    value={form.academia} 
                    onChange={e => setForm({...form, academia: e.target.value})} 
                    required 
                  />
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