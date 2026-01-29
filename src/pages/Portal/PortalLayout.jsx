import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import "./PortalLayout.css";

// Subpáginas
import Monitoreo from "./subpages/Monitoreo";
import ChatIA from "./subpages/ChatIA";
import MasterBonos from "./subpages/MasterBonos";
import MisDatos from "./subpages/MisDatos";
import GestionUsuarios from "./subpages/GestionUsuarios"; 

export default function PortalLayout() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Obtenemos la pestaña actual de la URL
  const defaultTab = user?.rol === "DUEÑO" ? "monitoreo" : "bonos";
  const activeTab = searchParams.get("tab") || defaultTab;

  // --- 1. MOTOR DE RESET DE SCROLL AL CAMBIAR DE PESTAÑA ---
  useEffect(() => {
    // Forzamos el scroll al tope de la pantalla de forma inmediata
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Usamos instant para que no haya saltos visuales feos
    });

    // Red de seguridad: reseteamos el scroll del body por si el GlobalScaler lo bloqueó
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab]); // Se activa cada vez que el usuario cambia de sección

  return (
    <div className="portal-layout">
      {/* Capa de textura de fondo opcional */}
      <div className="portal-bg-texture"></div>

      <div className="portal-viewport">
        {/* VISTAS EXCLUSIVAS DEL DUEÑO */}
        {activeTab === "monitoreo" && user?.rol === "DUEÑO" && <Monitoreo />}
        {activeTab === "usuarios" && user?.rol === "DUEÑO" && <GestionUsuarios />}

        {/* VISTAS COMPARTIDAS O DINÁMICAS */}
        {activeTab === "ia" && <ChatIA />}
        {activeTab === "bonos" && <MasterBonos />}
        {activeTab === "perfil" && <MisDatos />}
      </div>
    </div>
  );
}