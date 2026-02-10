/**
 * Busca un elemento por su ID y hace scroll SUAVE hacia él.
 * (Optimizado para trabajar con el Global Scaler)
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
 */
export const scrollToTop = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * SALTO INSTANTÁNEO AL INICIO (FIX DOBLE BARRA)
 * Esta versión fuerza al navegador a resetear los ejes de scroll 
 * para evitar la barra fantasma que aparece por el Zoom del GlobalScaler.
 */
export const jumpToTop = () => {
  // 1. Bloqueamos la restauración automática del navegador
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  // 2. TÉCNICA NUCLEAR: Forzamos overflow hidden en HTML y Body por un instante
  // Esto mata cualquier barra de scroll secundaria inmediatamente.
  const html = document.documentElement;
  const body = document.body;
  
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';

  // 3. Reseteamos todos los punteros de scroll posibles
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  html.scrollTop = 0;
  body.scrollTop = 0;

  // 4. Devolvemos el control al navegador en el siguiente cuadro de animación
  // Esto permite que la página se dibuje limpia sin la barra doble.
  requestAnimationFrame(() => {
    setTimeout(() => {
      html.style.overflow = '';
      body.style.overflow = '';
    }, 10); // 10ms es suficiente para engañar al motor de renderizado
  });
};