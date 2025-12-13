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
    
    // Crear el cuerpo del correo
    const subject = `Consulta Web: ${formData.asunto} - ${formData.nombre}`;
    const body = `Hola Cosquín Joven Producciones,%0D%0A%0D%0AMi nombre es: ${formData.nombre}%0D%0AEmail: ${formData.email}%0D%0ATeléfono: ${formData.telefono}%0D%0A%0D%0AMensaje:%0D%0A${formData.mensaje}`;
    
    // Abrir cliente de correo
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
            reglamentos y acreditaciones. Tu participación es lo más importante para nosotros.
          </p>
        </section>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="ct-content">
          
          {/* COLUMNA 1: INFORMACIÓN DE CONTACTO */}
          <div className="ct-info-col">
            
            {/* WhatsApp Card */}
            <div className="ct-info-card">
              <div className="ct-card-header">
                <div className="ct-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <h3 className="ct-card-title">WhatsApp Oficial</h3>
              </div>
              <div className="ct-card-content">
                <p>Atención directa a delegados y profesores.</p>
                <a href="https://wa.me/5493541276887" target="_blank" rel="noreferrer" className="ct-link">
                  +54 9 3541 27-6887
                </a>
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
                <a href="mailto:COSQUINJOVEN.PRODUCCIONES@GMAIL.COM" className="ct-link" style={{fontSize: '0.9rem'}}>
                  COSQUINJOVEN.PRODUCCIONES@GMAIL.COM
                </a>
              </div>
            </div>

            {/* Social Media Buttons */}
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

          {/* COLUMNA 2: FORMULARIO */}
          <div className="ct-form-wrapper">
            <h2 className="ct-form-title">Envíanos un Mensaje</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="ct-form-group">
                <label className="ct-label">Nombre Completo / Delegación</label>
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
                <label className="ct-label">Motivo de Consulta</label>
                <select 
                  name="asunto" 
                  className="ct-select" 
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar una opción...</option>
                  <option value="Inscripción Cosquín Joven 2026">Inscripción Cosquín Joven 2026</option>
                  <option value="Información Cartagena 2026">Información Cartagena 2026</option>
                  <option value="El Argentino 2026">El Argentino 2026</option>
                  <option value="Prensa y Acreditaciones">Prensa y Acreditaciones</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div className="ct-form-group">
                <label className="ct-label">Tu Mensaje</label>
                <textarea 
                  name="mensaje" 
                  className="ct-textarea" 
                  placeholder="Escribe aquí tus dudas o comentarios..." 
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