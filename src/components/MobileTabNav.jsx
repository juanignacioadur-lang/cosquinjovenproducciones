import React, { useRef } from "react";

export default function MobileTabNav({ items, activeIndex, onSelect, getLabel }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 150; // Cantidad a desplazar
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="mobile-nav-wrapper">
      {/* Flecha Izquierda */}
      <button className="nav-arrow-btn left" onClick={() => scroll("left")}>
        ‹
      </button>

      {/* Contenedor con Scroll */}
      <div className="mobile-tabs-container" ref={scrollRef}>
        {items.map((item, i) => (
          <button
            key={item.id || i}
            className={`mobile-tab-btn ${i === activeIndex ? "active" : ""}`}
            onClick={() => onSelect(i)}
          >
            {getLabel(item)}
          </button>
        ))}
      </div>

      {/* Flecha Derecha */}
      <button className="nav-arrow-btn right" onClick={() => scroll("right")}>
        ›
      </button>
    </div>
  );
}