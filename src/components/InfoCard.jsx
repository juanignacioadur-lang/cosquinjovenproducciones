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
        
        {/* Botón para esconder (Flecha derecha) */}
        <button 
            className="info-hide-btn" 
            onClick={toggleInfo}
            aria-label="Ocultar a la derecha"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
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

      {/* BOTÓN FLOTANTE (NEGRO, estilo barra) */}
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