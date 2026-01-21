import React, { useState } from 'react';
import './LightboxViewer.css';

const LightboxViewer = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const [touchStart, setTouchStart] = useState(0);

  // Si no hay imagen seleccionada, no renderizamos nada
  if (currentIndex === null) return null;

  // --- LÓGICA DE NAVEGACIÓN TÁCTIL (MÓVIL) ---
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    // Si el deslizamiento es mayor a 70px, cambiamos de imagen
    if (touchStart - touchEnd > 70) onNext(); // Deslizar hacia la izquierda
    if (touchStart - touchEnd < -70) onPrev(); // Deslizar hacia la derecha
  };

  return (
    /* Al hacer clic en cualquier parte del fondo negro, se cierra el visor */
    <div className="lb-master-root" onClick={onClose}>
      
      <div 
        className="lb-stage" 
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd}
      >
        
        {/* ============================================================
            ELEMENTOS EXCLUSIVOS MÓVIL (Se controlan vía CSS)
            ============================================================ */}
        
        {/* Botón CERRAR abajo para fácil acceso con el pulgar */}
        <button className="lb-close-mobile-btn" onClick={onClose}>
          CERRAR
        </button>

        {/* Flechas laterales fijas para indicar navegación */}
        <button className="lb-arrow-mobile left" onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
        <button className="lb-arrow-mobile right" onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>


        {/* ============================================================
            ELEMENTOS EXCLUSIVOS PC (Se controlan vía CSS)
            ============================================================ */ /* HUD SUPERIOR: Contador y X arriba */}
        <div className="lb-hud-interface" onClick={(e) => e.stopPropagation()}>
          <div className="lb-counter-box">
            <span className="lb-current-num">{String(currentIndex + 1).padStart(2, '0')}</span> 
            <span className="lb-total-num"> / {images.length}</span>
          </div>
          
          <button className="lb-close-trigger" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* ÁREAS DE NAVEGACIÓN POR PROXIMIDAD (Costados PC) */}
        <button className="lb-arrow-zone left" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
          <span className="lb-chevron">‹</span>
        </button>
        <button className="lb-arrow-zone right" onClick={(e) => { e.stopPropagation(); onNext(); }}>
          <span className="lb-chevron">›</span>
        </button>


        {/* ============================================================
            VIEWPORT: CONTENEDOR CENTRAL DE IMAGEN
            ============================================================ */}
        <div className="lb-image-container" onClick={(e) => e.stopPropagation()}>
          <img 
            key={currentIndex} /* Key para disparar la animación al cambiar */
            src={images[currentIndex].url} 
            className="lb-main-render anim-reveal" 
            alt="Visor Cosquin Joven" 
          />
        </div>

        {/* ETIQUETA TÉCNICA INFERIOR */}
        <footer className="lb-meta-tag">
          SISTEMA DE PRESERVACIÓN VISUAL // FESTIVAL DANZABUELOS 2025
        </footer>

      </div>
    </div>
  );
};

export default LightboxViewer;