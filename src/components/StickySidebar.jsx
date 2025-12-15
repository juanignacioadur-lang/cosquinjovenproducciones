import React, { useEffect, useRef, useState } from 'react';

const StickySidebar = ({ children, offsetTop = 100 }) => {
  const sidebarRef = useRef(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      // Buscamos el contenedor padre (la grilla .nt-detail-grid)
      const parent = sidebarRef.current.parentElement; 
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      
      // Alturas
      const sidebarHeight = sidebarRef.current.offsetHeight;
      const parentHeight = parent.offsetHeight;

      // Si la barra es más alta que el contenido, no hacemos nada
      if (sidebarHeight >= parentHeight) {
        setStyle({});
        return;
      }

      // Lógica de posición
      const scrollY = window.scrollY;
      const parentTopAbsolute = parentRect.top + scrollY;
      const parentBottomAbsolute = parentTopAbsolute + parentHeight;
      const limit = parentBottomAbsolute - sidebarHeight - offsetTop;

      if (scrollY < parentTopAbsolute - offsetTop) {
        // ZONA 1: Arriba (Normal)
        setStyle({ position: 'relative', width: '100%' });
      } else if (scrollY >= parentTopAbsolute - offsetTop && scrollY < limit) {
        // ZONA 2: Flotando (Fixed)
        setStyle({ 
          position: 'fixed', 
          top: `${offsetTop}px`, 
          width: parent.getBoundingClientRect().width > 900 ? '380px' : '100%' // Mismo ancho que definimos en CSS grid
        });
      } else {
        // ZONA 3: Abajo (Tope final)
        setStyle({ 
          position: 'absolute', 
          bottom: '0', 
          top: 'auto',
          width: '100%' 
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Ejecutar al inicio

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [offsetTop, children]);

  // En móvil desactivamos el efecto devolviendo el div normal
  if (window.innerWidth <= 900) {
    return <div className="sticky-sidebar-mobile">{children}</div>;
  }

  return (
    <div ref={sidebarRef} style={{ ...style, zIndex: 10 }}>
      {children}
    </div>
  );
};

export default StickySidebar;