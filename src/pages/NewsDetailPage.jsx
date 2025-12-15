import React, { useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { newsData } from "../data/data"; 
import "./EventsPage.css"; 

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find((n) => n.id.toString() === id);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!news) {
    return <div style={{padding: 100, textAlign: 'center', color:'white'}}>Noticia no encontrada</div>;
  }

  return (
    <div className="nt-page">
      {/* QUITAMOS los estilos inline que rompían el fondo. 
          Ahora nt-container usará el flex:1 y el background del CSS. */}
      <div className="nt-container">
        
        <div className="news-full-reader">
          <div className="news-reader-header">
            <button onClick={() => navigate("/noticias")} className="news-back-btn">
              ← Volver a Noticias
            </button>
            <div className="news-reader-meta">
              <span>{news.date}</span> | <span className="news-cat-highlight">{news.category}</span>
            </div>
          </div>

          <div className="news-reader-content">
            <h1 className="news-reader-title">{news.title}</h1>
            
            {news.detailImages && news.detailImages.length > 0 && (
              <div className={`news-gallery-container ${news.detailImages.length > 1 ? 'grid-mode' : 'single-mode'}`}>
                {news.detailImages.map((img, i) => (
                  <div key={i} className="news-img-frame">
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