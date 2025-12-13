import React from "react";
import "./HomePage.css";

export default function Inicio() {
  return (
    <>
      {/* VIDEO DE FONDO */}
      {/* Cambiamos la ruta al nuevo nombre 'background.mp4' */}
      <video 
        className="video-fondo" 
        src="/background.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline 
        // Agregamos poster para que se vea una imagen mientras carga el video pesado
        poster="/logo.png" 
      />
      
      <div className="overlay" />

      {/* CONTENIDO PRINCIPAL */}
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