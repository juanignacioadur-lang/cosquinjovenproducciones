import React from 'react';
import { Link } from 'react-router-dom';
import './ResumenHome.css';

const ResumenHome = () => {
  return (
    <section className="resumen-home-section" id="resumen-explorar">
      {/* 1. EL DEGRADADO DE ENTRADA: Funde el video del Home con este fondo negro */}
      <div className="resumen-top-gradient"></div>

      <div className="pillars-container">
        
        {/* PILAR 1: NOSOTROS */}
        <article className="pillar-item">
          <div className="pillar-inner">
            <span className="p-signature">Nosotros</span>
            <h2 className="p-title">HISTORIA</h2>
            <div className="p-divider"></div>
            <p className="p-description">
              30 años recorriendo los escenarios más importantes del país. 
              Nuestra historia nació del amor por el folklore y el deseo de crear 
              espacios federales para el arte nacional. Conocé el Alma de nuestra tierra.
            </p>
            <Link to="/informacion" className="p-btn">DESCUBRIR</Link>
          </div>
        </article>

        {/* PILAR 2: EVENTOS */}
        <article className="pillar-item">
          <div className="pillar-inner">
            <span className="p-signature">Certámenes</span>
            <h2 className="p-title">DANZABUELOS</h2>
            <div className="p-divider"></div>
            <p className="p-description">
              Lanzamiento oficial 2026: Un nuevo escenario dedicado a honrar 
              la sabiduría y el baile de nuestros adultos mayores en una gala única 
              bajo el cielo de Cosquín. Descubrí la cartelera completa.
            </p>
            <Link to="/noticias" className="p-btn">VER GRILLA</Link>
          </div>
        </article>

        {/* PILAR 3: GRAN BONO (HIGHLIGHT) */}
        <article className="pillar-item highlight">
          <div className="pillar-inner">
            <span className="p-signature">Sorteo Federal</span>
            <h2 className="p-title">GRAN BONO</h2>
            <div className="p-divider"></div>
            <p className="p-description">
              Participá por más de <strong>$5.000.000 de pesos</strong> en premios. 
              Tu apoyo nos permite seguir impulsando la cultura argentina y los 
              sueños de miles de delegaciones en todo el país.
            </p>
            <a 
              href="https://wa.me/5493541393487?text=Hola!%20Quisiera%20saber%20cómo%20adquirir%20el%20bono%20para%20el%20Gran%20Bono" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-btn btn-red"
            >
              ADQUIRIR
            </a>
          </div>
        </article>

        {/* PILAR 4: CONTACTO */}
        <article className="pillar-item">
          <div className="pillar-inner">
            <span className="p-signature">Unite</span>
            <h2 className="p-title">CONTACTO</h2>
            <div className="p-divider"></div>
            <p className="p-description">
              ¿Querés traer tu delegación? Brindamos asesoramiento integral en 
              logística, inscripciones y estadía para que tu paso por Cosquín Joven 
              sea inolvidable. El camino de los sueños comienza acá.
            </p>
            <Link to="/contacto" className="p-btn">ESCRIBINOS</Link>
          </div>
        </article>

      </div>
    </section>
  );
};

export default ResumenHome;