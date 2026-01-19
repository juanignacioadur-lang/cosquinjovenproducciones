import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    const body = `Hola Cosquín Joven Producciones,%0D%0AMi nombre es: ${formData.nombre}%0D%0AEmail: ${formData.email}%0D%0ATeléfono: ${formData.telefono}%0D%0AMensaje:%0D%0A${formData.mensaje}`;
    window.location.href = `mailto:COSQUINJOVEN.PRODUCCIONES@GMAIL.COM?subject=${subject}&body=${body}`;
  };

  return (
    <main className="ct-page-root">
      {/* CAPA DE TEXTURA GRID */}
      <div className="ct-grid-overlay"></div>

      <div className="ct-pilar-central anim-reveal">
        
        {/* CABECERA: AJUSTE DE LOGO Y TÍTULO */}
        <section className="ct-hero">
          <div className="h-pretitle">
            <span className="h-dot"></span>
            <span className="h-label">CENTRAL DE COMUNICACIONES // CJ_COMM_V29</span>
          </div>
          <div className="ct-title-wrap">
            <h1 className="ct-main-title">CONTACTO y..  </h1>
            <span className="ct-sig-title"> Prensa</span>
          </div>
          <div className="ct-hr-neon"></div>
          <p className="ct-subtitle">
            Estableciendo enlaces federales. Sistema de atención prioritaria para delegaciones, prensa y organismos institucionales.
          </p>
        </section>

        <div className="ct-master-grid">
          
          {/* LADO IZQUIERDO: HARDWARE MODULES */}
          <aside className="ct-info-side">
            
            {/* WHATSAPP CARD */}
            <div className="ct-tech-card wa-module">
              <div className="card-corner top-left"></div>
              <div className="card-corner bottom-right"></div>
              <div className="mod-header">
                <div className="mod-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.4 8.38 8.38 0 0 1 3.8.9L21 4.5l-1.4 4.6z"/>
                  </svg>
                </div>
                <span className="mod-tag">[ CONEXIÓN DIRECTA ]</span>
              </div>
              <h3 className="mod-title">WHATSAPP <br/>DELEGADOS</h3>
              <p className="mod-desc">Gestión de inscripciones y logística para directores.</p>
              <a href="https://wa.me/5493541393487" target="_blank" rel="noreferrer" className="ct-glitch-btn">
                INICIAR PROTOCOLO
              </a>
            </div>

            {/* EMAIL CARD */}
            <div className="ct-tech-card mail-module">
              <div className="card-corner top-left"></div>
              <div className="card-corner bottom-right"></div>
              <div className="mod-header">
                <div className="mod-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <span className="mod-tag">[ CANAL OFICIAL ]</span>
              </div>
              <h3 className="mod-title">ADMINISTRACIÓN <br/> CENTRAL</h3>
              <p className="mod-desc">Envío de material de prensa y acreditaciones.</p>
              <a href="mailto:COSQUINJOVEN.PRODUCCIONES@GMAIL.COM" className="mail-anchor">
                COSQUINJOVEN.PRODUCCIONES@GMAIL.COM
              </a>
            </div>

            {/* SOCIAL HUB - HARDWARE INTERFACE */}
            <div className="ct-social-hardware">
              <h4 className="hub-label">SISTEMA DE ENLACES // SOCIAL_HUB</h4>
              <div className="hub-grid">
                
                {/* INSTAGRAM */}
                <a href="https://www.instagram.com/cosquinjoven.producciones/" target="_blank" rel="noreferrer" className="hub-item">
                  <div className="hub-inner-content">
                    <svg className="hub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="hub-name">INSTAGRAM</span>
                  </div>
                  <span className="hub-id">//01</span>
                </a>

                {/* FACEBOOK */}
                <a href="https://www.facebook.com/share/17T1nkD7Mb/" target="_blank" rel="noreferrer" className="hub-item">
                  <div className="hub-inner-content">
                    <svg className="hub-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span className="hub-name">FACEBOOK</span>
                  </div>
                  <span className="hub-id">//02</span>
                </a>

              </div>
            </div>
          </aside>

          {/* LADO DERECHO: FORMULARIO TERMINAL */}
          <section className="ct-form-side">
            <div className="ct-terminal-box">
              <header className="terminal-header">
                <div className="terminal-dots"><span></span><span></span><span></span></div>
                <span className="terminal-title">Contacto directo al correo.</span>
              </header>
              
              <form onSubmit={handleSubmit} className="ct-terminal-form">
                <div className="form-grid">
                  <div className="input-field">
                    <label>NOMBRE RESPONSABLE</label>
                    <input type="text" name="nombre" placeholder="Nombre completo" required value={formData.nombre} onChange={handleChange} />
                  </div>
                  <div className="input-field">
                    <label>TELÉFONO</label>
                    <input type="tel" name="telefono" placeholder="+54 9..." required value={formData.telefono} onChange={handleChange} />
                  </div>
                </div>

                <div className="input-field">
                  <label>DIRECCIÓN E-MAIL</label>
                  <input type="email" name="email" placeholder="usuario@servidor.com" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="input-field">
                  <label>ASUNTO ESTRATÉGICO</label>
                  <select name="asunto" value={formData.asunto} onChange={handleChange} required>
                    <option value="">SELECCIONAR...</option>
                    <option value="Inscripción Cosquín Joven 2026">INSCRIPCIÓN 2026</option>
                    <option value="Información Cartagena 2026">CARTAGENA 2026</option>
                    <option value="Prensa">PRENSA</option>
                    <option value="Otros">OTROS</option>
                  </select>
                </div>

                <div className="input-field">
                  <label>MENSAJE TÉCNICO</label>
                  <textarea name="mensaje" placeholder="Escriba su consulta..." required value={formData.mensaje} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="ct-btn-supreme">
                  ENVIAR MENSAJE <span>[ TRANSMITIR ]</span>
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}