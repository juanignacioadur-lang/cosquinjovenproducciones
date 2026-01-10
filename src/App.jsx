import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes Globales
import Navigation from "./components/Navigation.jsx";
import PageFooter from "./components/PageFooter.jsx";
import InfoCard from "./components/InfoCard.jsx";
import RouteScrollHandler from "./components/RouteScrollHandler.jsx";
import CookieBanner from "./components/CookieBanner.jsx";

// Páginas
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import NewsDetailPage from "./pages/NewsDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

// Importación de Mantenimiento y Bono
import Mantenimiento from "./pages/Mantenimiento.jsx";
// import BonoPage from "./pages/BonoPage.jsx"; // La usaremos cuando termine el mantenimiento

import "./index.css";

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
          {/* Inicio */}
          <Route path="/" element={<HomePage />} />
          
          {/* Sobre Nosotros */}
          <Route path="/informacion" element={<AboutPage />} />
          
          {/* Eventos y Noticias */}
          <Route path="/noticias" element={<EventsPage />} />
          <Route path="/noticias/:id" element={<NewsDetailPage />} />
          
          {/* 
              SECCIÓN GRAN BONO (MODO MANTENIMIENTO ACTIVO)
              Cambia 'Mantenimiento' por 'BonoPage' cuando quieras activar la sección real.
          */}
          <Route path="/bono" element={<Mantenimiento />} />
          
          {/* Contacto y Prensa */}
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>
      
      {/* Tarjeta de la Fundación y Footer */}
      <InfoCard />
      <PageFooter />
    </BrowserRouter>
  );
}