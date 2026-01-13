import React from "react";
import { Link } from "react-router-dom";
import "./Mantenimiento.css";

const WarningTape = ({ text, className }) => (
  <div className={`caution-tape ${className}`}>
    <div className="tape-content">
      {/* Generamos dos bloques idénticos para el bucle infinito perfecto */}
      {[...Array(2)].map((_, blockIdx) => (
        <div className="tape-block" key={blockIdx}>
          {[...Array(10)].map((_, i) => (
            <span key={i}>
              <span className="stripes"></span> {text} <span className="stripes"></span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default function Mantenimiento() {
  return (
    <div className="mnt-root">
      {/* FONDO TÉCNICO */}
      <div className="mnt-grid-bg"></div>

      {/* CAPA DE CINTAS ESTILO "CRISS-CROSS" (COMO TU IMAGEN) */}
      <div className="mnt-tapes-wrapper">
        <WarningTape text="UNDER MAINTENANCE" className="horizontal-1" />
        <WarningTape text="DO NOT ENTER" className="diagonal-left" />
        <WarningTape text="CAUTION: KEEP OUT" className="diagonal-right" />
        <WarningTape text="DANGER: SYSTEM UPGRADE" className="horizontal-2" />
      </div>

      {/* CONTENEDOR CENTRAL DE ALTA PRECISIÓN */}
      <div className="mnt-pilar anim-fade-in">
        <div className="mnt-card">
          {/* Detalles de hardware neón */}
          <div className="mnt-glow-border"></div>
          
          <div className="mnt-inner">
            <header className="mnt-top-info">
              <div className="mnt-led"></div>
              <span className="mnt-code">SEC_ID: BONO_SYSTEM_OFFLINE</span>
            </header>

            <div className="mnt-logo-container">
              <img src="/logo.png" alt="Cosquin Joven" className="mnt-logo-pro" />
            </div>

            <div className="mnt-text-container">
              <h1 className="mnt-h1">
                SECCIÓN EN <br />
                <span>MANTENIMIENTO</span>
              </h1>
              <div className="mnt-divider-tech"></div>
              <p className="mnt-para">
                Estamos optimizando los servidores y la base de datos para el 
                <strong> Gran Bono 2026</strong>. Muy pronto podrás acceder a tu panel de autogestión.
              </p>
            </div>

            <Link to="/" className="mnt-cta">
              <span className="cta-glitch"></span>
              VOLVER AL INICIO
            </Link>
          </div>
        </div>
      </div>

      {/* OVERLAY DE SCANLINES */}
      <div className="mnt-scanlines"></div>
    </div>
  );
}