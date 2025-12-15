import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { scrollToElement } from "../utils/scrollUtils"; 
import { eventsData, newsData } from "../data/data"; 
import "./EventsPage.css";

/* Carousel (Sin cambios) */
function Carousel({ images = [], autoPlay = true }) {
  const [index, setIndex] = useState(0);
  const intervalRef = React.useRef(null);
  useEffect(() => { setIndex(0); }, [images]);
  useEffect(() => {
    if (!autoPlay || !images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [images, autoPlay]);
  if (!images || images.length === 0) return null;
  return (
    <div className="nt-carousel">
      <div className="nt-carousel-window">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Imagen ${i}`} className={`nt-carousel-img ${i === index ? "active" : ""}`} />
        ))}
        <div className="nt-carousel-dots">
          {images.map((_, i) => (
            <span key={i} className={`nt-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* DETALLE EVENTO (Completo) */
function EventDetail({ event, onClose }) {
  useEffect(() => { if (event) scrollToElement("detail-panel-anchor"); }, [event]);
  if (!event) return null;
  return (
    <div className="nt-detail-panel" id="detail-panel-anchor">
      <div className="nt-detail-head">
        <h3 className="nt-detail-title">{event.title}</h3>
        <button className="nt-hide-btn" onClick={onClose}>CERRAR <br/> <span style={{fontSize: '1.2em'}}>X</span></button>
      </div>
      <div className="nt-detail-grid">
        <div className="nt-detail-left">
          <Carousel images={event.images || [event.image]} />
          <div className="nt-box-resena">
             <h4 className="nt-resena-title">📢 RESEÑA DEL EVENTO</h4>
             <p className="nt-resena-text">{event.longDescription}</p>
          </div>
          <div className="nt-grid-bottom">
             {event.fullDetails?.map((section, idx) => (
               <div key={idx} className="nt-detail-card">
                 <h4 className="nt-detail-card-title">{section.icon} {section.title}</h4>
                 {section.text && <p style={{color:'#ccc', fontSize:'0.9rem', marginBottom:'10px'}}>{section.text}</p>}
                 {section.list && <ul className="nt-list-custom">{section.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
                 {section.subSections?.map((sub, j) => (
                   <div key={j} style={{marginTop:'15px'}}>
                     <h5 style={{color:'#fff', fontSize:'0.9rem', marginBottom:'5px'}}>{sub.title}</h5>
                     {sub.list && <ul className="nt-list-custom">{sub.list.map((it, k) => <li key={k}>{it}</li>)}</ul>}
                   </div>
                 ))}
               </div>
             ))}
          </div>
        </div>
        
        {/* COLUMNA DERECHA STICKY */}
        <aside className="nt-detail-right">
          <div className="nt-meta-box">
            <div className="nt-meta-row">🗓️ {event.date}</div>
            <div className="nt-meta-row">📍 {event.location}</div>
          </div>
          
          {/* RENDERIZADO COMPLETO DE PACKS */}
          {event.packs?.length > 0 && (
            <div className="nt-right-section">
               <h4>Packs Disponibles</h4>
               {event.packs.map((p, i) => (
                  <div className="nt-pack-card" key={i}>
                    <div className="nt-pack-header"><span>{p.title}</span><span>{p.price}</span></div>
                    {/* Aquí mostramos la lista de detalles del pack (cuotas, etc.) */}
                    {p.items && (
                      <ul className="nt-pack-list">
                        {p.items.map((it, j) => <li key={j}>{it}</li>)}
                      </ul>
                    )}
                  </div>
               ))}
            </div>
          )}
          
          {event.prizes?.length > 0 && (
            <div className="nt-right-section">
                <h4>Beneficios y Premios</h4>
                {event.prizes.map((pr, i) => (
                  <div className="nt-benefit-box" key={i}>
                    <div className="nt-benefit-title">{pr.place}</div>
                    <div className="nt-benefit-desc">{pr.reward}</div>
                  </div>
                ))}
            </div>
          )}
          
          {event.instagramLink && (
            <a href={event.instagramLink} target="_blank" rel="noreferrer" className="nt-instagram-btn">VER EN INSTAGRAM</a>
          )}
          {event.reglamentoLink && <span className="nt-reglamento">Descargar Reglamento</span>}
        </aside>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL
export default function Noticias() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeNews, setActiveNews] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (activeEvent) {
      setActiveEvent(eventsData[activeIndex]);
    }
  }, [activeIndex]);

  const handleNext3D = () => { setActiveIndex((prev) => (prev + 1) % eventsData.length); };
  const handlePrev3D = () => { setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length); };

  const getCardClass = (index) => {
    const total = eventsData.length;
    if (index === activeIndex) return "active";
    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;
    if (index === prevIndex) return "prev";
    if (index === nextIndex) return "next";
    return "hidden";
  };

  const openDetails = (eventId) => {
    const ev = eventsData.find((e) => e.id === eventId);
    if (ev) setActiveEvent(ev);
  };

  const closeDetails = () => {
    setActiveEvent(null);
    scrollToElement("events-top-anchor");
  };

  const handleCardClick = (i) => {
    if (i === activeIndex) {
      if (!activeEvent || activeEvent.id !== eventsData[i].id) {
        openDetails(eventsData[i].id);
      }
    } else {
      setActiveIndex(i);
    }
  };

  return (
    <main className="nt-page">
      <div className="nt-container">
        
        <section className="nt-hero" id="events-top-anchor">
          <div className="nt-hero-badge">Nuestros Eventos</div>
          <h1 className="nt-hero-title">
            <span className="nt-accent-outline">PRÓXIMOS EVENTOS</span>
          </h1>
          <p className="nt-hero-sub">Descubre todos los detalles de nuestros eventos y vive la experiencia.</p>
        </section>

        <section className="nt-cards-area desktop-3d-view">
          <div className="nt-cards-3d">
            <button className="nt-3d-btn nt-3d-prev" onClick={handlePrev3D}>‹</button>
            {eventsData.map((ev, i) => (
              <article className={`nt-card ${getCardClass(i)}`} key={ev.id} onClick={() => handleCardClick(i)}>
                <div className="nt-card-media">
                  <img src={ev.image} alt={ev.title} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <div className="nt-card-body">
                  <h3 className="nt-card-title">{ev.title}</h3>
                  <div className="nt-card-meta">
                    <div className="nt-meta-item">📅 {ev.date}</div>
                    <div className="nt-meta-item">📍 {ev.location}</div>
                  </div>
                  <div className="nt-card-actions">
                    <button className="nt-btn">Ver Información Completa</button>
                  </div>
                </div>
              </article>
            ))}
            <button className="nt-3d-btn nt-3d-next" onClick={handleNext3D}>›</button>
          </div>
        </section>

        <section className="nt-cards-area mobile-list-view">
          <div className="mobile-event-list">
              {eventsData.map((ev) => (
                <div className="mobile-event-card" key={ev.id}>
                  <div className="mobile-event-img">
                      <img src={ev.image} alt={ev.title} />
                      <span className="mobile-date-badge">{ev.date}</span>
                  </div>
                  <div className="mobile-event-content">
                      <h3 className="mobile-event-title">{ev.title}</h3>
                      <p className="mobile-event-desc">{ev.short}</p>
                      <button className="mobile-event-btn" onClick={() => openDetails(ev.id)}>
                        Ver Más Información
                      </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <div className="nt-detail-wrapper">
          {activeEvent && <EventDetail event={activeEvent} onClose={closeDetails} />}
        </div>

        <section className="news-section">
          <div className="news-header">
            <span className="news-pill">Últimas Noticias</span>
            <h2 className="news-title">
              <span className="nt-accent-outline">MANTENTE INFORMADO</span>
            </h2>
          </div>
          <div className="news-grid">
            {newsData.map((news) => (
              <article className="news-item" key={news.id}>
                <div className="news-image-wrapper">
                  <span className="news-badge">{news.category}</span>
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="news-content-wrapper">
                  <div className="news-meta">📅 {news.date}</div>
                  <h3 className="news-item-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>
                  
                  <Link to={`/noticias/${news.id}`} className="news-link">
                    LEER MÁS
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}