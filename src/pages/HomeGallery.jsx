import React, { useState, useEffect } from 'react';
import './HomeGallery.css';

const HomeGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Generamos el array de fotos del 1 al 25
  const images = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    url: `/home/${i + 1}.jpg`,
    orientation: i + 1 <= 13 ? 'vertical' : 'horizontal'
  }));

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImg(images[index].url);
    document.body.style.overflow = 'hidden'; // Bloquea scroll al abrir
  };

  const closeLightbox = () => {
    setSelectedImg(null);
    document.body.style.overflow = 'auto'; // Devuelve scroll al cerrar
  };

  const nextImg = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImg(images[newIndex].url);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImg(images[newIndex].url);
  };

  return (
    <section className="home-gallery-section">
      <header className="gallery-header anim-reveal">
        <span className="gallery-sig">Reviví con nosotros el</span>
        <h2 className="gallery-title">FESTIVAL DANZABUELOS 2025</h2>
        <div className="p-divider"></div>
      </header>

      {/* GRILLA DE IMÁGENES */}
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div 
            key={img.id} 
            className={`gallery-item ${img.orientation}`}
            onClick={() => openLightbox(index)}
          >
            <img src={img.url} alt={`Danzabuelos ${img.id}`} loading="lazy" />
            <div className="item-overlay">
              <span>AMPLIAR</span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX (PANTALLA COMPLETA) */}
      {selectedImg && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="close-btn">&times;</button>
          <button className="nav-btn prev" onClick={prevImg}>‹</button>
          
          <div className="lightbox-content">
            <img src={selectedImg} alt="Enfoque" />
          </div>

          <button className="nav-btn next" onClick={nextImg}>›</button>
          
          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeGallery;