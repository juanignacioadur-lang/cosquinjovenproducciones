import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes Globales
import Navigation from "./components/Navigation.jsx";
import PageFooter from "./components/PageFooter.jsx";
import InfoCard from "./components/InfoCard.jsx";
import RouteScrollHandler from "./components/RouteScrollHandler.jsx";
import CookieBanner from "./components/CookieBanner.jsx";

// Componente de Seguridad
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Páginas Públicas
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import NewsDetailPage from "./pages/NewsDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BonoPage from "./pages/BonoPage.jsx";
import Mantenimiento from "./pages/Mantenimiento.jsx";

// PORTAL DE GESTIÓN (Nuevas)
import LoginPage from "./pages/Portal/LoginPage.jsx";
import PortalLayout from "./pages/Portal/PortalLayout.jsx"; 

import "./index.css";
import "./GlobalScaler.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Manejador de Scroll Global */}
      <RouteScrollHandler />

      {/* Navegación y Banner de Privacidad */}
      <Navigation />
      <CookieBanner />

      <div className="main-content">
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/informacion" element={<AboutPage />} />
          <Route path="/noticias" element={<EventsPage />} />
          <Route path="/noticias/:id" element={<NewsDetailPage />} />
          <Route path="/bono" element={<BonoPage />} />
          <Route path="/contacto" element={<ContactPage />} />

          {/* --- ACCESO AL PORTAL (LOGIN) --- */}
          <Route path="/portal" element={<LoginPage />} />

          {/* --- PORTAL DE GESTIÓN PROTEGIDO --- 
              Usamos PortalLayout que es el que tiene las pestañas 
              de Monitoreo, IA, Bonos y Perfil.
          */}
          <Route 
            path="/gestion-bono" 
            element={
              <ProtectedRoute>
                <PortalLayout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
      
      <InfoCard />
      <PageFooter />
    </BrowserRouter>
  );
}