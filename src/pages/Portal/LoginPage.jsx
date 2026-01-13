import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // Estado para el Checkbox
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
      // Pasamos los datos del usuario y si marcó "Recordarme"
      login(res.user, remember);
      navigate("/gestion-bono");
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <>
      {/* 1. VIDEO DE FONDO - Ahora fuera del main para que el GlobalScaler lo cubra todo */}
      <video
        className={`login-video-bg ${videoLoaded ? "video-visible" : "video-hidden"}`}
        src="/background.mp4"
        autoPlay 
        muted 
        loop 
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      />
      
      {/* 2. CAPA OSCURA - También fuera del main */}
      <div className="login-overlay-dark" />

      {/* 3. CONTENEDOR DEL FORMULARIO */}
      <main className="login-v29-root">
        <div className="login-hero-wrap anim-fade-in">
          {/* LOGO DINÁMICO */}
          <img src="/logo.png" alt="Cosquin Joven" className="login-main-logo" />

          <div className="login-interface">
            <header className="login-status">
               <span className="status-dot"></span>
               <span className="status-text">SISTEMA FEDERAL DE GESTIÓN</span>
            </header>

            <h2 className="login-h2">ACCESO <span>PORTAL</span></h2>

            <form onSubmit={handleSubmit} className="login-form-v29">
              <div className="login-row">
                <div className="login-field">
                  <label>USUARIO</label>
                  <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={dni} 
                    onChange={(e) => setDni(e.target.value)} 
                    required 
                  />
                </div>

                <div className="login-field">
                  <label>CONTRASEÑA</label>
                  <input 
                    type="password" 
                    placeholder="Clave" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              {/* OPCIÓN: MANTENER SESIÓN INICIADA */}
              <div className="login-options">
                <label className="login-remember">
                  <input 
                    type="checkbox" 
                    checked={remember} 
                    onChange={(e) => setRemember(e.target.checked)} 
                  />
                  <span className="custom-checkbox"></span>
                  MANTENER SESIÓN INICIADA
                </label>
              </div>

              {error && <p className="login-error-v29">{error}</p>}

              <button type="submit" disabled={loading} className="login-action-btn">
                {loading ? "AUTENTICANDO..." : "ENTRAR AL SISTEMA"}
              </button>
            </form>

            <footer className="login-id-footer">
              © 2026 CJ PRODUCCIONES // SEGURIDAD_V29
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}