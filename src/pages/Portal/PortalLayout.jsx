import React from "react";
import { useSearchParams } from "react-router-dom"; // Importamos esto
import { useAuth } from "../../context/AuthContext";
import "./PortalLayout.css";

// Subpáginas
import Monitoreo from "./subpages/Monitoreo";
import ChatIA from "./subpages/ChatIA";
import MasterBonos from "./subpages/MasterBonos";
import MisDatos from "./subpages/MisDatos";

export default function PortalLayout() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Obtenemos la pestaña actual de la URL, si no hay nada, por defecto es monitoreo
  const activeTab = searchParams.get("tab") || "monitoreo";

  return (
    <div className="portal-layout">
      <div className="portal-bg-texture"></div>

      <div className="portal-viewport">
        {activeTab === "monitoreo" && user?.rol === "DUEÑO" && <Monitoreo />}
        {activeTab === "ia" && <ChatIA />}
        {activeTab === "bonos" && <MasterBonos />}
        {activeTab === "perfil" && <MisDatos />}
      </div>
    </div>
  );
}