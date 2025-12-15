import React, { useEffect, useRef, useState } from "react";

export default function StickyScroll({ children, offsetTop = 100 }) {
  const wrapperRef = useRef(null);
  const [style, setStyle] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setStyle({}); // Limpiar estilos en móvil
      return;
    }

    const handleScroll = () => {
      if (!wrapperRef.current) return;

      // El contenedor padre (la grilla) nos da los límites
      const parent = wrapperRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      
      // Altura del contenido lateral
      const contentHeight = wrapperRef.current.offsetHeight;
      const parentHeight = parent.offsetHeight;

      // Si el contenido es más alto que el padre (no debería pasar), no hacemos nada
      if (contentHeight >= parentHeight) {
        setStyle({});
        return;
      }

      // Matemáticas de posición
      const scrollY = window.scrollY;
      const parentTop = parent.offsetTop; // Posición absoluta del padre
      const parentBottom = parentTop + parentHeight;
      
      // Puntos de quiebre
      const startStick = parentTop - offsetTop;
      const stopStick = parentBottom - contentHeight - offsetTop;

      if (scrollY > startStick && scrollY < stopStick) {
        // MODO: FIJO (Bajando con la pantalla)
        setStyle({
          position: "fixed",
          top: `${offsetTop}px`,
          width: wrapperRef.current.offsetWidth + "px", // Mantener ancho exacto
          zIndex: 10
        });
      } else if (scrollY >= stopStick) {
        // MODO: FONDO (Se acabó el cuadro, quedarse abajo)
        setStyle({
          position: "absolute",
          top: "auto",
          bottom: "0",
          width: "100%", // Ocupar su columna
          zIndex: 10
        });
      } else {
        // MODO: NORMAL (Arriba de todo)
        setStyle({
          position: "relative",
          top: "auto",
          bottom: "auto",
          width: "100%",
          zIndex: 10
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Ejecutar una vez para acomodar
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, offsetTop]);

  // Renderizado
  return (
    <div 
      ref={wrapperRef} 
      style={style}
      className="sticky-scroll-wrapper"
    >
      {children}
    </div>
  );
}