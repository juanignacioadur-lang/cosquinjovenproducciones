import { BrowserRouter, Routes, Route } from "react-router-dom";

// Nuevos nombres de archivos
import Navbar from "./components/Navigation.jsx";
import Footer from "./components/PageFooter.jsx";
import InfoBox from "./components/InfoCard.jsx"; 

import Inicio from "./pages/HomePage.jsx";
import Noticias from "./pages/EventsPage.jsx";
import Contacto from "./pages/ContactPage.jsx";

import "./App.css"; // Si tienes estilos globales aquí

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Mantenemos las rutas url igual (/informacion, /noticias) pero cargan los nuevos archivos */}
        <Route path="/informacion" element={<Informacion />} /> 
        {/* OJO: Si tenías una página "Informacion.jsx", asegúrate de que esté importada. 
           Si no la renombraste en el paso 1, déjala como estaba. 
           Si la renombraste, actualiza aquí. */}
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <InfoBox />
      <Footer />
    </BrowserRouter>
  );
}