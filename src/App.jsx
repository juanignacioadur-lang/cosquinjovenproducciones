import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTAMOS LOS NUEVOS NOMBRES DE ARCHIVOS
import Navigation from "./components/Navigation.jsx";
import PageFooter from "./components/PageFooter.jsx";
import InfoCard from "./components/InfoCard.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

// Si tenías un archivo CSS global, mantenlo (ej. import "./App.css")

export default function App() {
  return (
    <BrowserRouter>
      {/* Usamos el componente con el nuevo nombre */}
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/informacion" element={<AboutPage />} />
        {/* NOTA: Si tienes un archivo Informacion.jsx, renómbralo a "AboutPage.jsx" e impórtalo arriba igual que los otros */}

        <Route path="/noticias" element={<EventsPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>

      <InfoCard />
      <PageFooter />
    </BrowserRouter>
  );
}