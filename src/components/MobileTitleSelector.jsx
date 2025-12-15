import React from "react";

export default function MobileTitleSelector({ items, activeIndex, onSelect, getLabel }) {
  
  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    onSelect(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    onSelect(newIndex);
  };

  return (
    <div className="mobile-selector-wrapper">
      <button className="mobile-arrow-btn" onClick={handlePrev}>
        ‹
      </button>

      <div className="mobile-selector-content">
        <span key={activeIndex} className="fade-in-text">
          {getLabel(items[activeIndex])}
        </span>
      </div>

      <button className="mobile-arrow-btn" onClick={handleNext}>
        ›
      </button>
    </div>
  );
}