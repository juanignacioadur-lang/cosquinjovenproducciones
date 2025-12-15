import React, { useEffect, useRef, useState } from "react";

/* Carousel Interno */
function Carousel({ images = [], autoPlay = true }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [images.length, autoPlay]);

  if (images.length === 0) return null;

  return (
    <div className="nt-carousel">
      <div className="nt-carousel-window">
        {images.map((src, i) => (
          <img 
            key={i} 
            src={src} 
            alt="Evento" 
            className="nt-carousel-img"
            style={{ 
              opacity: i === index ? 1 : 0,
              zIndex: i === index ? 2 : 1 
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export default function EventDetail({ event, onClose }) {
  const panelRef = useRef(null);

  // SCROLL AL ABRIR: Va hacia el panel con margen
  useEffect(() => {
    if (panelRef.current) {
      setTimeout(() => {
        const y = panelRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  }, [event]);

  if (!event) return null;

  // Renderizado seguro de la información
  return (
    <div className="nt-detail-panel" ref={panelRef}>
      <div className="nt-detail-head">
        <h3 className="nt-detail-title">{event.title}</h3>
        <button className="nt-hide-btn" onClick={onClose}>CERRAR</button>
      </div>

      <div className="nt-detail-grid">
        {/* COLUMNA IZQUIERDA */}
        <div className="nt-detail-left">
          <Carousel images={event.images} />
          
          <div className="nt-intro-box">
             <h4 className="nt-detail-heading">📢 RESEÑA DEL EVENTO</h4>
             <p className="nt-intro-text">{event.longDescription}</p>
          </div>

          {/* AQUÍ SE RENDERIZA LA INFO DETALLADA (LISTAS, ICONOS) */}
          {event.fullDetails && event.fullDetails.map((section, idx) => (
            <div key={idx} className="nt-detail-section">
              <h4 className="nt-detail-heading">{section.icon} {section.title}</h4>
              {section.text && <p className="nt-detail-p">{section.text}</p>}
              
              {section.list && (
                <ul className="nt-detail-list">
                  {section.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}

              {section.subSections && section.subSections.map((sub, j) => (
                <div key={j} className="nt-subsection">
                  <h5>{sub.title}</h5>
                  <ul className="nt-detail-list">
                    {sub.list.map((it, k) => <li key={k}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* COLUMNA DERECHA */}
        <aside className="nt-detail-right">
          <div className="nt-meta">
            <div className="nt-meta-row">📅 {event.date}</div>
            <div className="nt-meta-row">📍 {event.location}</div>
          </div>

          {event.packs && event.packs.length > 0 && (
            <div className="nt-section">
              <h4 className="nt-section-title">Packs Disponibles</h4>
              {event.packs.map((p, i) => (
                <div className="nt-pack" key={i}>
                  <div className="nt-pack-head">
                    <span>{p.title}</span>
                    <span>{p.price}</span>
                  </div>
                  {p.items && <ul>{p.items.map((it, j) => <li key={j}>{it}</li>)}</ul>}
                </div>
              ))}
            </div>
          )}

          {event.instagramLink && (
            <a href={event.instagramLink} target="_blank" rel="noreferrer" className="nt-instagram-btn">
              Ver en Instagram
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}