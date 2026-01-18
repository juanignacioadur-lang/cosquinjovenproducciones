import React, { useState, useEffect } from "react"; // 1. Agregamos useEffect aquí
import { Link } from "react-router-dom";
import "./HomePage.css";
import ResumenHome from './ResumenHome';
<meta name="google-site-verification" content="PHMSJJG6ZRd7dnQwV4UznPyrRV8DY-ruhRg8ptbQMCc" />

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


// ... dentro de tu función Inicio ...

return (
    /* Quitamos el color de fondo acá para que no tape el video */
    <div className="home-scroll-container"> 
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

      <main className="inicio-hero" role="main">
        <img src="/logo.png" alt="COSQUIN JOVEN" className="inicio-logo" />

        <div className="inicio-stats">
          <div className="stat-item">
            <span className="stat-number"><CountUp end={30} prefix="+" /></span>
            <span className="stat-label">Años Cumpliendo Sueños</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number"><CountUp end={5000} prefix="+" /></span>
            <span className="stat-label">Participantes</span>
          </div>
        </div>

        <div className="inicio-actions">
          <Link to="/noticias" className="cj-btn cj-btn-primary">Ver Próximos Eventos</Link>
          <a href="#resumen-explorar" className="cj-btn cj-btn-outline">Explorar</a>
        </div>

        {/* El degradado para fundir el video con el negro de abajo */}
        <div className="hero-transition-fade"></div>
      </main>

      {/* Aquí soltamos el componente nuevo */}
      <ResumenHome />
    </div>
 );
}