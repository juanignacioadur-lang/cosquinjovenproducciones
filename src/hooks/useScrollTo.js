import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollToId = useCallback((elementId, offset = 100) => {
    let attempts = 0;
    const maxAttempts = 20; // Intentará por 2 segundos (20 * 100ms)

    const findAndScroll = () => {
      const element = document.getElementById(elementId);
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        return true; // Encontrado y scrolleado
      }
      return false; // No encontrado aún
    };

    // Intento 1 (Inmediato)
    if (findAndScroll()) return;

    // Intentos posteriores (Polling)
    const interval = setInterval(() => {
      attempts++;
      if (findAndScroll() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);
  }, []);

  return scrollToId;
};