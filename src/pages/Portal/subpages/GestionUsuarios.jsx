import React, { useState, useEffect } from "react";
import { getBonds, saveDelegate, deleteDelegate } from "../../../services/api";
import "./GestionUsuarios.css";

export default function GestionUsuarios() {
  const [delegates, setDelegates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit'
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ dni: "", nombre: "", academia: "", provincia: "", password: "" });
  // --- BLOQUEO DE SCROLL AL ABRIR MODAL ---
  useEffect(() => {
    if (modalMode) {
      // Cuando el modal se abre: bloqueamos scroll y táctil
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      // Cuando se cierra: devolvemos la libertad de scroll
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
    // Limpieza por seguridad si el componente se desmonta
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [modalMode]);
  
  useEffect(() => {
    fetchDelegates();
  }, []);

  const fetchDelegates = async () => {
    setLoading(true);
    try {
      const res = await getBonds();
      // El script devuelve { sales: [], delegates: [], audit: [] }
      setDelegates(res.delegates || []);
    } catch (error) {
      console.error("Error al cargar la red federal:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Cálculo automático de rangos (32 bonos por delegado)
    const start = ((selectedSlot - 1) * 32) + 1;
    const end = start + 31;

    const res = await saveDelegate({ 
      ...form, 
      rango_inicio: start, 
      rango_fin: end 
    });

    if (res.status === "success") {
      alert("NODO SINCRONIZADO: El delegado ha sido registrado con éxito.");
      setModalMode(null);
      fetchDelegates();
    } else {
      alert("ERROR DE RED: " + res.message);
    }
    setLoading(false);
  };

  const handleDelete = async (dni) => {
    if (!window.confirm("¿ORDEN DE BAJA? Se eliminarán las credenciales de este nodo.")) return;
    setLoading(true);
    const res = await deleteDelegate(dni);
    if (res.status === "success") fetchDelegates();
    setLoading(false);
  };

  return (
    <div className="gestion-user-root anim-fade-in">
      <header className="area-title-tech">
        <h3>ADMINISTRACIÓN DE DELEGADOS <span>(CAPACIDAD: 24 DELEGADOS)</span></h3>
        <p>Configuración de credenciales y asignación de delegados automáticos.</p>
      </header>

      <div className="nodes-grid">
        {Array.from({ length: 24 }, (_, i) => {
          const slotNum = i + 1;
          const start = ((slotNum - 1) * 32) + 1;
          const end = start + 31;
          
          // Buscamos si hay un delegado cargado en esta posición
          const delegate = delegates[i];

          return (
            <div key={slotNum} className={`node-card ${delegate ? 'active' : 'empty'}`}>
              <div className="node-header">
                <span className="node-id">DEL_{slotNum}</span>
                <span className="node-range">{start} — {end}</span>
              </div>

              {delegate ? (
                <div className="node-info">
                  <h4>{delegate.nombre}</h4>
                  <p>{delegate.academia}</p>
                  <div className="node-actions">
                    <button className="btn-node edit" onClick={() => {
                      setForm(delegate);
                      setSelectedSlot(slotNum);
                      setModalMode('edit');
                    }}>EDITAR</button>
                    <button className="btn-node delete" onClick={() => handleDelete(delegate.dni)}>BAJA</button>
                  </div>
                </div>
              ) : (
                <div className="node-empty-content">
                  <p>SLOT DISPONIBLE</p>
                  <button className="btn-node-add" onClick={() => {
                    setForm({ dni: "", nombre: "", academia: "", provincia: "", password: "" });
                    setSelectedSlot(slotNum);
                    setModalMode('add');
                  }}>CONFIGURAR</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- MODAL DE CONFIGURACIÓN (CON CLASES DE TU CSS) --- */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-card-tech">
            <h3>{modalMode === 'add' ? 'REGISTRAR NUEVO' : 'EDITAR'} DELEGADO</h3>
            
            <form onSubmit={handleSubmit} className="modal-form-tech">
              <div className="m-row">
                <div className="m-input">
                  <label>DNI (USUARIO)</label>
                  <input 
                    type="number" 
                    value={form.dni} 
                    onChange={e => setForm({...form, dni: e.target.value})} 
                    required 
                    disabled={modalMode === 'edit'} 
                  />
                </div>
                <div className="m-input">
                  <label>CLAVE (CUMPLE)</label>
                  <input 
                    type="text" 
                    placeholder="DDMMAAAA" 
                    value={form.password} 
                    onChange={e => setForm({...form, password: e.target.value})} 
                    required 
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
                  <label>PROVINCIA</label>
                  <input 
                    type="text" 
                    value={form.provincia} 
                    onChange={e => setForm({...form, provincia: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              
              <div className="modal-actions-pro">
                <button type="button" onClick={() => setModalMode(null)}>CANCELAR</button>
                <button type="submit">
                  {loading ? "PROCESANDO..." : "GUARDAR"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}