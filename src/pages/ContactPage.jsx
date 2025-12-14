import React, { useState } from "react";
import "./ContactPage.css";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Consulta Web: ${formData.asunto} - ${formData.nombre}`;
    const body = `Hola Cosquín Joven Producciones,%0D%0A%0D%0AMi nombre es: ${formData.nombre}%0D%0AEmail: ${formData.email}%0D%0ATeléfono: ${formData.telefono}%0D%0A%0D%0AMensaje:%0D%0A${formData.mensaje}`;
    window.location.href = `mailto:COSQUINJOVEN.PRODUCCIONES@GMAIL.COM?subject=${subject}&body=${body}`;
  };

  return (
    <main className="ct-page">
      <div className="ct-container">
        
        {/* --- HERO HEADER --- */}
        <section className="ct-hero">
          <img src="/logo.png" alt="Cosquin Joven Logo" className="ct-hero-logo" />
          <h1 className="ct-title">CONTACTO Y <span>PRENSA</span></h1>
          <p className="ct-subtitle">
            Estamos a disposición para responder todas tus consultas sobre inscripciones, 
            reglamentos y acreditaciones.
          </p>
        </section>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="ct-content">
          
          {/* COLUMNA 1: INFORMACIÓN DE CONTACTO */}
          <div className="ct-info-col">
            
            {/* WhatsApp Card */}
            <div className="ct-info-card ct-whatsapp-card">
              <div className="ct-card-header">
                <div className="ct-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <h3 className="ct-card-title">WhatsApp Oficial</h3>
              </div>
              
              <div className="ct-card-content">
                <p>Atención directa a delegados y profesores.</p>
                <div className="ct-whatsapp-action">
                  <span className="ct-number-display">+54 9 3541 27-6887</span>
                  <a href="https://wa.me/5493541276887" target="_blank" rel="noreferrer" className="ct-wa-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Enviar Mensaje
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="ct-info-card">
              <div className="ct-card-header">
                <div className="ct-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <h3 className="ct-card-title">Correo Electrónico</h3>
              </div>
              <div className="ct-card-content">
                <p>Envío de música, pistas y documentación.</p>
                <a href="mailto:COSQUINJOVEN.PRODUCCIONES@GMAIL.COM" className="ct-link ct-email-link">
                  COSQUINJOVEN.PRODUCCIONES@GMAIL.COM
                </a>
              </div>
            </div>

            {/* Social Media Card (NUEVO CUADRO) */}
            <div className="ct-info-card">
              <h3 className="ct-social-title">SÍGUENOS EN NUESTRAS REDES</h3>
              <div className="ct-social-grid">
                <a href="https://www.instagram.com/cosquinjoven.producciones/" target="_blank" rel="noreferrer" className="ct-social-btn insta">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  Instagram
                </a>
                <a href="https://www.facebook.com/share/17T1nkD7Mb/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="ct-social-btn face">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  Facebook
                </a>
              </div>
            </div>

          </div>

          {/* COLUMNA 2: FORMULARIO */}
          <div className="ct-form-wrapper">
            <h2 className="ct-form-title">Envíanos un mensaje al correo</h2>
            
            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-form-group">
                <label className="ct-label">Nombre / Delegación</label>
                <input 
                  type="text" 
                  name="nombre" 
                  className="ct-input" 
                  placeholder="Ej: Academia La Tradición" 
                  required 
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="ct-form-group">
                <label className="ct-label">Email de Contacto</label>
                <input 
                  type="email" 
                  name="email" 
                  className="ct-input" 
                  placeholder="tucorreo@email.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="ct-form-group">
                <label className="ct-label">Teléfono / WhatsApp</label>
                <input 
                  type="tel" 
                  name="telefono" 
                  className="ct-input" 
                  placeholder="+54 9 ..." 
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="ct-form-group">
                <label className="ct-label">Motivo</label>
                <select 
                  name="asunto" 
                  className="ct-select" 
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Inscripción Cosquín Joven 2026">Inscripción Cosquín Joven 2026</option>
                  <option value="Información Cartagena 2026">Información Cartagena 2026</option>
                  <option value="El Argentino 2026">El Argentino 2026</option>
                  <option value="Prensa y Acreditaciones">Prensa y Acreditaciones</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div className="ct-form-group">
                <label className="ct-label">Mensaje</label>
                <textarea 
                  name="mensaje" 
                  className="ct-textarea" 
                  placeholder="Escribe aquí..." 
                  required
                  value={formData.mensaje}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="ct-submit-btn">
                Enviar Consulta
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}