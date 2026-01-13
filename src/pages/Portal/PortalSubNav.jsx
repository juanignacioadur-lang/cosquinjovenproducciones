import React from "react";
import "./PortalSubNav.css";

export default function PortalSubNav({ activeTab, setActiveTab, user, logout }) {
  const menuItems = [
    { id: "monitoreo", label: "MONITOREO", roles: ["DUEÑO"] },
    { id: "bonos", label: "BONOS", roles: ["DUEÑO", "DELEGADO"] },
    { id: "ia", label: "CJ-PILOT (IA)", roles: ["DUEÑO", "DELEGADO"] },
    { id: "perfil", label: "MIS DATOS", roles: ["DUEÑO", "DELEGADO"] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.rol));

  return (
    <nav className="subnav-fixed-wrapper">
      <div className="subnav-limiter">
        <div className="subnav-hanging-dock">
          
          {/* BLOQUE DE LINKS (IZQUIERDA) */}
          <div className="subnav-links-flex">
            {filteredMenu.map((item) => (
              <button
                key={item.id}
                className={`subnav-item-btn ${activeTab === item.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
                {activeTab === item.id && <div className="active-glow-bar"></div>}
              </button>
            ))}
          </div>

          {/* BLOQUE DE USUARIO (DERECHA - SIN ESTILOS EN LÍNEA) */}
          <div className="subnav-right-info">
             <div className="user-status-pill">
                <span className="led-online"></span>
                <span className="user-name-text">{user?.nombre?.split(' ')[0]}</span>
             </div>
             <button className="subnav-btn-logout" onClick={logout}>SALIR</button>
          </div>

        </div>
      </div>
    </nav>
  );
}