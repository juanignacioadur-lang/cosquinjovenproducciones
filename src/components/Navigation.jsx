import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <img src="/logo.png" alt="Logo" className="logo-img" />

        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link home ${isActive ? "active" : ""}`.trim()
              }
            >
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/informacion"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Sobre Nosotros
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/noticias"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Noticias y Eventos
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Contacto y Prensa
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}