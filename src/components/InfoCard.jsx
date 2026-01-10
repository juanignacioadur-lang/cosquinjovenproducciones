import React, { useState, useEffect } from "react";
import "./InfoCard.css";
import logo from "/logofundacion.png"; 

export default function InfoBox() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 900);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) setIsOpen(false);
      else setIsOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`infocard-wrapper ${isOpen ? "is-open" : "is-closed"}`}>
      
      {/* BOTÓN INTEGRADO (BARRA VERTICAL) */}
      <button 
        className="infocard-trigger" 
        onClick={toggleInfo}
        aria-label={isOpen ? "Cerrar" : "Abrir"}
      >
        <div className="trigger-content">
          <span className="trigger-icon">{isOpen ? "→" : "←"}</span>
          <span className="trigger-text">FUNDACIÓN</span>
        </div>
      </button>

      {/* PANEL RECTANGULAR */}
      <div className="infocard-main">
        <div className="infocard-body-horizontal">
          <div className="infocard-logo-side">
            <img src={logo} alt="Logo Fundación" className="infocard-logo-rect" />
          </div>
          <div className="infocard-text-side">
            <h4 className="infocard-title-rect">FUNDACIÓN COSQUÍN EN ACCIÓN</h4>
            <p className="infocard-subtitle-rect">
              Trabajando por la cultura y la educación en nuestra comunidad.
            </p>
          </div>
        </div>
        <div className="infocard-glow-line"></div>
      </div>
    </div>
  );
}