/**
 * Busca un elemento por su ID y hace scroll SUAVE hacia él.
 * (Usado para abrir eventos y bajar a la info)
 */
export const scrollToElement = (elementId) => {
  let attempts = 0;
  const maxAttempts = 15;

  const executeScroll = () => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      return true;
    }
    return false;
  };

  if (executeScroll()) return;

  const interval = setInterval(() => {
    attempts++;
    if (executeScroll() || attempts >= maxAttempts) {
      clearInterval(interval);
    }
  }, 100);
};

/**
 * Scroll SUAVE al inicio.
 * (Usado para volver arriba al cerrar eventos)
 */
export const scrollToTop = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * SALTO INSTANTÁNEO al inicio (Sin animación).
 * (Usado para abrir Noticias "Leer Más")
 */
export const jumpToTop = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  // 'instant' fuerza al navegador a no animar, incluso si hay CSS global
  window.scrollTo({ top: 0, behavior: 'instant' });
};