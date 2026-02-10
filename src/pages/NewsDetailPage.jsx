import React, { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newsData } from "../data/data"; 
import { jumpToTop } from "../utils/scrollUtils"; 
import "./NewsDetailPage.css"; 

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find((n) => n.id.toString() === id);

  useLayoutEffect(() => {
    jumpToTop();
  }, [id]);

  const handleGoBack = () => {
    navigate("/noticias", { state: { targetId: "news-section-anchor" } });
  };

  if (!news) return <div className="news-error">SISTEMA: Noticia no localizada</div>;

  return (
    <div className="news-reader-root">
      <div className="news-grid-overlay"></div>
      <div className="news-vignette"></div>
      
      {/* EL PILAR CENTRAL (CUADRO INFINITO) */}
      <div className="news-pilar-central">
        
        {/* ACCIÓN SUPERIOR */}
        <nav className="news-nav-top-actions">
          <button onClick={handleGoBack} className="btn-back-minimal">
            ← VOLVER AL ARCHIVO DE NOTICIAS
          </button>
        </nav>

        {/* CABECERA EDITORIAL */}
        <header className="article-header">
            <h1 className="article-main-title">{news.title}</h1>
            <div className="article-header-line"></div>
            
            <div className="news-meta-gala">
                <span className="m-date-tag">{news.date}</span>
                <span className="m-divider">/</span>
                <span className="m-category-badge">{news.category}</span>
            </div>
        </header>

        {/* GALERÍA (PC: 3 EN FILA / MÓVIL: ABAJO) */}
        {news.detailImages && news.detailImages.length > 0 && (
          <section className={`article-gallery ${news.detailImages.length >= 3 ? 'triple-mode' : 'single-mode'}`}>
            {news.detailImages.map((img, i) => (
              <div key={i} className="article-img-frame">
                <img src={img} alt={`Registro ${i}`} loading="lazy" />
              </div>
            ))}
          </section>
        )}

        {/* TEXTO DE LA NOTICIA (ORDENADO Y JUSTIFICADO) */}
        <section className="article-body-text">
          {news.fullContent.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {/* ACCIONES FINALES */}
        <footer className="article-footer-tech">
          {news.whatsappLink && (
            <a href={news.whatsappLink} target="_blank" rel="noreferrer" className="btn-wa-editorial">
              SOLICITAR INFORMACIÓN POR WHATSAPP
            </a> 
          )}
          <button onClick={handleGoBack} className="btn-back-minimal">
            ← VOLVER AL ARCHIVO DE NOTICIAS
          </button>
        </footer>
        
      </div>
    </div>
  );
}