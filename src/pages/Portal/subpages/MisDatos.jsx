import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getBonds } from "../../../services/api";
import "./MisDatos.css";

export default function MisDatos() {
  const { user } = useAuth();
  const [delegates, setDelegates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Datos para el formulario de edición (Simulado)
  const [formData, setFormData] = useState({
    telefono: "+54 9 ...",
    direccion: "Calle Ficticia 123",
    email: "docente@ejemplo.com"
  });

  useEffect(() => {
    fetchDelegates();
  }, []);

  const fetchDelegates = async () => {
    setLoading(true);
    // Reutilizamos el fetch de bonos para extraer los nombres de las academias únicas
    const data = await getBonds();
    const uniqueDelegates = [];
    const map = new Map();
    
    for (const item of data) {
        if (item.vendedor && item.vendedor !== "Disponible" && !map.has(item.vendedor)) {
            map.set(item.vendedor, true);
            uniqueDelegates.push({
                id: item.vendedor,
                academia: item.academia,
                nombre: "PROFESOR ASIGNADO", // En el futuro vendrá del USUARIOS_MASTER
                provincia: "ARGENTINA"
            });
        }
    }
    setDelegates(uniqueDelegates);
    setLoading(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Protocolo de actualización enviado al servidor central.");
  };

  const filteredDelegates = delegates.filter(d => 
    d.academia.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.id.toString().includes(searchTerm)
  );

  return (
    <div className="perfil-root anim-fade-in">
      
      <div className="perfil-grid">
        
        {/* COLUMNA 1: MI IDENTIDAD DIGITAL */}
        <section className="perfil-side-self">
          <div className="id-card-premium">
            <div className="id-card-glow"></div>
            <header className="id-header">
              <span className="id-serial">SYS_AUTH_ID: {user?.dni}</span>
              <div className="id-avatar">
                {user?.nombre?.charAt(0)}
              </div>
            </header>

            <div className="id-info">
              <h2 className="id-name">{user?.nombre}</h2>
              <span className="id-role-badge">{user?.rol}</span>
              <div className="id-divider"></div>
              <p className="id-detail"><span>ACADEMIA:</span> {user?.academia}</p>
              <p className="id-detail"><span>ZONA:</span> {user?.provincia}</p>
            </div>

            <button 
              className={`btn-edit-id ${isEditing ? 'active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "CANCELAR" : "GESTIONAR DATOS"}
            </button>
          </div>

          {isEditing && (
            <form className="edit-form-pro anim-slide-up" onSubmit={handleUpdate}>
               <div className="f-field">
                 <label>WHATSAPP PÚBLICO</label>
                 <input type="tel" value={formData.telefono} onChange={(e)=>setFormData({...formData, telefono: e.target.value})} />
               </div>
               <div className="f-field">
                 <label>DIRECCIÓN POSTAL</label>
                 <input type="text" value={formData.direccion} onChange={(e)=>setFormData({...formData, direccion: e.target.value})} />
               </div>
               <button type="submit" className="btn-save-id">GUARDAR CAMBIOS</button>
            </form>
          )}
        </section>

        {/* COLUMNA 2: RED FEDERAL DE DELEGADOS */}
        <section className="perfil-side-network">
          <header className="network-header">
             <h3 className="network-title">RED FEDERAL DE <span>DELEGADOS</span></h3>
             <div className="network-search">
                <input 
                  type="text" 
                  placeholder="BUSCAR COLEGAS O ACADEMIAS..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </header>

          <div className="network-list">
            {loading ? (
              <div className="net-loader">SINCRONIZANDO NODOS...</div>
            ) : (
              filteredDelegates.map((d, i) => (
                <div key={i} className="delegate-mini-card">
                   <div className="mini-avatar">{d.academia.charAt(0)}</div>
                   <div className="mini-info">
                      <h4>{d.academia}</h4>
                      <p>PROF. ID: {d.id} • {d.provincia}</p>
                   </div>
                   <div className="net-status-led"></div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}