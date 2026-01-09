import React, { useState, useEffect } from "react"; // 1. Agregamos useEffect aquí
import { Link } from "react-router-dom";
import "./HomePage.css";

// 2. Definimos CountUp AFUERA de la función Inicio
const CountUp = ({ end, duration = 2000, prefix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Cálculo del número actual
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{prefix}{count.toLocaleString()}</>;
};

export default function Inicio() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <video
        className={`video-fondo ${videoLoaded ? "video-visible" : "video-hidden"}`}
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
      />
      
      <div className="overlay" />

      <main className="inicio-hero" role="main" aria-label="Bienvenida">
        <img
          src="/logo.png"
          alt="COSQUIN JOVEN"
          className="inicio-logo"
          loading="eager"
        />

        <div className="inicio-stats">
          <div className="stat-item">
            <span className="stat-number">
              {/* Solo inicia la animación si queremos, o siempre al cargar */}
              <CountUp end={30} duration={2000} prefix="+" />
            </span>
            <span className="stat-label">Años Cumpliendo Sueños</span>
          </div>
          
          <div className="stat-divider"></div>
          
          <div className="stat-item">
            <span className="stat-number">
              <CountUp end={5000} duration={2000} prefix="+" />
            </span>
            <span className="stat-label">Participantes</span>
          </div>
        </div>

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