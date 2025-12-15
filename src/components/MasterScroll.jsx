import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MasterScroll() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Desactivar la memoria del navegador inmediatamente
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Función que resetea TODO lo que pueda tener scroll
    const resetScroll = () => {
      // A. Ventana y Documento (Estándar)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // B. Contenedor de la Aplicación (Por si React tiene el scroll)
      const root = document.getElementById("root");
      if (root) root.scrollTop = 0;

      // C. Tu contenedor principal (Por si el CSS lo aisló)
      const main = document.querySelector(".main-content");
      if (main) main.scrollTop = 0;
    };

    // 2. Ejecutar inmediatamente
    resetScroll();

    // 3. Ejecutar en el siguiente cuadro de animación (Para ganar la carrera al navegador)
    const rafId = window.requestAnimationFrame(() => {
      resetScroll();
    });

    // 4. Ejecutar un pequeño timeout por seguridad (Red de seguridad final)
    const timeoutId = setTimeout(() => {
      resetScroll();
    }, 10);

    return () => {
      window.cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Se dispara SOLO al cambiar la ruta

  return null;
}