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

  const scrollToPilares = (e) => {
  e.preventDefault();
  // Buscamos la sección por su ID
  const section = document.getElementById("resumen-explorar"); 
  if (section) {
    section.scrollIntoView({ 
      behavior: "smooth", // Esto activa el movimiento lento/suave
      block: "start"      // Lo alinea al principio de la pantalla
    });
  }
};

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
  {/* 1. LOGO: Aparece primero (0.2s) */}
  <img 
    src="/logo.png" 
    alt="COSQUIN JOVEN" 
    className="inicio-logo anim-reveal" 
    style={{ animationDelay: '0.4s' }} 
  />
  
  <div className="hero-content-box"></div>

  {/* 2. ESTADÍSTICAS: Aparecen después (0.4s) */}
  <div className="inicio-stats anim-reveal" style={{ animationDelay: '0.5s' }}>
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

  {/* 3. ACCIONES: Aparecen al final (0.6s) */}
  <div className="inicio-actions anim-reveal" style={{ animationDelay: '0.6s' }}>
    <Link to="/noticias" className="cj-btn cj-btn-primary">Ver Próximos Eventos</Link>
    <button onClick={scrollToPilares} className="cj-btn cj-btn-outline">
      Explorar
    </button>
  </div>

  {/* DEGRADADO DE SALIDA: Necesario para fundir con los pilares de abajo */}
  <div className="hero-transition-fade"></div>
</main>

      {/* Aquí soltamos el componente nuevo */}
      <ResumenHome />
    </div>
 );
}