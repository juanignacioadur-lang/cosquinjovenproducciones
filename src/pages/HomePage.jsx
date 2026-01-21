import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import ResumenHome from './ResumenHome';
import HomeGallery from './HomeGallery';

const CountUp = ({ end, duration = 2000, prefix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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
  const [isVisible, setIsVisible] = useState(true);
  
  // --- ESTADOS DE CONTROL ---
  const [cargado, setCargado] = useState(false); // Fix: Definimos cargado

  useEffect(() => {
    // Timer para que el indicador aparezca después de 1 segundo
    const timer = setTimeout(() => {
      setCargado(true);
    }, 1000);

    const handleScroll = () => {
      // Si el usuario bajó más de 100px, ocultamos la flecha
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer); // Limpieza de seguridad
    };
  }, []);

  const scrollToPilares = (e) => {
    e.preventDefault();
    const section = document.getElementById("resumen-explorar");
    if (section) {
      const yOffset = -80; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="home-scroll-container"> 
      {/* 1. VIDEO DE FONDO */}
      <video
        className={`video-fondo ${videoLoaded ? "video-visible" : "video-hidden"}`}
        src="/background.mp4"
        autoPlay muted loop playsInline preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
      />
      
      <div className="overlay" />

      {/* 2. SECCIÓN HERO */}
      <main className="inicio-hero" role="main">
        <img 
          src="/logo.png" 
          alt="COSQUIN JOVEN" 
          className="inicio-logo anim-reveal" 
          style={{ animationDelay: '0.4s' }} 
        />
        
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

        <div className="inicio-actions anim-reveal" style={{ animationDelay: '0.6s' }}>
          <Link to="/noticias" className="cj-btn cj-btn-primary">Ver Próximos Eventos</Link>
          <button onClick={scrollToPilares} className="cj-btn cj-btn-outline">
            Explorar
          </button>
        </div>

        {/* --- INDICADOR DE SCROLL (CENTRADOR) --- */}
        <div className="scroll-hint-centering-box">
          {cargado && (
            <div className={`home-scroll-hint ${isVisible ? 'fade-in' : 'fade-out'}`}>
              <span className="scroll-hint-text">CONÓCENOS</span>
              <svg className="scroll-arrow-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M12 3V21M12 21L5 14M12 21L19 14" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="square" 
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="hero-transition-fade"></div>
      </main>

      {/* 3. SECCIONES DE ABAJO */}
      <ResumenHome />
      <HomeGallery />

      <footer className="main-footer-supreme">
        <p>
          TODOS LOS DERECHOS DE CONTENIDO ESTÁN RESERVADOS A <span className="footer-brand-red">COSQUÍN JOVEN</span> PRODUCCIONES
        </p>
      </footer>
    </div>
  );
}