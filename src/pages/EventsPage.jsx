import React, { useEffect, useRef, useState } from "react";
import "./noticias.css";

/* ---------- Carousel Reutilizable ---------- */
function Carousel({ images = [], autoPlay = true, autoPlayMs = 3500, initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex % Math.max(images.length, 1));
  const [paused, setPaused] = useState(false);
  const len = images.length;
  const intervalRef = useRef(null);

  useEffect(() => { setIndex(initialIndex % Math.max(images.length, 1)); }, [initialIndex, images.length]);
  useEffect(() => {
    if (!autoPlay || paused || len <= 1) return;
    intervalRef.current = setInterval(() => { setIndex((i) => (i + 1) % len); }, autoPlayMs);
    return () => clearInterval(intervalRef.current);
  }, [autoPlay, paused, autoPlayMs, len]);
  useEffect(() => { return () => clearInterval(intervalRef.current); }, []);

  const goPrev = () => setIndex((i) => (i - 1 + len) % len);
  const goNext = () => setIndex((i) => (i + 1) % len);
  const goTo = (i) => setIndex(i % len);

  if (len === 0) return null;

  return (
    <div className="nt-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="nt-carousel-window">
        {len > 1 && <button className="nt-carousel-btn nt-prev" onClick={goPrev}>‹</button>}
        
        <div className="nt-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((src, i) => (
            <div className="nt-slide" key={src + i}>
              <img src={src} alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            </div>
          ))}
        </div>

        {len > 1 && <button className="nt-carousel-btn nt-next" onClick={goNext}>›</button>}
      </div>
      
      {len > 1 && (
        <div className="nt-dots">
          {images.map((_, i) => (
            <button key={i} className={`nt-dot ${i === index ? "active" : ""}`} onClick={() => goTo(i)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Detalle del Evento ---------- */
function EventDetail({ event, onClose, initialSlide = 0 }) {
  const panelRef = useRef(null);
  useEffect(() => { if (panelRef.current) panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); }, [event]);
  if (!event) return null;

  const images = event.images || [];
  const fullDetails = event.fullDetails || [];
  const packs = event.packs || [];
  const prizes = event.prizes || [];

  return (
    <div className="nt-detail-panel" ref={panelRef}>
      <div className="nt-detail-head">
        <h3 className="nt-detail-title">{event.title}</h3>
        <button className="nt-hide-btn" onClick={onClose}>Cerrar</button>
      </div>
      <div className="nt-detail-grid">
        <div className="nt-detail-left">
          <Carousel images={images} initialIndex={initialSlide} autoPlay={false} />
          
          <div className="nt-intro-box">
             <h4 className="nt-detail-heading">📢 RESEÑA DEL EVENTO</h4>
            {event.longDescription && event.longDescription.split("\n").map((p, i) => (
               <p key={i} className="nt-intro-text">{p}</p>
            ))}
          </div>

          {fullDetails.length > 0 && (
            <div className="nt-full-details">
              {fullDetails.map((section, idx) => (
                <div key={idx} className="nt-detail-section">
                  <h4 className="nt-detail-heading">{section.icon} {section.title}</h4>
                  {section.text && <p className="nt-detail-p">{section.text}</p>}
                  {section.list && section.list.length > 0 && (
                    <ul className="nt-detail-list">
                      {section.list.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  )}
                  {section.subSections && section.subSections.map((sub, j) => (
                    <div key={j} className="nt-subsection">
                      <h5>{sub.title}</h5>
                      {sub.list && (
                        <ul className="nt-detail-list">
                          {sub.list.map((it, k) => <li key={k}>{it}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="nt-detail-right">
          <div className="nt-meta">
            <div className="nt-meta-row"><span className="nt-icon">📅</span> <span>{event.date}</span></div>
            <div className="nt-meta-row"><span className="nt-icon">📍</span> <span>{event.location}</span></div>
          </div>
          
          {packs.length > 0 && (
            <div className="nt-section"><h4 className="nt-section-title">Packs Disponibles</h4><div className="nt-packs">{packs.map((p, i) => (<div className="nt-pack" key={i}><div className="nt-pack-head"><div className="nt-pack-title">{p.title}</div><div className="nt-pack-price">{p.price}</div></div>{p.items && <ul className="nt-pack-list">{p.items.map((it, j) => <li key={j}>{it}</li>)}</ul>}</div>))}</div></div>
          )}
          
          {prizes.length > 0 && (
            <div className="nt-section"><h4 className="nt-section-title">Beneficios y Premios</h4><div className="nt-prizes">{prizes.map((pr, i) => (<div className="nt-prize" key={i}><strong>{pr.place}</strong><span>{pr.reward}</span></div>))}</div></div>
          )}
          
          {event.reglamentoLink && (<div style={{ marginTop: 20 }}><a className="nt-reglamento" href={event.reglamentoLink} target="_blank" rel="noreferrer">Descargar PDF</a></div>)}

          {event.instagramLink && (
            <a href={event.instagramLink} target="_blank" rel="noreferrer" className="nt-instagram-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Ver en Instagram
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}

const eventsData = [
  {
    id: "e1",
    title: "COSQUÍN JOVEN AL TEATRO – VILLA CARLOS PAZ",
    short: "Un encuentro único en el Teatro Acuario. Danza, arte y turismo en el corazón de Villa Carlos Paz.",
    date: "20 al 23 de Febrero de 2026",
    location: "Teatro Acuario, Villa Carlos Paz",
    image: "/COSQUIN JOVEN AL TEATRO.jpg",
    images: ["/COSQUIN JOVEN AL TEATRO.jpg"], 
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DQvBp-6jApW/",
    longDescription: "Un encuentro único donde tu ballet o academia vive la magia turística de Villa Carlos Paz: el río, el lago, caminatas, el Reloj Cucú, la temporada teatral y todo el encanto de la ciudad.",
    fullDetails: [
      { title: "Premios y Reconocimientos", icon: "🏆", text: "Cosquín Joven Producciones reconoce el compromiso de cada grupo.", list: ["Si traés 10 personas → 1 Pack Experiencia GRATIS.", "Si traés 50 personas → Premio de $500.000 en efectivo.", "Todos los grupos reciben un cuadro grupal de recuerdo."] },
      { title: "Presentaciones Artísticas", icon: "🎭", subSections: [{ title: "🎵 Cantantes", list: ["2 presentaciones de 5 minutos cada una."] }, { title: "💃 Parejas", list: ["2 presentaciones de 10 minutos cada una."] }, { title: "🩰 Ballets / Grupos", list: ["2 presentaciones de 8 minutos.", "Grupos de +35 integrantes: 3 presentaciones de 8 minutos."] }] },
      { title: "Reglamento Técnico", icon: "⏱️", list: ["Respetar tiempos: Si la música supera el límite, será cortada.", "Si no cumplen duración, pasan al final del último cuadro.", "Enviar música 15 días antes por WhatsApp o Mail."] },
      { title: "Condiciones y Comunicación", icon: "📞", list: ["La participación se confirma pagando el 100% del pack.", "El valor total depende de la cantidad de inscriptos.", "Bajas individuales no modifican el monto total del grupo.", "Comunicación exclusiva con el DELEGADO del grupo."] }
    ],
    packs: [{ title: "OPCIÓN 1 (Congela Precio)", price: "$75.000 x cuota", items: ["1ª cuota: Hasta 15 Dic 2025", "2ª cuota: Hasta 21 Ene 2026", "3ª cuota: Hasta 10 Feb 2026"] }, { title: "OPCIÓN 2", price: "$83.400 x cuota", items: ["1ª cuota: Hasta 2 Ene 2026", "2ª cuota: Hasta 30 Ene 2026", "3ª cuota: Hasta 10 Feb 2026"] }],
    prizes: [{ place: "Premio Grupal", reward: "$500.000 (al traer 50 pax)" }, { place: "Delegados", reward: "Pack Gratis (cada 10 pax)" }, { place: "Recuerdo", reward: "Cuadro institucional" }],
    reglamentoLink: null,
  },
  {
    id: "e2",
    title: "COSQUÍN JOVEN – CARTAGENA 2026",
    short: "1.ª Edición Internacional. Un encuentro donde la danza, el canto y la cultura se unen en la Perla del Caribe.",
    date: "22 al 26 de Septiembre 2026",
    location: "Cartagena de Indias, Colombia",
    image: "/COSQUIN JOVEN CARTAGENA.jpg", 
    images: ["/COSQUIN JOVEN CARTAGENA.jpg"],
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DROAuSCDN1D/",
    longDescription: "¡Llega la 1.ª Edición Internacional! Un encuentro único donde la danza, el canto y la cultura folklórica se unen en Cartagena de Indias, la Perla del Caribe. Participan academias, ballets, cantantes, peñas, escuelas, centros culturales, jubilados, artistas y viajeros que quieran vivir la experiencia.",
    fullDetails: [
      { title: "Pack Experience - Todo Incluido", icon: "🛏️", text: "Disfruta de 7 días y 6 noches con pensión completa.", list: ["Hospedaje 7 días / 6 noches", "Pensión completa (Desayuno, Almuerzo, Cena + Bebidas)", "Remera + gorra oficial del festival", "Credencial, medalla y certificado de participación", "Cursos de capacitación con directores internacionales", "Traslados internos en Cartagena", "Seguro de asistencia médica obligatorio"] },
      { title: "Alojamiento: Hotel El Nuevo Conquistador", icon: "🏨", list: ["Habitaciones con balcón y vista al mar", "Piscina al aire libre", "Restaurante interno y WiFi gratis", "Cerca de Playas El Laguito", "A 5 km del Parque Bolívar y Palacio de la Inquisición"] },
      { title: "Cronograma de Comidas", icon: "🍽️", list: ["Día 22: Almuerzo + Cena", "Día 23 al 27: Desayuno + Almuerzo + Cena", "Día 28: Desayuno + regreso", "Todas las comidas son balanceadas e incluyen bebida."] },
      { title: "Presentaciones Artísticas", icon: "🎭", subSections: [{ title: "🎤 Cantantes / Grupos Vocales", list: ["3 presentaciones en total", "2 en una gala / 1 en la otra", "Duración máx: 8 minutos c/u"] }, { title: "💃 Ballets / Danza", list: ["4 propuestas distintas obligatorias", "2 presentaciones por gala", "Duración máx: 10 minutos c/u"] }] },
      { title: "Reglas Técnicas", icon: "🎵", list: ["Enviar música 20 días antes del evento", "Llevar pendrive con pistas y reseñas", "Seguimiento: Enviar 1 video por mes mostrando progreso"] },
      { title: "Inscripción y Pagos", icon: "✍️", text: "Para asegurar el cupo se debe pagar una seña de 600.000 COP.", list: ["El costo total es por grupo confirmado.", "Si alguien se da de baja, el monto total no cambia."] }
    ],
    packs: [{ title: "PLAN 1 (Desde 4 Marzo)", price: "Cuotas USD", items: ["1ª cuota: USD 200 (45 días tras reserva)", "2ª cuota: USD 200 (1-15 Julio)", "Saldo: USD 200 (hasta 21 Agosto)"] }, { title: "PLAN 2", price: "Cuotas USD", items: ["1ª cuota: USD 250 (hasta 15 Mayo)", "2ª cuota: USD 200 (hasta 15 Junio)", "Saldo: USD 250 (hasta 21 Agosto)"] }],
    prizes: [{ place: "Experiencias", reward: "Playas, Fuerte histórico, Magia colonial" }, { place: "Delegado", reward: "Único contacto con técnica" }],
    reglamentoLink: null,
  },
  {
    id: "e3",
    title: "EL ARGENTINO 2026",
    short: "Un mega evento cultural que reúne tradición, danza, malambo y folklore.",
    date: "20 al 23 de Febrero de 2026",
    location: "Córdoba, Argentina",
    image: "/EL ARGENTINO.jpg",
    images: ["/EL ARGENTINO.jpg"], 
    instagramLink: "https://www.instagram.com/cosquinjoven.producciones/p/DRQhxujDAGd/",
    longDescription: "Un mega evento cultural que reúne tradición, danza, malambo y folklore. Participan academias, escuelas, ballets, instituciones, artistas y malambistas de todas las edades.",
    fullDetails: [
      { title: "Reglamento General", icon: "📘", text: "Objetivo: Convocar a niños, jóvenes y adultos, promoviendo la amistad y el fortalecimiento de las raíces.", list: ["Inscripción abierta hasta el 15 de enero de 2026.", "Certamen competitivo en Ballet Folklórico y Malambo.", "Sonido provisto por la organización (pendrive).", "Todas las categorías deben presentar danza tradicional en etapa inicial."] },
      { title: "Campeonato de Malambo", icon: "🔥", text: "Músicos deben vestir ropa tradicional. Acompañamiento en vivo.", list: ["Semillita (hasta 9): 1-3 min", "Menor Masc/Fem (10-13): 1-3 min / 2-3 min", "Juvenil Masc/Fem (14-17): 2-3 min", "Juvenil Especial Masc (18-20): 2-4 min", "Mayor Masc (21-35) / Norte-Sur (18+): 2-5 min", "Especial (36-42) / Senior (43+): 2-4 min"] },
      { title: "Danza: Parejas y Ballets", icon: "💃", subSections: [{ title: "Parejas (Menor, Juvenil, Mayor, Especial)", list: ["Presentar danza tradicional de su región.", "Final: Cuadro estilizado folklórico o libre."] }, { title: "Conjuntos y Ballets", list: ["Categorías: Semillita, Menor, Juvenil, Mayor, Especial.", "Mínimo 3 parejas, sin máximo.", "Requisito: Danza tradicional (Final: Estilizado máx 7 min).", "Menores pueden participar en categorías mayores hasta 30%."] }] },
      { title: "Malambo Combinado", icon: "🔵", list: ["Categorías: Menor (-14), Juvenil (15-19), Mayor (20+).", "Mínimo 3 integrantes (Masc, Fem o Mixto).", "Se elige la mejor propuesta."] },
      { title: "Premiaciones y Beneficios", icon: "🏅", list: ["Campeones Argentinos (Malambo, Ballet, Combinado): Certificado + Premio Challenger.", "Ranking Nacional: Premios del 1.º al 10.º puesto.", "Campeón de Campeones: Quienes defiendan su Challenger.", "Campeones serán portada del flyer del año siguiente."] }
    ],
    packs: [{ title: "Inscripción", price: "Hasta 15 Ene", items: ["Cierre de inscripciones 15/01/2026", "Consultar valores con organización"] }, { title: "Beneficio Grupal", price: "10x1", items: ["Cada 10 participantes de una misma academia → 1 liberado gratuito."] }],
    prizes: [{ place: "1.º Puesto", reward: "Título Campeón + Challenger" }, { place: "Ranking", reward: "Premios hasta el 10.º lugar" }, { place: "Proyección", reward: "Portada flyer año siguiente" }],
    reglamentoLink: null,
  },
];

/* --- DATOS DE NOTICIAS --- */
const newsData = [
  {
    id: 1,
    title: "COSQUIN JOVEN 2026: INSCRIPCIONES ABIERTAS",
    date: "15 de Noviembre, 2024",
    category: "Inscripciones",
    image: "/informacion1.png", 
    excerpt: "Ya están abiertas las inscripciones para Cosquin Joven 2026. No te pierdas la oportunidad de participar en el evento folklórico más importante del año."
  },
];

export default function Noticias() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [initialSlide, setInitialSlide] = useState(0); 
  const [activeIndex, setActiveIndex] = useState(1);

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
    if (ev) { setActiveEvent(ev); setInitialSlide(0); }
  };

  const closeDetails = () => {
    const topOfCards = document.querySelector(".nt-cards-area");
    if (topOfCards) topOfCards.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setActiveEvent(null), 420);
  };

  // Manejar clic en tarjetas
  const handleCardClick = (i) => {
    if (i === activeIndex) {
      if (!activeEvent) {
        openDetails(eventsData[i].id);
      }
    } else {
      setActiveIndex(i);
      // Si el panel está abierto, actualizarlo
      if (activeEvent) {
        setActiveEvent(eventsData[i]);
      }
    }
  };

  return (
    <main className="nt-page">
      <div className="nt-container">
        
        {/* --- HERO --- */}
        <section className="nt-hero">
          <div className="nt-hero-badge">Nuestros Eventos</div>
          {/* TÍTULO CON ESTILO NEÓN/OUTLINE IGUAL AL DE NOTICIAS */}
          <h1 className="nt-hero-title"><span>PRÓXIMOS</span> <span className="nt-accent">EVENTOS</span></h1>
          <p className="nt-hero-sub">Descubre todos los detalles de nuestros eventos: precios, categorías, premios y más</p>
        </section>

        {/* --- CARRUSEL 3D --- */ }
        <section className="nt-cards-area">
          <div className="nt-cards-3d">
            <button className="nt-3d-btn nt-3d-prev" onClick={handlePrev3D}>‹</button>
            
            {eventsData.map((ev, i) => {
              const isActive = i === activeIndex;
              return (
                <article 
                  className={`nt-card ${getCardClass(i)}`} 
                  key={ev.id}
                  onClick={() => handleCardClick(i)} 
                  style={{ cursor: 'pointer' }}
                >
                  <div className="nt-card-media">
                    <img src={ev.image} alt={ev.title} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                  <div className="nt-card-body">
                    <h3 className="nt-card-title">{ev.title}</h3>
                    <div className="nt-card-meta">
                      <div className="nt-meta-item"><span className="nt-icon">📅</span>{ev.date}</div>
                      <div className="nt-meta-item"><span className="nt-icon">📍</span>{ev.location}</div>
                    </div>
                    <p className="nt-card-text">{ev.short}</p>
                    
                    <div className="nt-card-actions">
                      <button 
                        className="nt-btn" 
                        style={{ 
                          opacity: isActive ? 1 : 0.5, 
                          pointerEvents: 'none' 
                        }}
                      >
                        {isActive && activeEvent?.id === ev.id ? "Viendo Información" : "Ver Información Completa"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            <button className="nt-3d-btn nt-3d-next" onClick={handleNext3D}>›</button>
          </div>
        </section>

        {/* --- DETALLES --- */}
        <div className="nt-detail-wrapper">
          {activeEvent && (
            <EventDetail event={activeEvent} onClose={closeDetails} initialSlide={initialSlide} />
          )}
        </div>

        <section className="news-section">
          <div className="news-header">
            <span className="news-pill">Últimas Noticias</span>
            <h2 className="news-title">MANTENTE <span>INFORMADO</span></h2>
            <p className="news-subtitle">Todas las novedades sobre nuestros eventos, ganadores y actividades culturales.</p>
          </div>

          <div className="news-grid">
            {newsData.map((news) => (
              <article className="news-item" key={news.id}>
                <div className="news-image-wrapper">
                  <span className="news-badge">Destacado</span>
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="news-content-wrapper">
                  <div className="news-meta">
                    <span>📅 {news.date}</span>
                    <span style={{color: 'rgba(255,255,255,0.3)'}}>|</span>
                    <span className="news-category">{news.category}</span>
                  </div>
                  <h3 className="news-item-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>
                  
                  <a href="https://www.instagram.com/cosquinjoven.producciones/" target="_blank" rel="noreferrer" className="news-link">
                    Leer más 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}