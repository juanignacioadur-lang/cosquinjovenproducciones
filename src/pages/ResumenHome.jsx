import React from 'react';
import { Link } from 'react-router-dom';
import './ResumenHome.css';

const ResumenHome = () => {
  return (
    <section className="resumen-home-section" id="resumen-explorar">

      {/* 1. EL DEGRADADO DE ENTRADA: Funde el video del Home con este fondo negro */}
      <div className="resumen-top-gradient"></div>
      <div className="resumen-top-gradient"></div>
      <header className="pillars-main-header anim-reveal">
        <h2 className="pillars-brandname">Cosquín Joven</h2>
        <p className="pillars-pretext">VIVE LA EXPERIENCIA</p>
        <div className="pillars-info-cloud anim-reveal" style={{ animationDelay: '0.8s' }}>
           {/* El piquito ahora arriba */}
          <div className="cloud-pointer-top"></div> 
            <p>AQUÍ ABAJO ENCONTRARÁS TODA NUESTRA INFORMACIÓN BIEN DETALLADA.</p>
          </div>
      </header>
      <div className="pillars-container">
        
        {/* PILAR 1: NOSOTROS */}
        <article className="pillar-item pillar-historia">
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

        {/* PILAR 2: EVENTOS (CON COLLAGE 2x2) */}
<article className="pillar-item pillar-danza">
  
  /* 1. AGREGAMOS EL CONTENEDOR DEL COLLAGE */
  <div className="pillar-collage-bg">
    <div className="collage-img" style={{ backgroundImage: "url('/COSQUIN JOVEN AL TEATRO.jpg')" }}></div>
    <div className="collage-img" style={{ backgroundImage: "url('/COSQUIN JOVEN CARTAGENA.jpg')" }}></div>
    <div className="collage-img" style={{ backgroundImage: "url('/EL ARGENTINO.jpg')" }}></div>
    <div className="collage-img" style={{ backgroundImage: "url('/DANZA ABUELOS.jpg')" }}></div>
  </div>

  <div className="pillar-inner">
    <span className="p-signature">Descubrir</span>
    <h2 className="p-title">EVENTOS</h2>
    <div className="p-divider"></div>
    <p className="p-description">
      Explorá nuestra cartelera 2026. Desde galas en teatros icónicos hasta certámenes internacionales. 
      Un despliegue artístico único diseñado para cada etapa del bailarín.
    </p>
    <Link to="/noticias" className="p-btn">VER GRILLA</Link>
  </div>
</article>

        {/* PILAR 3: GRAN BONO (HIGHLIGHT) */}
        <article className="pillar-item pillar-bono highlight">
          <div className="pillar-inner">
            <span className="p-signature">Sorteo</span>
            <h2 className="p-title">GRAN BONO</h2>
            <div className="p-divider"></div>
            <p className="p-description">
              Participá por más de <strong>$5.000.000</strong> en premios. 
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
        <article className="pillar-item pillar-contacto">
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