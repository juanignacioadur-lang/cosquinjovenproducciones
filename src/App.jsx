import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import PageFooter from "./components/PageFooter.jsx";
import InfoCard from "./components/InfoCard.jsx";
import RouteScrollHandler from "./components/RouteScrollHandler.jsx";

// Páginas
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NewsDetailPage from "./pages/NewsDetailPage.jsx"; // <--- IMPORTANTE

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollHandler />
      <Navigation />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/informacion" element={<AboutPage />} />
          
          {/* Rutas de Eventos y Noticias */}
          <Route path="/noticias" element={<EventsPage />} />
          <Route path="/noticias/:id" element={<NewsDetailPage />} /> {/* <--- NUEVA RUTA */}
          
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>

      <InfoCard />
      <PageFooter />
    </BrowserRouter>
  );
}