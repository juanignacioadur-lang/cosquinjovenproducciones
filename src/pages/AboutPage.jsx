import React, { useEffect, useRef, useState, useMemo } from "react";
import "./AboutPage.css";

/* --- Tarjeta de Valor --- */
function Card({ icon, title, text }) {
  return (
    <article className="cj-card">
      <div className="cj-card-icon">{icon}</div>
      <h4 className="cj-card-title">{title}</h4>
      <p className="cj-card-text">{text}</p>
    </article>
  );
}

/* --- Galería FOTOS (Desktop) --- */
function Gallery({ images = [], autoPlay = true, autoPlayMs = 5000 }) {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const intervalRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!autoPlay || len <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % len);
    }, autoPlayMs);
    return () => clearInterval(intervalRef.current);
  }, [len, autoPlay, autoPlayMs, index]);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const thumb = container.children[index];
      if (thumb) {
        const thumbLeft = thumb.offsetLeft;
        const thumbWidth = thumb.offsetWidth;
        const containerWidth = container.offsetWidth;
        const newScrollPos = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
        container.scrollTo({ left: newScrollPos, behavior: 'smooth' });
      }
    }
  }, [index]);

  const handlePrev = () => { if (intervalRef.current) clearInterval(intervalRef.current); setIndex((prev) => (prev - 1 + len) % len); };
  const handleNext = () => { if (intervalRef.current) clearInterval(intervalRef.current); setIndex((prev) => (prev + 1) % len); };
  const goTo = (i) => { if (intervalRef.current) clearInterval(intervalRef.current); setIndex(i); };

  if (len === 0) return null;

  return (
    <div className="cj-gallery-container">
      <div className="cj-gallery-display">
        {len > 1 && <button className="cj-gallery-btn cj-prev" onClick={handlePrev}>‹</button>}
        <img key={index} src={images[index]} alt={`Galería ${index + 1}`} className="cj-gallery-img" loading="lazy" onError={(e) => { if (!e.target.src.includes('.JPG')) { e.target.src = e.target.src.replace('.jpg', '.JPG'); } else { e.target.style.display = 'none'; } }} />
        {len > 1 && <button className="cj-gallery-btn cj-next" onClick={handleNext}>›</button>}
      </div>
      {len > 1 && (
        <div className="cj-thumbs-wrapper">
          <div className="cj-thumbs-track" ref={scrollRef}>
            {images.map((img, i) => (
              <div key={i} className={`cj-thumb ${i === index ? "active" : ""}`} onClick={() => goTo(i)}>
                <img src={img} alt={`Thumb ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Galería VIDEOS (Desktop) --- */
function VideoGallery({ videos = [] }) {
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const len = videos.length;
  const scrollRef = useRef(null);

  useEffect(() => {
    setError(false);
    if (scrollRef.current) {
      const container = scrollRef.current;
      const thumb = container.children[index];
      if (thumb) {
        const thumbLeft = thumb.offsetLeft;
        const thumbWidth = thumb.offsetWidth;
        const containerWidth = container.offsetWidth;
        const newScrollPos = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
        container.scrollTo({ left: newScrollPos, behavior: 'smooth' });
      }
    }
  }, [index]);

  const handlePrev = () => setIndex((prev) => (prev - 1 + len) % len);
  const handleNext = () => setIndex((prev) => (prev + 1) % len);
  const goTo = (i) => setIndex(i);

  if (len === 0) return null;

  return (
    <div className="cj-gallery-container">
      <div className="cj-gallery-display" style={{ background: '#000' }}>
        {len > 1 && <button className="cj-gallery-btn cj-prev" onClick={handlePrev}>‹</button>}
        
        {error ? (
          <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
            <p>⚠️ No se pudo reproducir este video.</p>
            <small style={{ color: '#aaa' }}>Posible formato no compatible (Use H.264)</small>
          </div>
        ) : (
          <video 
            key={index}
            src={videos[index]} 
            className="cj-gallery-img" 
            controls 
            autoPlay 
            playsInline
            disablePictureInPicture 
            controlsList="nodownload noplaybackrate"
            preload="auto"
            style={{ background: "#000" }}
            onError={() => setError(true)}
          >
            Tu navegador no soporta videos.
          </video>
        )}
        
        {len > 1 && <button className="cj-gallery-btn cj-next" onClick={handleNext}>›</button>}
      </div>

      <div className="cj-thumbs-wrapper">
        <div className="cj-thumbs-track" ref={scrollRef}>
          {videos.map((vid, i) => (
            <div key={i} className={`cj-thumb ${i === index ? "active" : ""}`} onClick={() => goTo(i)}>
              <video 
                src={`${vid}#t=0.1`} 
                muted 
                playsInline 
                preload="metadata"
                disablePictureInPicture
                controls={false}
                className="cj-video-thumb"
              />
              <div className="cj-play-icon">▶</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Galería FOTOS (Móvil) --- */
function MobileGallery({ images = [] }) {
  return (
    <div className="mobile-gallery-track">
      {images.map((img, i) => (
        <div key={i} className="mobile-gallery-item">
          <img src={img} alt={`Galería Móvil ${i}`} loading="lazy" onError={(e) => { if (!e.target.src.includes('.JPG')) { e.target.src = e.target.src.replace('.jpg', '.JPG'); } else { e.target.style.display = 'none'; } }} />
        </div>
      ))}
    </div>
  );
}

/* --- Galería VIDEOS (Móvil - SUPER OPTIMIZADA) --- */
function MobileVideoGallery({ videos = [] }) {
  return (
    <div className="mobile-gallery-track">
      {videos.map((vid, i) => (
        <div key={i} className="mobile-gallery-item">
          <video 
            src={vid} 
            controls 
            playsInline 
            /* CAMBIO CLAVE: preload none impide que cargue nada hasta que toques play */
            preload="none" 
            /* Poster vacío transparente para evitar el botón de play gigante nativo feo antes de cargar */
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            disablePictureInPicture
            controlsList="nodownload"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              background: '#000' 
            }} 
          />
          {/* 
             Nota: Al usar preload="none", el video se verá negro hasta darle play.
             Si quisieras que se vea una imagen, necesitarías un archivo .jpg de portada.
             Pero esto soluciona 100% el problema de reproducción fantasma.
          */}
        </div>
      ))}
    </div>
  );
}

export default function Informacion() {
  const [activeTab, setActiveTab] = useState('photos');

  const galleryImages = useMemo(() => Array.from({ length: 44 }, (_, i) => `/sobre nosotros/${i + 1}.jpg`), []);
  const galleryVideos = useMemo(() => Array.from({ length: 8 }, (_, i) => `/videos/${i + 1}.mp4`), []);
  
  const cards = [
    { icon: "❤️", title: "ADN FAMILIAR", text: "Todo lo que hacemos nace desde lo familiar: nuestra manera de trabajar, de recibir a cada delegación y de construir encuentros donde la cultura se sienta como un hogar." },
    { icon: "🤝", title: "ENCUENTRO Y UNIÓN", text: "Nuestros eventos no nacieron para la competencia pura, sino para compartir, conectarse, crecer y emocionarse junto a colegas de todo el país." },
    { icon: "🏆", title: "COMPETENCIA SANA", text: "Creemos en reconocer el esfuerzo, la dedicación y el talento sin perder la humildad, el compañerismo ni el espíritu de comunidad que nos caracteriza." },
    { icon: "🌎", title: "EXPERIENCIAS GLOBALES", text: "Impulsamos viajes y propuestas internacionales, como Cosquín Joven Cartagena, convirtiendo cada encuentro en una aventura humana y profesional." },
  ];

  return (
    <section className="cj-section">
      <div className="cj-container">
        
        <div className="cj-bio-section">
          <div className="cj-bio-content">
            <h1 className="cj-main-title">NUESTRA <span>HISTORIA</span></h1>
            <h3 className="cj-subtitle">30 años acompañando artistas, bailarines y cantantes.</h3>
            <div className="cj-text-block">
              <p className="cj-text">Tres décadas de escenarios, viajes, festivales, aplausos, aprendizajes y momentos que nos marcaron para siempre. <strong className="cj-highlight">Nuestra historia nació del amor por el folklore</strong> y del deseo profundo de crear espacios donde la cultura argentina pueda vivirse con el corazón.</p>
              <p className="cj-text">Desde nuestros primeros pasos sentimos que el folklore no es solo música o danza: es un latido que viene de nuestros abuelos, de nuestras raíces y de esas historias que se transmiten de generación en generación. Así nació <strong className="cj-highlight">Cosquín Joven Producciones</strong>: como un proyecto familiar impulsado por el amor a la cultura, la unión y el deseo de crear espacios donde nuestro folklore se viva con intensidad, respeto y emoción.</p>
              <p className="cj-text">Desde el inicio tuvimos una misión clara: que cada niño, joven y adulto encuentre un escenario que lo abrace, un público que lo acompañe y una experiencia que lo marque. Nuestro proyecto acompaña a artistas de todas las edades: desde semillitas que dan sus primeros pasos hasta mayores que llevan toda una vida honrando la danza.</p>
              <p className="cj-text">Porque para nosotros, el arte es identidad, es encuentro y es un puente entre personas, generaciones y culturas. Lo que comenzó como un sueño familiar hoy es una plataforma que abraza a miles de artistas, profesores, delegados y apasionados del folklore. Y cada persona que se suma se vuelve parte de esta familia cultural que seguimos construyendo juntos.</p>
            </div>
          </div>
          <div className="cj-bio-image-wrapper">
            <img src="/Informacion.jpg" alt="Cosquín Joven Historia" loading="eager" />
          </div>
        </div>

        <div className="cj-divider" />

        <div className="cj-values-section">
          <div className="cj-section-header">
            <h2 className="cj-section-title">NUESTROS PILARES</h2>
          </div>
          <div className="cj-cards">
            {cards.map((c, i) => (
              <Card key={i} icon={c.icon} title={c.title} text={c.text} />
            ))}
          </div>
        </div>

        <div className="cj-divider" />

        <div className="cj-projects">
          <div className="cj-projects-panel">
            <div className="cj-projects-header">
              <h3 className="cj-projects-title">
                <span className="cj-title-main">MOMENTOS</span> <span className="cj-title-accent">MEMORABLES</span>
              </h3>
              <p className="cj-projects-subtitle">
                Revive la emoción de nuestros eventos. Galas, competencias y el encuentro de miles de almas unidas por la danza.
              </p>
            </div>
            
            <div className="cj-gallery-tabs">
              <button 
                className={`cj-tab-btn ${activeTab === 'photos' ? 'active' : ''}`} 
                onClick={() => setActiveTab('photos')}
              >
                FOTOS
              </button>
              <button 
                className={`cj-tab-btn ${activeTab === 'videos' ? 'active' : ''}`} 
                onClick={() => setActiveTab('videos')}
              >
                VIDEOS
              </button>
            </div>

            <div className="cj-projects-inner">
              {activeTab === 'photos' && (
                <>
                  <div className="desktop-gallery-view">
                     <Gallery images={galleryImages} />
                  </div>
                  <div className="mobile-gallery-view">
                     <MobileGallery images={galleryImages} />
                  </div>
                </>
              )}

              {activeTab === 'videos' && (
                <>
                  <div className="desktop-gallery-view">
                     <VideoGallery videos={galleryVideos} />
                  </div>
                  <div className="mobile-gallery-view">
                     <MobileVideoGallery videos={galleryVideos} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}