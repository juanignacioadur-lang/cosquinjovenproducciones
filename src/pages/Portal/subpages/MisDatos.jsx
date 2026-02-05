import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getBonds, updateFullProfile } from "../../../services/api";
import "./MisDatos.css";

export default function MisDatos() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: user.nombre || "",
    provincia: user.provincia || "",
    celular: "",
    current_password: "",
    new_password: ""
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await getBonds(user.dni);
      const me = res.delegates?.find(d => d.dni.toString() === user.dni.toString());
      if (me) {
        setFormData(prev => ({ 
          ...prev, 
          nombre: me.nombre || "", 
          provincia: me.provincia || "", 
          celular: me.celular || "" 
        }));
      }
    };
    loadData();
  }, [user.dni]);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await updateFullProfile({
      dni: user.dni,
      nombre: formData.nombre,
      provincia: formData.provincia,
      celular: formData.celular,
      current_password: formData.current_password,
      new_password: formData.new_password || null
    });

    if (res.status === "success") {
      alert("NIVEL DE ACCESO ACTUALIZADO: Cambios sincronizados con la Red Federal.");
      login(res.user, true);
      setFormData(prev => ({ ...prev, current_password: "", new_password: "" }));
    } else {
      alert("ERROR DE PROTOCOLO: " + res.message);
    }
    setLoading(false);
  };

  return (
    <div className="md-titan-root anim-reveal">
      
      {/* HEADER DE SISTEMA */}
      <header className="md-hardware-header">
        <div className="md-header-left">
          <div className="md-led-status active"></div>
          <div className="md-title-group">
            <h2 className="md-main-title"><span>MIS DATOS</span></h2>
          </div>
        </div>
        <div className="md-header-right">
          <span className="md-access-label">NIVEL DE ACCESO: {user.rol}</span>
        </div>
      </header>

      <div className="md-main-grid">
        
        {/* LADO A: CREDENCIAL DE SEGURIDAD */}
        <aside className="md-sidebar-id">
          <div className="md-badge-card">
            <div className="md-card-scanner"></div> {/* Animación de línea de escaneo */}
            <div className="md-card-glow"></div>
            
            <div className="md-badge-inner">
              
              <div className="md-avatar-wrap">
                <div className="md-avatar-frame">
                  <div className="md-initial">{formData.nombre.charAt(0)}</div>
                </div>
                <div className="md-online-pulse"></div>
              </div>

              <h3 className="md-badge-name">{formData.nombre}</h3>
              <p className="md-badge-role">{user.rol} CERTIFICADO</p>
              
              <div className="md-divider-neon"></div>

              <div className="md-meta-rows">
                <div className="md-meta-item">
                  <label>DNI </label>
                  <span>{user.dni}</span>
                </div>
                <div className="md-meta-item">
                  <label>ACADEMIA</label>
                  <span>{user.academia}</span>
                </div>
                <div className="md-meta-item">
                  <label>PROVINCIA</label>
                  <span className="highlight-red">{formData.provincia || "UNSET"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md-security-info">
            <p><strong>RESTRICCIÓN:</strong> Los datos DNI y ACADEMIA están enlazados a su contrato federal. Para modificaciones críticas, póngase en contacto por WhatsApp.</p>
          </div>
        </aside>

        {/* LADO B: TERMINAL DE CONFIGURACIÓN */}
        <section className="md-config-panel">
          <form className="md-terminal-form" onSubmit={handleUpdate} autoComplete="off">
            
            {/* TRAMPA ANTI-AUTOFILL CHROME */}
            <input type="text" name="fake_user" style={{display:'none'}} />
            <input type="password" name="fake_pass" style={{display:'none'}} />

            <div className="md-form-section">
              <h4 className="md-section-label">01. INFORMACIÓN PÚBLICA</h4>
              
              <div className="md-input-field full">
                <label>NOMBRE COMPLETO DEL OPERADOR</label>
                <div className="md-input-wrap">
                  <input 
                    type="text" 
                    value={formData.nombre} 
                    onChange={e => setFormData({...formData, nombre: e.target.value.toUpperCase()})} 
                    required 
                  />
                  <div className="md-input-bar"></div>
                </div>
              </div>

              <div className="md-grid-inputs">
                <div className="md-input-field">
                  <label>ZONA / PROVINCIA</label>
                  <div className="md-input-wrap">
                    <input 
                      type="text" 
                      value={formData.provincia} 
                      onChange={e => setFormData({...formData, provincia: e.target.value.toUpperCase()})} 
                      required 
                    />
                    <div className="md-input-bar"></div>
                  </div>
                </div>
                <div className="md-input-field">
  <label>WHATSAPP (NÚMERO FEDERAL)</label>
  <div className={`md-inline-edit-wrap ${isEditingPhone ? 'editing' : ''}`}>
    
    {isEditingPhone ? (
      /* MODO EDICIÓN: El input se activa */
      <div className="md-input-wrap">
        <input 
          type="tel" 
          autoComplete="new-password"
          value={formData.celular} 
          onChange={e => setFormData({...formData, celular: e.target.value})}
          autoFocus 
          onBlur={() => !formData.celular && setIsEditingPhone(false)} // Si hace clic afuera y está vacío, se cierra
        />
        <button 
          type="button" 
          className="md-btn-mini-save" 
          onClick={() => setIsEditingPhone(false)}
        >
          OK
        </button>
      </div>
    ) : (
      /* MODO VISTA: El número queda fijo y elegante */
      <div className="md-display-data-row">
        <span className="md-fixed-value">
          {formData.celular || "SIN ASIGNAR"}
        </span>
        <button 
          type="button" 
          className="md-btn-inline-edit" 
          onClick={() => setIsEditingPhone(true)}
        >
          EDITAR
        </button>
      </div>
    )}
                    <div className="md-input-bar"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md-form-section security">
              <h4 className="md-section-label">02. PROTOCOLOS DE ACCESO</h4>
              
              <div className="md-grid-inputs">
                <div className="md-input-field">
                  <label>CLAVE ACTUAL</label>
                  <div className="md-input-wrap">
                    <input 
                      type="password" 
                      placeholder="Contraseña actual"
                      autoComplete="new-password"
                      value={formData.current_password} 
                      onChange={e => setFormData({...formData, current_password: e.target.value})} 
                    />
                    <div className="md-input-bar"></div>
                  </div>
                </div>
                <div className="md-input-field">
                  <label>NUEVA CLAVE (OPCIONAL)</label>
                  <div className="md-input-wrap">
                    <input 
                      type="password" 
                      placeholder="Nueva contraseña"
                      autoComplete="new-password"
                      value={formData.new_password} 
                      onChange={e => setFormData({...formData, new_password: e.target.value})} 
                    />
                    <div className="md-input-bar"></div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="md-btn-submit" disabled={loading}>
              {loading ? "TRANSFERIENDO DATOS..." : "GUARDAR DATOS"}
            </button>

          </form>
        </section>

      </div>
    </div>
  );
}