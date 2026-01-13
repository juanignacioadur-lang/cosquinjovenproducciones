import React, { useState, useEffect } from "react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Buscamos la cookie específica en el navegador
    const checkConsent = () => {
      const cookies = document.cookie.split('; ');
      const hasConsent = cookies.find(row => row.startsWith('cookie-consent-cj='));
      
      if (hasConsent) {
        // Si ya existe la cookie, nos aseguramos de que el scroll esté habilitado y no mostramos nada
        document.body.style.overflow = "auto";
        setIsVisible(false);
      } else {
        // Si no existe, bloqueamos scroll y mostramos banner
        document.body.style.overflow = "hidden";
        setIsVisible(true);
      }
    };

    checkConsent();
  }, []);

  const handleAccept = () => {
    // 2. CREACIÓN DE COOKIE REAL Y PERMANENTE
    // path=/ hace que funcione en toda la web
    // max-age=31536000 es 1 año en segundos
    // SameSite=Lax es por seguridad moderna
    document.cookie = "cookie-consent-cj=accepted; max-age=31536000; path=/; SameSite=Lax";
    
    // Liberamos el scroll y cerramos
    document.body.style.overflow = "auto"; 
    setIsVisible(false);
  };

  const handleReject = () => {
    // Redirección externa
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null;

  return (
    <>
      {/* CAPA DE BLOQUEO TOTAL */}
      <div className="cookie-blocker-overlay" />

      {/* PANEL SUPERIOR */}
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
        <div className="cookie-bottom-glow"></div>
      </div>
    </>
  );
}