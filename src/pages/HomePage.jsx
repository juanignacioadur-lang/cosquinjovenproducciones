import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function Inicio() {
  return (
    <>
      <video className="video-fondo" src="/background.mp4" autoPlay muted loop playsInline poster="/logo.png" />
      <div className="overlay" />

      <main className="inicio-hero" role="main" aria-label="Bienvenida" style={{ position: 'relative', zIndex: 3 }}>
        <img src="/logo.png" alt="COSQUIN JOVEN" className="inicio-logo" loading="eager" />

        <div className="inicio-actions">
          <Link to="/noticias" className="cj-btn cj-btn-primary">Ver Próximos Eventos</Link>
          <Link to="/contacto" className="cj-btn cj-btn-outline">Contactar</Link>
        </div>

        <div className="inicio-stats">
          <div className="stat-item">
            <span className="stat-number">+30</span>
            <span className="stat-label">Años Cumpliendo Sueños</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">+5000</span>
            <span className="stat-label">Participantes</span>
          </div>
        </div>
      </main>
    </>
  );
}