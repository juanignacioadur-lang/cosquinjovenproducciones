import React, { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newsData } from "../data/data"; 
import { jumpToTop } from "../utils/scrollUtils"; 
import "./NewsDetailPage.css"; 

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find((n) => n.id.toString() === id);

  // Al entrar, ir arriba
  useLayoutEffect(() => {
    jumpToTop();
  }, [id]);

  // Al volver, enviamos estado para que EventsPage haga scroll a la sección noticias
  const handleGoBack = () => {
    navigate("/noticias", { state: { targetId: "news-section-anchor" } });
  };

  if (!news) return <div style={{color:'white', padding:100, textAlign:'center'}}>Noticia no encontrada</div>;

  return (
    <div className="news-page-root">
      
      {/* WRAPPER NUEVO: Este es el que tendrá el subfondo gris en PC */}
      <div className="news-container-wrapper">
        
        <div className="news-reader-container">
          
          <div className="news-reader-header">
            <button onClick={handleGoBack} className="news-back-btn">
              ← Volver
            </button>
            <div className="news-reader-meta">
              <span>{news.date}</span> | <span className="news-cat-highlight">{news.category}</span>
            </div>
          </div>

          <div className="news-reader-content">
            <h1 className="news-reader-title">{news.title}</h1>
            
            {news.detailImages && news.detailImages.length > 0 && (
              <div className={`news-gallery ${news.detailImages.length > 1 ? 'gallery-grid' : 'gallery-single'}`}>
                {news.detailImages.map((img, i) => (
                  <div key={i} className="news-img-box">
                    <img src={img} alt={`Noticia ${i}`} />
                  </div>
                ))}
              </div>
            )}

            <div className="news-body-text">
              {news.fullContent.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {news.whatsappLink && (
              <div className="news-action-wrapper">
                <a href={news.whatsappLink} target="_blank" rel="noreferrer" className="news-wa-btn">
                  Quiero Inscribirme / Más Info
                </a>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}