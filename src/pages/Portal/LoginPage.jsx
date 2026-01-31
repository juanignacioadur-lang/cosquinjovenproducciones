import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getBonds, updatePassword } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [view, setView] = useState("login"); // 'login' o 'forgot'
  const [recovery, setRecovery] = useState({ nombre: "", academia: "", dni: "" });
  const [newPass, setNewPass] = useState(""); // <--- AGREGA ESTA LÍNEA
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
    const handleFinalReset = async () => {
    setLoading(true);
    // Usamos el DNI que pusiste en el paso de recuperación
    const res = await updatePassword(recovery.dni, newPass);
    if (res.status === "success") {
      alert("¡CONTRASEÑA ACTUALIZADA! Ya podés iniciar sesión.");
      setView("login");
      setNewPass("");
    } else {
      setError("NO SE PUDO GUARDAR LA NUEVA CLAVE");
    }
    setLoading(false);
  };
const handleRecover = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Intentamos traer los datos
      const data = await getBonds();
      
      // LOG DE SEGURIDAD: Abre la consola (F12) para ver si llegan los datos
      console.log("Datos recibidos:", data);

      // 2. Verificamos que la base de datos no esté vacía o rota
      if (!data || !data.delegates || data.delegates.length === 0) {
        setError("ERROR: LA BASE DE DATOS ESTÁ FUERA DE LÍNEA");
        setLoading(false);
        return;
      }

      // 3. Buscamos el match (limpiando espacios y mayúsculas)
      const userMatch = data.delegates.find(d => 
        d.dni.toString() === recovery.dni.toString() &&
        d.nombre.toLowerCase().trim() === recovery.nombre.toLowerCase().trim() &&
        d.academia.toLowerCase().trim() === recovery.academia.toLowerCase().trim()
      );

      if (userMatch) {
        setView("reset"); // ÉXITO: Pasamos a la vista de nueva contraseña
      } else {
        setError("DATOS INCORRECTOS: NO COINCIDEN CON EL REGISTRO");
      }
    } catch (err) {
      console.error("Error técnico:", err);
      setError("ERROR DE CONEXIÓN: REINTENTE EN UN MOMENTO");
    } finally {
      setLoading(false);
    }
  };
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
      {/* 1. VIDEO Y OVERLAY: Fondo original mantenido */}
      <video
        className={`login-video-bg ${videoLoaded ? "video-visible" : "video-hidden"}`}
        src="/background.mp4"
        autoPlay muted loop playsInline preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
      />
      
      <div className="login-overlay-dark" />

      {/* 2. CONTENIDO: Estructura central original */}
      <main className="login-v29-root">
        <div className="login-central-axis anim-reveal">
          
          <img src="/logo.png" alt="CJ PRODUCCIONES" className="login-portal-logo" />

          <div className="login-glass-card">

            {/* Título dinámico según la vista */}
            <h2 className="login-main-title">
              {view === 'login' ? 'ACCESO' : view === 'forgot' ? 'RECUPERAR' : 'SEGURIDAD'} 
              <span>Portal</span>
            </h2>

            {/* --- VISTA 1: LOGIN --- */}
            {view === 'login' && (
              <form onSubmit={handleSubmit} className="login-form-federal">
                <div className="login-input-group">
                  <div className="login-field">
                    <label>ID USUARIO</label>
                    <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required />
                  </div>
                  <div className="login-field">
                    <label>CLAVE DE SEGURIDAD</label>
                    <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>

                <div className="login-extra-options" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <label className="login-checkbox-wrap">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                    <span className="login-custom-check"></span>
                    MANTENER SESIÓN
                  </label>
                  <button type="button" onClick={() => setView("forgot")} style={{background: 'transparent', border: 'none', color: '#7a7a7a', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline'}}>
                    ¿Olvidaste tu clave?
                  </button>
                </div>

                {error && <p className="login-error-alert">{error}</p>}
                <button type="submit" disabled={loading} className="login-btn-supreme">
                  {loading ? "AUTENTICANDO..." : "ENTRAR AL SISTEMA"}
                </button>
                   <Link to="/" type="button" className="login-back-link" onClick={() => setView("login")} style={{width: '100%', marginTop: '20px', background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '0.9rem'}}>← VOLVER AL INICIO</Link>
              </form>
            )}

            {/* --- VISTA 2: RECUPERAR IDENTIDAD --- */}
            {view === 'forgot' && (
              <form onSubmit={handleRecover} className="login-form-federal">
                <div className="login-input-group">
                  <div className="login-field">
                    <label>NOMBRE COMPLETO</label>
                    <input type="text" required onChange={e => setRecovery({...recovery, nombre: e.target.value})} />
                  </div>
                  <div className="login-field">
                    <label>ACADEMIA</label>
                    <input type="text" required onChange={e => setRecovery({...recovery, academia: e.target.value})} />
                  </div>
                  <div className="login-field">
                    <label>DNI</label>
                    <input type="number" required onChange={e => setRecovery({...recovery, dni: e.target.value})} />
                  </div>
                </div>
                {error && <p className="login-error-alert">{error}</p>}
                <button type="submit" disabled={loading} className="login-btn-supreme">
                  {loading ? "VERIFICANDO..." : "VALIDAR IDENTIDAD"}
                </button>
                <button type="button" className="login-back-link" onClick={() => setView("login")} style={{width: '100%', marginTop: '20px', background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '0.9rem'}}>
                   ← VOLVER ATRÁS
                </button>
              </form>
            )}

            {/* --- VISTA 3: ÉXITO Y NUEVA CLAVE --- */}
{view === 'reset' && (
  <div className="login-form-federal">
    <p style={{color: '#25D366', fontWeight: 'bold', marginBottom: '25px', textAlign: 'center', fontSize: '1.2rem'}}>
      ✓ IDENTIDAD VERIFICADA
    </p>
    <div className="login-input-group">
      <div className="login-field">
        <label>NUEVA CONTRASEÑA</label>
        {/* Usamos el estado newPass que ya tenés definido */}
        <input 
          type="text" 
          placeholder="Escribí tu nueva clave" 
          value={newPass} 
          onChange={(e) => setNewPass(e.target.value)} 
        />
      </div>
    </div>
    <button className="login-btn-supreme" onClick={handleFinalReset} disabled={loading}>
      {loading ? "GUARDANDO..." : "GUARDAR Y SALIR"}
    </button>
  </div>
)}

          </div>
        </div>
      </main>
    </>
  );
}