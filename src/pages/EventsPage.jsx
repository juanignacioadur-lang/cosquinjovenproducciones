import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToElement } from "../utils/scrollUtils";
import { eventsData, newsData } from "../data/data";

// Importamos los nuevos componentes
import MobileTabNav from "../components/MobileTabNav";
import DesktopNewsSlider from "../components/DesktopNewsSlider";

import "./EventsPage.css";

/* Carousel Interno (Lo dejamos aquí porque es pequeño) */
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
          <img key={i} src={src} alt={`Img ${i}`} className={`nt-carousel-img ${i === index ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}

/* EventDetail */
function EventDetail({ event, onClose }) {
  useEffect(() => {
    if (event) scrollToElement("detail-panel-anchor");
  }, [event]);

  if (!event) return null;

  return (
    <div className="nt-detail-panel" id="detail-panel-anchor">
      <div className="nt-detail-head">
        <h3 className="nt-detail-title">{event.title}</h3>
        <button className="nt-hide-btn" onClick={onClose}>CERRAR</button>
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
                {section.text && <p className="nt-text-desc">{section.text}</p>}
                {section.list && <ul className="nt-list-custom">{section.list.map((item, i) => <li key={i}>{item}</li>)}</ul>}
                {section.subSections?.map((sub, j) => (
                  <div key={j} className="nt-subsection">
                    <h5>{sub.title}</h5>
                    {sub.list && <ul className="nt-list-custom">{sub.list.map((it, k) => <li key={k}>{it}</li>)}</ul>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <aside className="nt-detail-right">
          <div className="nt-meta-box">
            <div className="nt-meta-row">🗓️ {event.date}</div>
            <div className="nt-meta-row">📍 {event.location}</div>
          </div>
          {event.packs?.length > 0 && (
            <div className="nt-right-section">
              <h4>Packs Disponibles</h4>
              {event.packs.map((p, i) => (
                <div className="nt-pack-card" key={i}>
                  <div className="nt-pack-header"><span>{p.title}</span><span>{p.price}</span></div>
                  {p.items && <ul className="nt-pack-list">{p.items.map((it, j) => <li key={j}>{it}</li>)}</ul>}
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
          {event.instagramLink && <a href={event.instagramLink} target="_blank" rel="noreferrer" className="nt-instagram-btn">VER EN INSTAGRAM</a>}
          {event.whatsappLink && (
            <a href={event.whatsappLink} target="_blank" rel="noreferrer" className="nt-whatsapp-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              MÁS INFORMACIÓN
            </a>
          )}
          {event.reglamentoLink && <span className="nt-reglamento">Descargar Reglamento</span>}
        </aside>
      </div>
      <button className="nt-hide-btn-mobile" onClick={onClose}>CERRAR</button>
    </div>
  );
}

/* COMPONENTE PRINCIPAL */
export default function Noticias() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileNewsIndex, setMobileNewsIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.targetId) {
      setTimeout(() => { scrollToElement(location.state.targetId, 100); }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Syncs
  useEffect(() => { if (activeEvent) setActiveEvent(eventsData[activeIndex]); }, [activeIndex]);
  useEffect(() => { if (activeEvent) setActiveEvent(eventsData[mobileIndex]); }, [mobileIndex]);

  const handleNext3D = () => setActiveIndex((prev) => (prev + 1) % eventsData.length);
  const handlePrev3D = () => setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length);

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
      if (!activeEvent || activeEvent.id !== eventsData[i].id) openDetails(eventsData[i].id);
    } else {
      setActiveIndex(i);
    }
  };

  const mobileEvent = eventsData[mobileIndex] || eventsData[0];
  const mobileNews = newsData[mobileNewsIndex] || newsData[0];

  return (
    <main className="nt-page">
      <div className="nt-container">
        
        <section className="nt-hero" id="events-top-anchor">
          <div className="nt-hero-badge">Nuestros Eventos</div>
          <h1 className="nt-hero-title"><span className="nt-accent-outline">PRÓXIMOS EVENTOS</span></h1>
          <p className="nt-hero-sub">Descubre todos los detalles de nuestros eventos y vive la experiencia.</p>
        </section>

        {/* PC: 3D */}
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
                  <div className="nt-card-actions"><button className="nt-btn">MOSTRAR INFORMACIÓN</button></div>
                </div>
              </article>
            ))}
            <button className="nt-3d-btn nt-3d-next" onClick={handleNext3D}>›</button>
          </div>
        </section>

        {/* MÓVIL: EVENTOS */}
        <section className="nt-cards-area mobile-list-view">
          <MobileTabNav 
            items={eventsData} 
            activeIndex={mobileIndex} 
            onSelect={setMobileIndex} 
            getLabel={(ev) => ev.shortTitle}
          />

          <div className="mobile-card-container">
            <article className="nt-card mobile-styled-card">
              <div className="nt-card-media mobile-tall-media">
                <img src={mobileEvent.image} alt={mobileEvent.title} />
              </div>
              <div className="nt-card-body mobile-card-body-centered">
                <h3 className="nt-card-title">{mobileEvent.title}</h3>
                <div className="nt-card-meta mobile-centered-meta">
                  <div className="nt-meta-item">📅 {mobileEvent.date}</div>
                  <div className="nt-meta-item">📍 {mobileEvent.location}</div>
                </div>
                <div className="nt-card-actions">
                  <button className="mobile-event-btn" onClick={() => openDetails(mobileEvent.id)}>MOSTRAR INFORMACIÓN</button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <div className="nt-detail-wrapper">
          {activeEvent && <EventDetail event={activeEvent} onClose={closeDetails} />}
        </div>

        <section className="news-section" id="news-section-anchor">
          <div className="news-header">
            <span className="news-pill">Últimas Noticias</span>
            <h2 className="news-title"><span className="nt-accent-outline">MANTENTE INFORMADO</span></h2>
            <p className="nt-hero-sub">Novedades, ganadores, recuerdos y todo lo que pasa en nuestra comunidad folklórica.</p>
          </div>

          {/* PC: SLIDER NOTICIAS */}
          <DesktopNewsSlider newsData={newsData} />

          {/* MÓVIL: NOTICIAS */}
          <div className="mobile-news-view">
            <MobileTabNav 
              items={newsData} 
              activeIndex={mobileNewsIndex} 
              onSelect={setMobileNewsIndex} 
              getLabel={(n) => n.category.toUpperCase()}
            />
            
            <div className="mobile-card-container">
              <article className="nt-card mobile-styled-card">
                <div className="nt-card-media mobile-tall-media">
                  <span className="news-badge" style={{zIndex: 5, top: 10, left: 10}}>{mobileNews.category}</span>
                  <img src={mobileNews.image} alt={mobileNews.title} />
                </div>
                <div className="nt-card-body mobile-card-body-centered">
                  <div className="nt-card-meta mobile-centered-meta">📅 {mobileNews.date}</div>
                  <h3 className="nt-card-title" style={{fontSize: '1.2rem'}}>{mobileNews.title}</h3>
                  <div className="nt-card-actions">
                    <Link to={`/noticias/${mobileNews.id}`} className="mobile-event-btn" style={{textAlign: 'center', display: 'block', textDecoration: 'none'}}>
                      LEER NOTICIA COMPLETA
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}