import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useLocation, useSearchParams } from "react-router-dom"; 
import "./Navigation.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); 
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll(); // Chequeo inicial
  }, [isAuthenticated, location]);

  const isPortal = location.pathname.startsWith("/gestion-bono");
  const currentTab = searchParams.get("tab") || "monitoreo";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  const portalLinks = [
    { id: "monitoreo", label: "MONITOREO", roles: ["DUEÑO"] },
    { id: "usuarios", label: "USUARIOS", roles: ["DUEÑO"] },
    { id: "bonos", label: "BONOS", roles: ["DUEÑO", "DELEGADO"] },
    { id: "ia", label: "AYUDA IA", roles: ["DUEÑO", "DELEGADO"] },
    { id: "perfil", label: "MIS DATOS", roles: ["DUEÑO", "DELEGADO"] },
  ];                                

return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} role="navigation">
      <div className="nav-container">
        <img src="/logo.png" alt="Cosquin Joven" className="logo-img" />

        {/* --- NUEVO: GESTIÓN MÓVIL (AL LADO DEL LOGO) --- */}
        {isAuthenticated && isPortal && (
          <div className="mobile-portal-nav">
            {showLeftArrow && <div className="scroll-arrow left"></div>}
            
            <div className="mobile-tabs-scroll" ref={scrollRef} onScroll={checkScroll}>
              {portalLinks.filter(link => link.roles.includes(user?.rol)).map(link => (
                <button 
                  key={link.id} 
                  className={`m-tab-btn ${currentTab === link.id ? "active" : ""}`}
                  onClick={() => setSearchParams({ tab: link.id })}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {showRightArrow && <div className="scroll-arrow right"></div>}
          </div>
        )}

        <button className={`hamburger-btn ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><NavLink to="/" end className="nav-link" onClick={closeMenu}>Inicio</NavLink></li>
          <li><NavLink to="/informacion" className="nav-link" onClick={closeMenu}>Nosotros</NavLink></li>
          <li><NavLink to="/noticias" className="nav-link" onClick={closeMenu}>Eventos y Noticias</NavLink></li>
          <li><NavLink to="/bono" className="nav-link" onClick={closeMenu}>Gran Bono</NavLink></li>
          <li><NavLink to="/contacto" className="nav-link" onClick={closeMenu}>Contacto</NavLink></li>

          {/* BOTÓN MI PANEL */}
          <li className="nav-portal-item">
            <NavLink to={isAuthenticated ? "/gestion-bono" : "/portal"} className="nav-link portal-link" onClick={closeMenu}>
              {isAuthenticated ? "MI PANEL" : "ACCESO PORTAL"}
            </NavLink>
          </li>

          {/* INFO DE USUARIO Y SALIR */}
          {isAuthenticated && (
            <li className="nav-user-top-info">
              <div className="user-pill-nav">
                <span className="user-dot-status"></span>
                <span className="user-name-nav">{user?.nombre?.split(' ')[0]}</span>
                <button className="btn-logout-nav" onClick={() => { logout(); closeMenu(); }}>
                  SALIR
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* EL DOCK COLGANTE (SOLO DESKTOP) */}
      {isAuthenticated && isPortal && (
        <div className="portal-hanging-dock desktop-only anim-fade-in">
          <div className="dock-container">
            <div className="dock-links">
              {portalLinks.filter(link => link.roles.includes(user?.rol)).map(link => (
                <button 
                  key={link.id} 
                  className={`dock-btn ${currentTab === link.id ? "is-active" : ""}`}
                  onClick={() => setSearchParams({ tab: link.id })}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      </nav>
    );
  }