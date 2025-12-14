import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import PageFooter from "./components/PageFooter.jsx";
import InfoCard from "./components/InfoCard.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar fijo arriba */}
      <Navigation />

      {/* Contenedor principal que se expande y empuja al footer */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/informacion" element={<AboutPage />} />
          <Route path="/noticias" element={<EventsPage />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Elementos flotantes y Footer */}
      <InfoCard />
      <PageFooter />
    </BrowserRouter>
  );
}