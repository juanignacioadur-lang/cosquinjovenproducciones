import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteScrollHandler() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Forzamos el inicio arriba de todo
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetAndLock = () => {
      // A. Volvemos al tope instantáneamente
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;

      // B. BLOQUEO TOTAL: Ocultamos la barra y prohibimos el scroll
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Bloqueo táctil en móvil
    };

    resetAndLock();

    // 2.フレーム de seguridad para el renderizado
    const rafId = requestAnimationFrame(resetAndLock);

    // 3. LIBERACIÓN: Después de 1.2 segundos (ajustable), devolvemos el scroll
    const timerId = setTimeout(() => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }, 1200); // 1200ms coincide con el tiempo de tu animación prolija

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      // Por seguridad, si el componente se desmonta, liberamos el scroll
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [pathname]);

  return null;
}