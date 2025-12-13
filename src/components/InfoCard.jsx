import "./InfoCard.css";
import logo from "/logofundacion.png";

export default function InfoBox() {
  return (
    <div className="info-box">
      <img src={logo} alt="Logo" className="info-logo" />
      <div className="info-text">
        <p className="info-title">
          <span className="info-icon">❤️</span> FUNDACIÓN COSQUIN EN ACCIÓN
        </p>
        <p className="info-subtitle">
          Trabajando por la cultura y la educación en nuestra comunidad
        </p>
      </div>
    </div>
  );
}

