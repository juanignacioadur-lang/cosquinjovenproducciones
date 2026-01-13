import React, { useState, useMemo, useEffect, useRef } from "react";
import "./AboutPage.css";

/**
 * COMPONENTE: CIMIENTOS SUPREME V700
 * Arquitectura de hardware con numeración ARCH_REF.
 * Diseñado para ser contenido 100% dentro del subfondo.
 */
const CimientoSupreme = ({ icon, title, text, index }) => (
  <article className="f-card-elite">
    <div className="f-inner-wrap">
      {/* Capas decorativas de Hardware */}
      <div className="f-glow"></div>
      <div className="f-icon-box">{icon}</div>
      <div className="f-content-v25">
        <h4 className="f-title-h4">{title}</h4>
        <div className="f-hr"></div>
        <p className="f-text-p">{text}</p>
      </div>
    </div>
  </article>
);

/**
 * COMPONENTE: CINEMA ENGINE V700 (THE MASTER VISOR)
 * Motor de galería blindado con HUD de metadatos y navegación táctica.
 * Resolvemos el error de desbordamiento mediante contención absoluta.
 */
/**
 * COMPONENTE: CINEMA ENGINE V700 (THE MASTER VISOR)
 * Motor de galería blindado con HUD de metadatos y navegación táctica.
 * Añadida lógica de gestos táctiles (Swipe) para móviles.
 */
const CinemaEngineSupreme = ({ items = [], type = "photo" }) => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const len = items.length;

  // --- LÓGICA DE GESTOS TÁCTILES ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;  // Deslizar a la izquierda
    const isRightSwipe = distance < -50; // Deslizar a la derecha

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };
  // ---------------------------------

  useEffect(() => {
    setIndex(0);
  }, [type]);

  const handleNext = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIndex((prev) => (prev + 1) % len);
  };

  const handlePrev = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIndex((prev) => (prev - 1 + len) % len);
  };

  const handleMaximize = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitEnterFullscreen) {
        videoRef.current.webkitEnterFullscreen();
      }
    }
  };

  if (len === 0) return null;

  return (
    <div className="archive-section-bottom">
      <div 
        className="cinema-black-capsule"
        /* EVENTOS TÁCTILES ACTIVADOS */
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        <div className="cinema-hud-metadata">
          <div className="meta-brand">
            ARCHIVO: {type.toUpperCase()}
          </div>
          <div className="meta-pager">
             {String(index + 1).padStart(2, '0')} <span className="pager-slash">/ {String(len).padStart(2, '0')}</span>
          </div>
        </div>

        <button className="cinema-nav-arrow prev" onClick={handlePrev} title="Anterior">
          <span>‹</span>
        </button>

        <div className="cinema-render-viewport">
          {type === "photo" ? (
            <img 
              key={`p-${index}`} 
              src={items[index]} 
              alt="Historical Record" 
              className="cinema-media-element anim-fade-in" 
            />
          ) : (
             <video 
               key={`v-${index}`} 
               ref={videoRef}
                    /* 
                    TRUCO CLAVE: Agregamos #t=0.001 al final de la ruta. 
                    Esto le dice a iOS que el video debe posicionarse en el milisegundo 1, 
                    lo que obliga al navegador a renderizar ese primer fotograma.
                    */
                  src={`${items[index]}#t=0.001`} 
                  className="cinema-media-element" 
                  controls 
                  playsInline 
                  muted={false} /* Si quieres que se vea la imagen, a veces iOS pide que empiece muteado, pero con el truco del tiempo no hace falta */
                  preload="auto" /* Cambiado de metadata a auto para mayor compatibilidad */
              />
          )}
        </div>

        <button className="cinema-nav-arrow next" onClick={handleNext} title="Siguiente">
          <span>›</span>
        </button>
      </div>

      {type === "video" && (
        <button className="mobile-maximize-btn" onClick={handleMaximize}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          MAXIMIZAR VIDEO
        </button>
      )}
    </div>
  );
};

export default function AboutPage() {
  const [tab, setTab] = useState('photos');

  // Datos Multimedia Íntegros (Carga dinámica de 44 fotos y 8 videos)
  const galleryImages = useMemo(() => 
    Array.from({ length: 44 }, (_, i) => `/sobre nosotros/${i + 1}.jpg`), []);
  
  const galleryVideos = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => `/videos/${i + 1}.mp4`), []);

  return (
    <div className="about-monumental-layout">
      {/* EL PILAR CENTRAL (SUBFONDO) - Aquí se inyecta la sombra roja perimetral */}
      <div className="about-pilar-central anim-fade-in">

        {/* ============================================================
            ACTO 1: HISTORIA EDITORIAL (VIEWPORT LOCK)
            ============================================================ */}
        <section className="h-editorial-section">
          <header className="h-header">
            <div className="h-pretitle">
               <span className="h-dot"></span>
               <span className="h-label">REGISTRO HISTÓRICO</span>
            </div>
            <h1 className="h-main-title-expanded">
              EL ALMA DE <br /> 
              <span data-text="NUESTRA TIERRA">NUESTRA TIERRA</span>
            </h1>
            <div className="h-neon-hr-long"></div>
          </header>

          <div className="h-master-grid">
            <div className="h-text-side">
              <h2 className="h-quote-v24">
                30 años acompañando artistas y bailarines en cada escenario del país.
              </h2>
              
              <div className="h-editorial-body">
                <p>
                  Tres décadas de escenarios, festivales, aplausos y aprendizajes que nos marcaron para siempre. 
                  <strong className="cj-bold-red"> Nuestra historia nació del amor por el folklore</strong> y del deseo profundo de crear espacios donde la cultura argentina pueda vivirse con el corazón.
                </p>
                
                <p>
                  Desde nuestros primeros pasos sentimos que el folklore no es solo música o danza: es un latido que viene de nuestros abuelos, 
                  de nuestras raíces y de esas historias que se transmiten de generación en generación. Así nació 
                  <strong className="cj-bold-white"> Cosquín Joven Producciones</strong>: como un proyecto familiar impulsado por el respeto y la pasión cultural.
                </p>
                
                <p>
                  Desde el inicio tuvimos una misión clara: que cada niño, joven y adulto encuentre un escenario que lo abrace, un público que lo acompañe 
                  y una experiencia que lo marque. Acompañamos a artistas de todas las edades: desde semillitas que dan sus primeros pasos 
                  hasta mayores que llevan toda una vida honrando la danza.
                </p>
                
                <p>
                  Hoy somos una plataforma federal que abraza a miles de artistas, profesores y delegados de todo el país, formando una familia cultural 
                  que no deja de crecer bajo el cielo de Cosquín.
                </p>
              </div>
            </div>
            
                 <div className="h-visual-side">
    {/* PRIMERA IMAGEN */}
    <div className="h-image-canvas">
        <img src="/Informacion.jpg" alt="Historia Cosquín" className="h-image-render" />
        <div className="h-frame-deco"></div>
    </div>

    <div className="h-image-canvas" style={{ marginTop: '-30px' }}>
        <img src="/inicio.jpg" alt="Gala Cosquín" className="h-image-render" />
        <div className="h-frame-deco-bottom"></div>
    </div>
</div> {/* Este cierra h-visual-side */}
</div> {/* ESTE ES EL QUE TE FALTA: Cierra h-master-grid */}
</section> {/* Este cierra h-editorial-section */}
               

        <div className="master-separator-v21"></div>

        {/* ============================================================
            ACTO 2: CIMIENTOS MASTER (HARDWARE GRID)
            ============================================================ */}
        <section className="f-master-section">
          <header className="f-header">
            <h2 className="f-title">NUESTROS CIMIENTOS</h2>
            <p className="f-label-sub">LA BASE ESTRUCTURAL DE NUESTROS VALORES INSTITUCIONALES</p>
          </header>
          
          {/* El grid que se adapta 4x1 en PC y 2x2 en móvil */}
          <div className="f-grid-matrix">
            <CimientoSupreme index={0} icon="❤️" title="ADN Familiar" text="Cercanía real y trato personalizado con cada delegación del país." />
            <CimientoSupreme index={1} icon="🤝" title="Encuentro" text="Propiciamos la unión federal artística entre todas las provincias." />
            <CimientoSupreme index={2} icon="🏆" title="Excelencia" text="Buscamos la máxima calidad técnica y artística en cada gala." />
            <CimientoSupreme index={3} icon="🌎" title="Proyección" text="Llevamos el talento argentino a los escenarios globales." />
          </div>
        </section>

        <div className="master-separator-v21"></div>

        {/* ============================================================
            ACTO 3: MOMENTOS MEMORABLES (MUSEO V700)
            ============================================================ */}
        <section className="m-multimedia-section">
          <header className="archive-header-v25">
            <div className="m-branding-box">
              <span className="m-serial">REGISTRO CINEMATOGRÁFICO</span>
              <h2 className="archive-main-title-v25">MOMENTOS <span>MEMORABLES</span></h2>
              <div className="m-underline-neon"></div>
              <p className="m-subtitle-museum">CENTRO DE PRESERVACIÓN VISUAL - REGISTRO CINEMATOGRÁFICO DE GALA</p>
            </div>
            
            <div className="archive-tabs-container">
              <button 
                className={tab === 'photos' ? 'is-active' : ''} 
                onClick={() => setTab('photos')}
              >
                FOTOGRAFÍAS
              </button>
              <button 
                className={tab === 'videos' ? 'is-active' : ''} 
                onClick={() => setTab('videos')}
              >
                CINEMATOGRAFÍA
              </button>
            </div>
          </header>

          {/* MOTOR DE RENDERIZADO CINEMA V700 */}
          <CinemaEngineSupreme 
            key={tab} 
            items={tab === 'photos' ? galleryImages : galleryVideos} 
            type={tab === 'photos' ? 'photo' : 'video'} 
          />
        </section>

      </div>
    </div>
  );
}