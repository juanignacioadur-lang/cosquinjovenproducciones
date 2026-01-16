import React from "react";
import "./PortalSubNav.css";
import { useSearchParams } from "react-router-dom";

export default function PortalSubNav({ user, logout }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "monitoreo";

  const portalLinks = [
    { id: "monitoreo", label: "MONITOREO", roles: ["DUEÑO"] },
    { id: "bonos", label: "BONOS", roles: ["DUEÑO", "DELEGADO"] },
    { id: "ia", label: "CJ-PILOT (IA)", roles: ["DUEÑO", "DELEGADO"] },
    { id: "perfil", label: "MIS DATOS", roles: ["DUEÑO", "DELEGADO"] },
  ];

  return (
    <div className="subnav-extension anim-fade-in">
      <div className="subnav-container-fixed">
        <div className="subnav-content">
          <div className="subnav-links-group">
            {portalLinks
              .filter((link) => link.roles.includes(user?.rol))
              .map((link) => (
                <button
                  key={link.id}
                  className={`subnav-link-btn ${currentTab === link.id ? "active" : ""}`}
                  onClick={() => setSearchParams({ tab: link.id })}
                >
                  {link.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}