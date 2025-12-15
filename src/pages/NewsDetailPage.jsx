import React, { useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { newsData } from "../data/data"; 
import "./NewsDetailPage.css"; // <--- NUEVO CSS EXCLUSIVO

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find((n) => n.id.toString() === id);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!news) return <div style={{color:'white', padding:100, textAlign:'center'}}>Noticia no encontrada</div>;

  return (
    <div className="news-page-root">
      <div className="news-reader-container">
        
        <div className="news-reader-header">
          <button onClick={() => navigate("/noticias")} className="news-back-btn">
            ← Volver
          </button>
          <span style={{color:'#d00000', fontWeight:'bold', textTransform:'uppercase'}}>{news.category}</span>
        </div>

        <div className="news-reader-content">
          <h1 className="news-reader-title">{news.title}</h1>

          {/* Galería */}
          {news.detailImages && news.detailImages.length > 0 && (
            <div className={`news-gallery ${news.detailImages.length > 1 ? 'gallery-grid' : 'gallery-single'}`}>
              {news.detailImages.map((img, i) => (
                <div key={i} className="news-img-box">
                  <img src={img} alt={`img-${i}`} />
                </div>
              ))}
            </div>
          )}

          <div className="news-text">
            {news.fullContent.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {news.whatsappLink && (
            <div className="news-footer">
              <a href={news.whatsappLink} target="_blank" rel="noreferrer" className="news-cta-btn">
                Más Información
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}