import { useEffect, useState, useRef } from "react";

/**
 * Hook para simular position: sticky con JavaScript puro.
 * Útil cuando los contenedores padres tienen overflow: hidden/auto que rompen CSS sticky.
 * 
 * @param {number} offsetTop - Margen superior (espacio para el menú).
 */
export function useSticky(offsetTop = 100) {
  const containerRef = useRef(null); // El contenedor padre (la grilla completa)
  const stickyRef = useRef(null);    // El elemento que queremos fijar (columna derecha)
  
  const [stickyStyle, setStickyStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const sticky = stickyRef.current.getBoundingClientRect();
      const stickyHeight = sticky.height;
      const containerHeight = container.height;
      const containerBottom = container.bottom;
      
      // 1. Si el contenedor padre es más chico que la barra, no hacemos nada (no hay espacio para scrollear)
      if (containerHeight <= stickyHeight) {
        setStickyStyle({});
        return;
      }

      // 2. Calcular límites
      const startPoint = container.top <= offsetTop; // ¿Llegó el contenedor al topo?
      const endPoint = containerBottom <= (stickyHeight + offsetTop); // ¿Se acaba el contenedor?

      if (endPoint) {
        // ZONA C: Se acabó el contenedor, anclar al fondo (absolute bottom)
        setStickyStyle({
          position: "absolute",
          bottom: 0,
          top: "auto",
          width: stickyRef.current.offsetWidth + "px" // Mantener ancho
        });
      } else if (startPoint) {
        // ZONA B: Estamos scrolleando dentro del contenedor (fixed top)
        setStickyStyle({
          position: "fixed",
          top: offsetTop + "px",
          bottom: "auto",
          width: stickyRef.current.offsetWidth + "px" // Mantener ancho
        });
      } else {
        // ZONA A: Todavía no llegamos (static/relative)
        setStickyStyle({
          position: "relative",
          top: "auto",
          bottom: "auto"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Recalcular si cambia tamaño pantalla
    
    // Ejecutar una vez al inicio
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [offsetTop]);

  return { containerRef, stickyRef, stickyStyle };
}