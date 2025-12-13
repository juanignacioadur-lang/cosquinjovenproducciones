import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import InfoBox from "./components/InfoBox.jsx";  // <-- importamos el cuadro fijo

import Inicio from "./pages/Inicio.jsx";
import Informacion from "./pages/Informacion.jsx";
import Noticias from "./pages/Noticias.jsx";
import Contacto from "./pages/Contacto.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Informacion" element={<Informacion />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="/Contacto" element={<Contacto />} />
      </Routes>

      <InfoBox />   {/* <-- agregamos el cuadro fijo aquí */}
      <Footer />
    </BrowserRouter>
  );
}