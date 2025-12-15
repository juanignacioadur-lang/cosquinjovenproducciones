import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteScrollHandler() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Le decimos al navegador: "Olvida donde estaba el usuario antes"
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Forzamos el salto a (0,0) instantáneamente
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Sin animación, cambio inmediato
    });

  }, [pathname]); // Solo se ejecuta cuando cambia la URL (Ej: de / a /noticias)

  return null;
}