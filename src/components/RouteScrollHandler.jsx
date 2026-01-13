import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteScrollHandler() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Desactivar memoria de scroll del navegador
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Función de limpieza total de scroll
    const scrollToTop = () => {
      // Reseteo para navegadores estándar
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      
      // Reseteo para contenedores con zoom o overflow
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Forzar reseteo del contenedor root si es necesario
      const root = document.getElementById("root");
      if (root) root.scrollTop = 0;
    };

    // Ejecución inmediata
    scrollToTop();

    // 3. SEGUNDO RESETEO (Seguridad para el GlobalScaler)
    // El zoom tarda unos milisegundos en recalcular el tamaño de la página.
    // Este timeout de 10ms asegura que cuando la página termine de escalar, 
    // la volvamos a subir al tope real.
    const timer = setTimeout(scrollToTop, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}