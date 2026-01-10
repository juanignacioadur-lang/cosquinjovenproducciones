import React, { useState, useEffect } from "react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Usamos una versión de clave nueva por si ya habías aceptado la anterior
    const consent = localStorage.getItem("cookie-consent-v99");
    if (!consent) {
      // Bloqueo total de la pantalla
      document.body.style.overflow = "hidden";
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent-v99", "accepted");
    document.body.style.overflow = "auto"; 
    setIsVisible(false);
  };

  const handleReject = () => {
    // Redirección externa para "cerrar" el acceso
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null;

  return (
    <>
      {/* CAPA DE BLOQUEO TOTAL (Encima de todo) */}
      <div className="cookie-blocker-overlay" />

      {/* BANNER EN EL TOPE ABSOLUTO */}
      <div className="cookie-top-panel anim-down">
        <div className="cookie-panel-content">
          
          <div className="cookie-info-box">
            <span className="cookie-legal-tag">SISTEMA DE PRIVACIDAD OFICIAL</span>
            <h3 className="cookie-panel-title">CONTROL DE PRIVACIDAD & COOKIES</h3>
            <p className="cookie-panel-text">
              Bienvenido al portal oficial de <strong>Cosquín Joven Producciones</strong>. 
              Utilizamos cookies para garantizar la seguridad de tus datos y optimizar la navegación técnica. 
              Para acceder al contenido, debes confirmar tu consentimiento.
            </p>
          </div>
          
          <div className="cookie-action-group">
            <button className="c-btn c-btn-primary" onClick={handleAccept}>
              ACEPTAR Y ENTRAR
            </button>
            <button className="c-btn c-btn-exit" onClick={handleReject}>
              RECHAZAR / SALIR
            </button>
          </div>

        </div>
        
        {/* Línea de brillo inferior (Firma visual) */}
        <div className="cookie-bottom-glow"></div>
      </div>
    </>
  );
}