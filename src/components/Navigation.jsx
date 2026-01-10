import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Efecto de scroll para la navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} role="navigation">
      <div className="nav-container">
        
        <img src="/logo.png" alt="Cosquin Joven" className="logo-img" />

        {/* Botón Hamburguesa Animado */}
        <button 
          className={`hamburger-btn ${isOpen ? "open" : ""}`} 
          onClick={toggleMenu} 
          aria-label="Menú"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Links de Navegación */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/informacion" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/noticias" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Eventos y Noticias
            </NavLink>
          </li>
          <li>
            <NavLink to="/bono" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Gran Bono
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={closeMenu}>
              Contacto
            </NavLink>
          </li>

          {/* Footer del menú móvil (Solo visible en mobile) */}
          <div className="mobile-menu-footer">
              <span style={{color: '#d00000', fontSize: '0.8rem', letterSpacing: '3px'}}>CJ PRODUCCIONES 2026</span>
          </div>
        </ul>
      </div>
    </nav>
  );
}