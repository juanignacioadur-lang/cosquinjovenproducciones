import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="logo-img" />

        {/* Botón Hamburguesa (Visible solo en móvil) */}
        <button 
          className="hamburger-btn" 
          onClick={toggleMenu} 
          aria-label="Menú"
        >
          {isOpen ? (
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        {/* Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link home ${isActive ? "active" : ""}`.trim()} onClick={closeMenu}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/informacion" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Sobre Nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/noticias" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Noticias y Eventos
            </NavLink>
          </li>
          <li>
            <NavLink to="/bono" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Gran Bono
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
              Contacto y Prensa
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}