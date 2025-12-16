import React from "react";

export default function Desktop3DSlider({ events, activeIndex, onNext, onPrev, onCardClick }) {
  
  const getCardClass = (index) => {
    const total = events.length;
    if (index === activeIndex) return "active";
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    if (index === prevIndex) return "prev";
    if (index === nextIndex) return "next";
    return "hidden";
  };

  return (
    <div className="nt-cards-3d">
      <button className="nt-3d-btn nt-3d-prev" onClick={onPrev}>‹</button>
      
      {events.map((ev, i) => (
        <article 
          className={`nt-card ${getCardClass(i)}`} 
          key={ev.id} 
          onClick={() => onCardClick(i)}
        >
          <div className="nt-card-media">
            <img 
              src={ev.image} 
              alt={ev.title} 
              onError={(e) => { e.currentTarget.style.display = "none"; }} 
            />
          </div>
          <div className="nt-card-body">
            <h3 className="nt-card-title">{ev.title}</h3>
            <div className="nt-card-meta">
              <div className="nt-meta-item">📅 {ev.date}</div>
              <div className="nt-meta-item">📍 {ev.location}</div>
            </div>
            <div className="nt-card-actions">
              <button className="nt-btn">MOSTRAR INFORMACIÓN</button>
            </div>
          </div>
        </article>
      ))}

      <button className="nt-3d-btn nt-3d-next" onClick={onNext}>›</button>
    </div>
  );
}