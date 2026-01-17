import React from "react";
import { useSearchParams } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext";
import "./PortalLayout.css";

// Subpáginas
import Monitoreo from "./subpages/Monitoreo";
import ChatIA from "./subpages/ChatIA";
import MasterBonos from "./subpages/MasterBonos";
import MisDatos from "./subpages/MisDatos";
import GestionUsuarios from "./subpages/GestionUsuarios"; // <--- NUEVA IMPORTACIÓN

export default function PortalLayout() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Obtenemos la pestaña actual de la URL, por defecto es monitoreo si es Dueño
  // o bonos si es Delegado (ajuste inteligente de inicio)
  const defaultTab = user?.rol === "DUEÑO" ? "monitoreo" : "bonos";
  const activeTab = searchParams.get("tab") || defaultTab;

  return (
    <div className="portal-layout">
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