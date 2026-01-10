import React, { useState } from "react";
import "./ContactPage.css";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "", email: "", telefono: "", asunto: "", mensaje: ""
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
    <main className="ct-page-root">
      <div className="ct-ui-overlay"></div>

      <div className="ct-pilar-central anim-fade-in">
        
        {/* CABECERA CINEMATOGRÁFICA */}
        <section className="ct-hero">
          <div className="h-pretitle">
            <span className="h-dot"></span>
            <span className="h-label">CENTRAL DE COMUNICACIONES • 2026</span>
          </div>
          <h1 className="ct-main-title">CONTACTO & <span>PRENSA</span></h1>
          <div className="ct-hr-neon"></div>
          <p className="ct-subtitle">
            Conectamos artistas con grandes escenarios. Utiliza nuestros canales oficiales para consultas sobre inscripciones y acreditaciones.
          </p>
        </section>

        <div className="ct-master-grid">
          
          {/* LADO IZQUIERDO: COMUNICACIÓN & REDES */}
          <aside className="ct-info-side">
            
            {/* MÓDULO WHATSAPP */}
            <div className="ct-module-card wa">
              <div className="module-header">
                <div className="module-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <span>CONEXIÓN INMEDIATA</span>
              </div>
              <div className="module-body">
                <h3>WHATSAPP DELEGADOS</h3>
                <p>Atención preferencial para directores de academia.</p>
                <a href="https://wa.me/5493541393487" target="_blank" rel="noreferrer" className="wa-action-btn">
                  INICIAR CONVERSACIÓN
                </a>
              </div>
            </div>

            {/* MÓVULO EMAIL */}
            <div className="ct-module-card mail">
              <div className="module-header">
                <div className="module-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <span>ADMINISTRACIÓN CENTRAL</span>
              </div>
              <div className="module-body">
                <h3>CORREO ELECTRÓNICO</h3>
                <a href="mailto:COSQUINJOVEN.PRODUCCIONES@GMAIL.COM" className="mail-link">
                  COSQUINJOVEN.PRODUCCIONES@GMAIL.COM
                </a>
              </div>
            </div>

            {/* SECCIÓN REDES: DIGITAL HUB */}
            <div className="ct-digital-hub">
              <h4 className="hub-title">DIGITAL HUB</h4>
              <div className="hub-grid">
                <a href="https://www.instagram.com/cosquinjoven.producciones/" target="_blank" rel="noreferrer" className="hub-btn insta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  INSTAGRAM
                </a>
                <a href="https://www.facebook.com/share/17T1nkD7Mb/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="hub-btn face">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  FACEBOOK
                </a>
              </div>
            </div>
          </aside>

          {/* LADO DERECHO: FORMULARIO TÉCNICO */}
          <section className="ct-form-side">
            <div className="ct-form-glass">
              <h3 className="form-title">REGISTRO DE CONSULTA</h3>
              <form onSubmit={handleSubmit} className="ct-main-form">
                <div className="form-group">
                  <label>NOMBRE COMPLETO / ACADEMIA</label>
                  <input type="text" name="nombre" placeholder="Nombre de la institución o responsable" required value={formData.nombre} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>EMAIL DE RESPUESTA</label>
                  <input type="email" name="email" placeholder="correo@ejemplo.com" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>TELÉFONO DE CONTACTO</label>
                  <input type="tel" name="telefono" placeholder="+54 9..." required value={formData.telefono} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>ASUNTO ESTRATÉGICO</label>
                  <select name="asunto" value={formData.asunto} onChange={handleChange} required>
                    <option value="">SELECCIONAR...</option>
                    <option value="Inscripción Cosquín Joven 2026">INSCRIPCIÓN COSQUÍN JOVEN 2026</option>
                    <option value="Información Cartagena 2026">INFORMACIÓN CARTAGENA 2026</option>
                    <option value="Prensa">PRENSA Y MEDIOS</option>
                    <option value="Otros">OTROS</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>MENSAJE</label>
                  <textarea name="mensaje" placeholder="Describe tu consulta aquí..." required value={formData.mensaje} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="ct-submit-btn">
                  ENVIAR MENSAJE
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}