import React from "react";
import "./inicio.css";

export default function Inicio() {
  return (
    <>
      {/* El video y el overlay van "sueltos" para fijarse al fondo */}
      <video 
        className="video-fondo" 
        src="/video.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline 
      />
      <div className="overlay" />

      {/* Contenido de la página de inicio */}
      <main className="inicio-hero" role="main" aria-labelledby="inicio-titulo">
        <img
          src="/logo.png"
          alt="COSQUIN JOVEN"
          className="inicio-logo"
          loading="eager"
        />

        <p id="inicio-titulo" className="inicio-subtext">
          Somos una organización dedicada a promover y preservar la cultura folklórica argentina,
          creando eventos que unen tradición e innovación.
        </p>
      </main>
    </>
  );
}