import React, { useState } from "react";
import "./InfoCard.css";
import logo from "/logofundacion.png"; // Ajusta esta ruta si es necesario

export default function InfoBox() {
  // Estado para saber si está minimizado (visible por defecto)
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleInfo = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Caja Principal */}
      <div className={`info-box ${isMinimized ? "minimized" : ""}`}>
        
        {/* Botón de cerrar/minimizar */}
        <button 
            className="info-toggle-btn" 
            onClick={toggleInfo}
            aria-label="Minimizar información"
        >
          ✕
        </button>

        <img src={logo} alt="Logo" className="info-logo" />
        <div className="info-text">
          <p className="info-title">
            <span className="info-icon">❤️</span> FUNDACIÓN COSQUIN EN ACCIÓN
          </p>
          <p className="info-subtitle">
            Trabajando por la cultura y la educación en nuestra comunidad
          </p>
        </div>
      </div>

      {/* Botón Flotante para volver a abrir (solo si está minimizado) */}
      {isMinimized && (
        <button className="info-restore-btn" onClick={toggleInfo}>
          <span className="info-icon">←</span>❤️ COSQUIN EN ACCION
        </button>
      )}
    </>
  );
}
