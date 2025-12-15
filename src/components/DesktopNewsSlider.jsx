import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DesktopNewsSlider({ newsData }) {
  const [newsIndex, setNewsIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNextNews = () => {
    if (newsIndex < newsData.length - itemsPerPage) setNewsIndex((prev) => prev + 1);
  };

  const handlePrevNews = () => {
    if (newsIndex > 0) setNewsIndex((prev) => prev - 1);
  };

  return (
    <div className="desktop-news-view news-slider-container">
      <button
        className="nt-3d-btn news-nav-btn prev"
        onClick={handlePrevNews}
        disabled={newsIndex === 0}
        style={{ opacity: newsIndex === 0 ? 0.3 : 1 }}
      >
        ‹
      </button>

      <div className="news-track-window">
        <div
          className="news-track"
          style={{ transform: `translateX(-${newsIndex * (100 / itemsPerPage)}%)` }}
        >
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
                  <Link to={`/noticias/${news.id}`} className="news-link">
                    LEER MÁS
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <button
        className="nt-3d-btn news-nav-btn next"
        onClick={handleNextNews}
        disabled={newsIndex >= newsData.length - itemsPerPage}
        style={{ opacity: newsIndex >= newsData.length - itemsPerPage ? 0.3 : 1 }}
      >
        ›
      </button>
    </div>
  );
}