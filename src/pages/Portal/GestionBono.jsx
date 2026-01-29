import React, { useState, useEffect, useRef, useMemo } from "react"; // IMPORTACIÓN CORREGIDA
import { useAuth } from "../../context/AuthContext";
import { getBonds, registerSale } from "../../services/api";
import { askCJAssistant } from "../../services/aiService";
import ReactDOM from "react-dom"; // Necesario para el modal portal
import "./GestionBono.css";

export default function GestionBono() {
  const { user, logout } = useAuth();
  
  // 1. ESTADO INICIAL CORREGIDO (Objeto con sales y delegates)
  const [data, setData] = useState({ sales: [], delegates: [] });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBono, setSelectedBono] = useState(null);
  const [form, setForm] = useState({ nombre: "", dni: "", tel: "", dir: "" });

  // --- LÓGICA DINÁMICA ---

  // Obtener mis datos de rango desde la lista federal
  const myData = useMemo(() => {
    return data.delegates?.find(d => d.dni.toString() === user.dni.toString());
  }, [data.delegates, user.dni]);

  // Generar mi grilla de números real
  const misNumeros = useMemo(() => {
    if (!myData) return [];
    const start = Number(myData.de);
    const end = Number(myData.hasta);
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }, [myData]);

  // Contar mis ventas reales
  const vendidosCount = useMemo(() => {
    return data.sales.filter(s => s.vendedor.toString() === user.dni.toString()).length;
  }, [data.sales, user.dni]);

  // --- ESTADOS PARA LA IA ---
  const [chat, setChat] = useState([
    { role: 'bot', content: `¡Hola ${user?.nombre}! Soy CJ-PILOT. Estoy listo para gestionar los bonos de ${user?.academia}. ¿Qué necesitás?` }
  ]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { fetchData(); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat, aiTyping]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getBonds();
      setData(res);
    } catch (e) { console.error("Error cargando datos:", e); }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedBono) return;
    
    setIsSaving(true);
    const res = await registerSale({
      n_bono: (selectedBono - Number(myData.de)) + 1, // Número relativo (1-32)
      id_bono: selectedBono, // ID Global (ej: 129)
      vendedor_dni: user.dni,
      vendedor_nombre: user.nombre,
      comprador_nombre: form.nombre,
      comprador_dni: form.dni,
      telefono: form.tel,
      direccion: form.dir,
      academia: user.academia
    });

    if (res.status === "success") {
      alert("¡Venta registrada con éxito!");
      setSelectedBono(null);
      setForm({ nombre: "", dni: "", tel: "", dir: "" });
      fetchData();
    } else {
      alert("Error: " + res.message);
    }
    setIsSaving(false);
  };

  const askAI = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || aiTyping) return;

    const userMsg = userInput;
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setUserInput("");
    setAiTyping(true);

    const aiResponse = await askCJAssistant(userMsg, {
      userName: user?.nombre,
      academia: user?.academia,
      rol: user?.rol,
      soldCount: vendidosCount
    });

    setAiTyping(false);
    setChat(prev => [...prev, { role: 'bot', content: aiResponse }]);
  };

  if (loading) return <div className="loader-tech"><center>SINCRONIZANDO PANEL...</center></div>;

  return (
    <main className="gestion-root">
      <div className="gestion-pilar anim-fade-in">
        
        <header className="gestion-nav">
          <div className="user-info">
            <span className="user-role">DELEGADO: {user?.academia}</span>
            <h2 className="user-name">HOLA, {user?.nombre?.split(' ')[0]}</h2>
          </div>
          <div className="user-stats-pill">
             <div className="stat-box-mini">
                <span className="s-label">VENDIDOS</span>
                <span className="s-val">{vendidosCount} / {myData?.cantidad || 0}</span>
             </div>
             <button onClick={logout} className="btn-logout">SALIR</button>
          </div>
        </header>

        {/* BARRA DE PROGRESO */}
        <div className="delegate-progress-bar">
           <div className="fill" style={{width: `${(vendidosCount / (Number(myData?.cantidad) || 1)) * 100}%`}}></div>
        </div>

        <div className="gestion-grid">
          
          <aside className="gestion-tools">
            <div className="tool-card ai-assistant">
              <div className="ai-header">
                <div className={`ai-led ${aiTyping ? 'typing' : ''}`}></div>
                <span>CJ-PILOT (INTELLIGENCE)</span>
              </div>
              
              <div className="ai-chat-window">
                {chat.map((msg, i) => (
                  <div key={i} className={`ai-bubble ${msg.role}`}>{msg.content}</div>
                ))}
                {aiTyping && <div className="ai-bubble bot">Analizando datos...</div>}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={askAI} className="ai-input-group">
                <input 
                  type="text" 
                  placeholder="Consultar a la IA..." 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value)} 
                />
                <button type="submit" className="ai-send-btn" disabled={aiTyping}>
                  {aiTyping ? '...' : 'ENVIAR'}
                </button>
              </form>
            </div>
          </aside>

          <section className="gestion-main">
            <div className="slots-grid">
              {misNumeros.map((num) => {
                const bonoData = data.sales?.find(s => s.id_bono.toString() === num.toString());
                const isSold = !!bonoData;
                
                return (
                  <div 
                    key={num} 
                    className={`slot-box ${isSold ? 'sold' : 'available'} ${selectedBono === num ? 'selected' : ''}`}
                    onClick={() => !isSold && setSelectedBono(num)}
                  >
                    <span className="slot-id">#{num}</span>
                    <span className="slot-status">{isSold ? "VENDIDO" : "LIBRE"}</span>
                    {isSold && <span className="slot-owner">{bonoData.comprador.split(' ')[0]}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* MODAL CON PORTAL PARA EVITAR CORTES EN IPHONE */}
        {selectedBono && ReactDOM.createPortal(
          <div className="form-overlay" onClick={() => setSelectedBono(null)}>
            <div className="form-card-pro anim-impact" onClick={e => e.stopPropagation()}>
              <h3 className="form-modal-title">REGISTRAR VENTA: <span>BONO #{selectedBono}</span></h3>
              <form onSubmit={handleRegister} className="form-grid-pro">
                <input type="text" placeholder="Nombre Comprador" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                <input type="number" placeholder="DNI Comprador" required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
                <input type="tel" placeholder="WhatsApp" required value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} />
                <input type="text" placeholder="Ciudad / Localidad" required value={form.dir} onChange={e => setForm({...form, dir: e.target.value})} />
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setSelectedBono(null)}>ABORTAR</button>
                  <button type="submit" className="btn-confirm" disabled={isSaving}>
                    {isSaving ? "GUARDANDO..." : "CONFIRMAR"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      </div>
    </main>
  );
}