import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteScrollHandler() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lockAndReset = () => {
      // 1. Subir a la fuerza en todos los niveles
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 2. BLOQUEO VISUAL Y FÍSICO
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      
      // Bloqueamos también el contenedor de React por seguridad
      const root = document.getElementById("root");
      if (root) root.style.overflow = "hidden";
    };

    lockAndReset();

    // Ejecutamos un segundo reseteo en el próximo frame para el Bono
    const rafId = requestAnimationFrame(lockAndReset);

    // 3. LIBERACIÓN CONTROLADA (1.5 segundos para dar tiempo al Bono)
    const timerId = setTimeout(() => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      
      const root = document.getElementById("root");
      if (root) root.style.overflow = "visible";
    }, 1500); 

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [pathname]);

  return null;
}