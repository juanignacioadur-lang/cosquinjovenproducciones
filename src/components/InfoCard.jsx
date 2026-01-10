import React, { useState, useEffect } from "react";
import "./InfoCard.css";
import logo from "/logofundacion.png"; 

export default function InfoBox() {
  // LÓGICA DE CARGA: Inicia abierto en PC (>900px) y cerrado en Móvil
  const [isOpen, setIsOpen] = useState(window.innerWidth > 900);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  // Ajuste automático si el usuario cambia el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`infocard-wrapper ${isOpen ? "is-open" : "is-closed"}`}>
      
      {/* PESTAÑA DE CONTROL (Trigger) */}
      <button 
        className="infocard-trigger" 
        onClick={toggleInfo}
        aria-label={isOpen ? "Esconder" : "Mostrar"}
      >
        <div className="trigger-content">
          <span className="trigger-icon">{isOpen ? "→" : "←"}</span>
          {!isOpen && <span className="trigger-text">FUNDACIÓN</span>}
        </div>
      </button>

      {/* PANEL PRINCIPAL RECTANGULAR */}
      <div className="infocard-main">
        <div className="infocard-body-horizontal">
          
          {/* Lado del Logo */}
          <div className="infocard-logo-side">
            <img src={logo} alt="Logo Fundación" className="infocard-logo-rect" />
          </div>
          
          {/* Lado del Texto */}
          <div className="infocard-text-side">
            <h4 className="infocard-title-rect">
               FUNDACIÓN COSQUÍN EN ACCIÓN
            </h4>
            <p className="infocard-subtitle-rect">
              Trabajando por la cultura y la educación en nuestra comunidad.
            </p>
          </div>

          <span className="infocard-heart-mini">❤️</span>
        </div>
        
        {/* Detalle decorativo LED sutil */}
        <div className="infocard-glow-line"></div>
      </div>
    </div>
  );
}