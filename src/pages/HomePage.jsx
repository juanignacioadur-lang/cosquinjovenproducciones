import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function Inicio() {
  // Estado para controlar la carga del video
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      {/* 
         VIDEO DE FONDO 
         - Sin 'poster' para que no salga el logo gigante.
         - Opacidad controlada: invisible hasta que cargue.
      */}
      <video
        className={`video-fondo ${videoLoaded ? "video-visible" : "video-hidden"}`}
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto" // Carga prioritaria
        onLoadedData={() => setVideoLoaded(true)} // Avisa cuando está listo
      />
      
      {/* Overlay Oscuro */}
      <div className="overlay" />

      {/* CONTENIDO PRINCIPAL */}
      <main className="inicio-hero" role="main" aria-label="Bienvenida">
        <img
          src="/logo.png"
          alt="COSQUIN JOVEN"
          className="inicio-logo"
          loading="eager"
        />

        {/* 1. ESTADÍSTICAS */}
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

        {/* 2. BOTONES DE ACCIÓN */}
        <div className="inicio-actions">
          <Link to="/noticias" className="cj-btn cj-btn-primary">
            Ver Próximos Eventos
          </Link>
          <Link to="/contacto" className="cj-btn cj-btn-outline">
            Contactar
          </Link>
        </div>

      </main>
    </>
  );
}