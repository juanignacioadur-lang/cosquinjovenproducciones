import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await loginUser(dni, password);
    if (res.status === "success") {
      login(res.user, remember);
      navigate("/gestion-bono");
    } else {
      setError("USUARIO O CONTRASEÑA INCORRECTOS"); 
    }
    setLoading(false);
  };

  return (
    <>
      {/* 1. VIDEO Y OVERLAY: El GlobalScaler V71 les da el tamaño infinito automáticamente */}
      <video
        className={`login-video-bg ${videoLoaded ? "video-visible" : "video-hidden"}`}
        src="/background.mp4"
        autoPlay muted loop playsInline preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
      />
      
      <div className="login-overlay-dark" />

      {/* 2. CONTENIDO: Transparente para que se vea el video que Scaler maneja */}
      <main className="login-v29-root">
        <div className="login-central-axis anim-reveal">
          
          <img src="/logo.png" alt="CJ PRODUCCIONES" className="login-portal-logo" />

          <div className="login-glass-card">
            <header className="login-header-status">
               <span className="status-indicator"></span>
               <span className="status-label">SISTEMA FEDERAL DE GESTIÓN</span>
            </header>

            <h2 className="login-main-title">
              ACCESO 
              <span>Portal</span>
            </h2>

            <form onSubmit={handleSubmit} className="login-form-federal">
              <div className="login-input-group">
                <div className="login-field">
                  <label>ID USUARIO</label>
                  <input 
                    type="text" 
                    placeholder="DNI" 
                    value={dni} 
                    onChange={(e) => setDni(e.target.value)} 
                    required 
                  />
                </div>

                <div className="login-field">
                  <label>CLAVE DE SEGURIDAD</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="login-extra-options">
                <label className="login-checkbox-wrap">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  <span className="login-custom-check"></span>
                  MANTENER SESIÓN ACTIVA
                </label>
              </div>

              {error && <p className="login-error-alert">{error}</p>}

              <button type="submit" disabled={loading} className="login-btn-supreme">
                {loading ? "AUTENTICANDO..." : "ENTRAR AL SISTEMA"}
              </button>
            </form>

            
          </div>
          
          <Link to="/" className="login-back-link">← VOLVER AL INICIO</Link>
        </div>
      </main>
    </>
  );
}