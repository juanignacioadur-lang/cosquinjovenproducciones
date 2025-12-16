import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToElement } from "../utils/scrollUtils"; 
import { eventsData, newsData } from "../data/data"; 
import MobileTitleSelector from "../components/MobileTitleSelector"; 
import Desktop3DSlider from "../components/Desktop3DSlider"; // Usando tu componente separado
import "./EventsPage.css";

/* --- Carousel --- */
function Carousel({ images = [], autoPlay = true }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
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
        {images.length > 1 && (
          <div className="nt-carousel-dots">
            {images.map((_, i) => (
              <span key={i} className={`nt-dot ${i === index ? "active" : ""}`} onClick={() => setIndex(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Detalle Evento --- */
function EventDetail({ event, onClose }) {
  // Al montar, scrollea al panel de detalle
  useEffect(() => { if (event) scrollToElement("detail-panel-anchor"); }, [event]);
  
  if (!event) return null;
  return (
    <div className="nt-detail-panel" id="detail-panel-anchor">
      <div className="nt-detail-head">
        <h3 className="nt-detail-title">{event.title}</h3>
        {/* Botón Cerrar Superior */}
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
      
      {/* Botón Cerrar Inferior (Visible solo en móvil) */}
      <button className="nt-hide-btn-mobile" onClick={onClose}>CERRAR</button>
    </div>
  );
}

/* --- MAIN --- */
export default function Noticias() {
  const [activeEvent, setActiveEvent] = useState(null);
  
  // Estados
  const [activeIndex, setActiveIndex] = useState(1);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileNewsIndex, setMobileNewsIndex] = useState(0);
  const [newsIndex, setNewsIndex] = useState(0); 
  const itemsPerPage = 3;

  // Lógica de Swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  // Swipe para Eventos
  const onTouchEndEvents = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setMobileIndex((prev) => (prev === eventsData.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setMobileIndex((prev) => (prev === 0 ? eventsData.length - 1 : prev - 1));
    }
  }

  // Swipe para Noticias
  const onTouchEndNews = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setMobileNewsIndex((prev) => (prev === newsData.length - 1 ? 0 : prev + 1));
    }
    if (isRightSwipe) {
      setMobileNewsIndex((prev) => (prev === 0 ? newsData.length - 1 : prev - 1));
    }
  }

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

  const handleNext3D = () => { setActiveIndex((prev) => (prev + 1) % eventsData.length); };
  const handlePrev3D = () => { setActiveIndex((prev) => (prev - 1 + eventsData.length) % eventsData.length); };

  const handleCardClick = (i) => {
    if (i === activeIndex) {
      if (!activeEvent || activeEvent.id !== eventsData[i].id) openDetails(eventsData[i].id);
    } else {
      setActiveIndex(i);
    }
  };

  const openDetails = (eventId) => {
    const ev = eventsData.find((e) => e.id === eventId);
    if (ev) setActiveEvent(ev);
  };

  // Función que cierrra el detalle y hace scroll al inicio de la sección
  const closeDetails = () => {
    setActiveEvent(null);
    scrollToElement("events-top-anchor");
  };

  const handleNextNews = () => { if (newsIndex < newsData.length - itemsPerPage) setNewsIndex(prev => prev + 1); };
  const handlePrevNews = () => { if (newsIndex > 0) setNewsIndex(prev => prev - 1); };

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
          <Desktop3DSlider 
             events={eventsData}
             activeIndex={activeIndex}
             onNext={handleNext3D}
             onPrev={handlePrev3D}
             onCardClick={handleCardClick}
           />
        </section>

        {/* MÓVIL: EVENTOS */}
        <section className="nt-cards-area mobile-list-view">
          <MobileTitleSelector 
            items={eventsData} 
            activeIndex={mobileIndex} 
            onSelect={setMobileIndex} 
            getLabel={(ev) => ev.shortTitle}
          />
          
          <div 
            className="mobile-card-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndEvents}
          >
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
          <div className="desktop-news-view news-slider-container">
            <button className="nt-3d-btn news-nav-btn prev" onClick={handlePrevNews} disabled={newsIndex === 0} style={{ opacity: newsIndex === 0 ? 0.3 : 1 }}>‹</button>
            <div className="news-track-window">
              <div className="news-track" style={{ transform: `translateX(-${newsIndex * (100 / itemsPerPage)}%)` }}>
                {newsData.map((news) => (
                  <div className="news-slider-item" key={news.id}>
                    <article className="news-item">
                      <div className="news-image-wrapper">
                        <span className="news-badge">{news.category}</span>
                        <img src={news.image} alt={news.title} />
                      </div>
                      <div className="news-content-wrapper">
                        <div className="news-meta">📅 {news.date}</div>
                        <h3 className="news-item-title">{news.title}</h3>
                        <p className="news-excerpt">{news.excerpt}</p>
                        <Link to={`/noticias/${news.id}`} className="news-link">LEER MÁS</Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <button className="nt-3d-btn news-nav-btn next" onClick={handleNextNews} disabled={newsIndex >= newsData.length - itemsPerPage} style={{ opacity: newsIndex >= newsData.length - itemsPerPage ? 0.3 : 1 }}>›</button>
          </div>

          {/* MÓVIL: NOTICIAS */}
          <div className="mobile-news-view">
            <MobileTitleSelector 
              items={newsData} 
              activeIndex={mobileNewsIndex} 
              onSelect={setMobileNewsIndex} 
              getLabel={(n) => n.category.toUpperCase()}
            />
            
            <div 
              className="mobile-card-container"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEndNews}
            >
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