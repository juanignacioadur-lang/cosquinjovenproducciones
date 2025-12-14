import React, { useState } from "react";
import "./InfoCard.css";
import logo from "/logofundacion.png"; 

export default function InfoBox() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* CAJA PRINCIPAL */}
      <div className={`info-box ${isOpen ? "open" : "closed"}`}>
        
        {/* Botón cerrar */}
        <button 
            className="info-hide-btn" 
            onClick={toggleInfo}
            aria-label="Ocultar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <img src={logo} alt="Logo Fundación" className="info-logo" />
        
        <div className="info-text">
          <p className="info-title">
            <span className="info-icon">❤️</span> FUNDACIÓN COSQUIN EN ACCIÓN
          </p>
          <p className="info-subtitle">
            Trabajando por la cultura y la educación en nuestra comunidad
          </p>
        </div>
      </div>

      {/* BOTÓN RESTAURAR */}
      <button 
        className={`info-restore-btn ${!isOpen ? "visible" : ""}`} 
        onClick={toggleInfo}
        aria-label="Mostrar información"
      >
        <span className="info-arrow">←</span> 
        <span className="info-label">COSQUIN EN ACCION</span>
      </button>
    </>
  );
}