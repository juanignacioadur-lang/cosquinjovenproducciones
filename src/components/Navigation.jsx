import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom"; 
import "./Navigation.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth(); 
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isPortal = location.pathname.startsWith("/gestion-bono");
  const currentTab = searchParams.get("tab") || "monitoreo"; // Leemos la pestaña de la URL

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const portalLinks = [
    { id: "monitoreo", label: "MONITOREO", roles: ["DUEÑO"] },
    { id: "bonos", label: "BONOS", roles: ["DUEÑO", "DELEGADO"] },
    { id: "ia", label: "CJ-PILOT (IA)", roles: ["DUEÑO", "DELEGADO"] },
    { id: "perfil", label: "MIS DATOS", roles: ["DUEÑO", "DELEGADO"] },
    
  ];                                

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} role="navigation">
      <div className="nav-container">
        <img src="/logo.png" alt="Cosquin Joven" className="logo-img" />

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

          <li className="nav-portal-item">
            <NavLink to={isAuthenticated ? "/gestion-bono" : "/portal"} className="nav-link portal-link" onClick={closeMenu}>
              {isAuthenticated ? "MI PANEL" : "ACCESO PORTAL"}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* EL DOCK COLGANTE CONECTADO A LA URL */}
      {isAuthenticated && isPortal && (
        <div className="portal-hanging-dock anim-fade-in">
          <div className="dock-container">
            <div className="dock-links">
              {portalLinks.filter(link => link.roles.includes(user?.rol)).map(link => (
                <button 
                  key={link.id} 
                  className={`dock-btn ${currentTab === link.id ? "is-active" : ""}`}
                  onClick={() => setSearchParams({ tab: link.id })} // CAMBIA LA URL
                >
                  {link.label}
                  
                </button>
              ))}
            </div>
            
            <div className="dock-user">
              <span className="dock-dot"></span>
              <span className="dock-name">{user?.nombre?.split(' ')[0]}</span>
              <button className="dock-logout" onClick={logout}>SALIR</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}