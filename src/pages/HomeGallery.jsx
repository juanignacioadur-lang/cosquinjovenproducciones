import React, { useState } from 'react';
import LightboxViewer from './LightboxViewer'; // Importamos el componente nuevo
import './HomeGallery.css';

// Generamos el array de fotos: 1-13 Verticales, 14-25 Horizontales
const images = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  url: `/home/${i + 1}.jpg`,
  orientation: i + 1 <= 13 ? 'vertical' : 'horizontal'
}));

const HomeGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
    document.body.style.overflow = 'auto'; // Devuelve el scroll
  };

  const nextImg = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevImg = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <section className="home-gallery-section">
      <header className="gallery-header anim-reveal">
        <span className="gallery-sig">Reviví con nosotros el</span>
        <h2 className="gallery-title">FESTIVAL DANZABUELOS 2025</h2>
        <div className="p-divider"></div>
      </header>

      {/* GRILLA MONUMENTAL 5x5 */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div 
            key={img.id} 
            className={`gallery-item ${img.orientation}`}
            onClick={() => openLightbox(index)}
          >
            <img src={img.url} alt={`Festival CJ ${img.id}`} loading="lazy" />
            <div className="item-overlay"><span>AMPLIAR</span></div>
          </div>
        ))}
      </div>

      {/* VISOR INDEPENDIENTE */}
      <LightboxViewer 
        images={images}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onNext={nextImg}
        onPrev={prevImg}
      />
    </section>
  );
};

export default HomeGallery;