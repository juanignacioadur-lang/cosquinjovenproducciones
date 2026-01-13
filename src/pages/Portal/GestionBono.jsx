import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBonds, registerSale } from "../../services/api";
import { askCJAssistant } from "../../services/aiService"; // IMPORTAMOS IA REAL
import "./GestionBono.css";

export default function GestionBono() {
  const { user, logout } = useAuth();
  const [bonds, setBonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedBono, setSelectedBono] = useState(null);
  const [form, setForm] = useState({ nombre: "", dni: "", tel: "", dir: "" });

  // --- ESTADOS PARA LA IA ---
  const [chat, setChat] = useState([
    { role: 'bot', content: `¡Hola ${user?.nombre}! Soy CJ-PILOT. Estoy conectado a la base de datos de Cosquín Joven. ¿En qué te puedo ayudar hoy?` }
  ]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { fetchData(); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat, aiTyping]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getBonds();
      setBonds(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await registerSale({
      n_bono: selectedBono,
      vendedor_dni: user.dni,
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

  // --- LÓGICA DE LA IA REAL (GEMINI) ---
  const askAI = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || aiTyping) return;

    const userMsg = userInput;
    const newChat = [...chat, { role: 'user', content: userMsg }];
    setChat(newChat);
    setUserInput("");
    setAiTyping(true);

    const vendidos = bonds.filter(b => b.vendedor === user?.dni).length;
    
    // Llamada al servicio de Google AI
    const aiResponse = await askCJAssistant(userMsg, {
      userName: user?.nombre,
      academia: user?.academia,
      rol: user?.rol,
      soldCount: vendidos
    });

    setAiTyping(false);
    setChat([...newChat, { role: 'bot', content: aiResponse }]);
  };

  const misNumeros = Array.from({ length: 32 }, (_, i) => i + 1);

  return (
    <main className="gestion-root">
      <div className="gestion-pilar anim-fade-in">
        
        <header className="gestion-nav">
          <div className="user-info">
            <span className="user-role">{user?.rol}</span>
            <h2 className="user-name">HOLA, {user?.nombre?.split(' ')[0]}</h2>
          </div>
          <button onClick={logout} className="btn-logout">CERRAR SESIÓN</button>
        </header>

        <div className="gestion-grid">
          
          {/* LADO IZQUIERDO: IA TÁCTICA */}
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
                  placeholder="Escribí tu duda aquí..." 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value)} 
                />
                <button type="submit" className="ai-send-btn" disabled={aiTyping}>
                  {aiTyping ? '...' : 'ENVIAR'}
                </button>
              </form>
            </div>
            
            <div className="tool-card">
               <span className="user-role" style={{color:'#fff', opacity:0.5}}>MI ACADEMIA</span>
               <p style={{color: '#d00000', fontWeight:'bold', marginTop:'5px'}}>{user?.academia}</p>
            </div>
          </aside>

          {/* LADO DERECHO: MAPA DE SLOTS */}
          <section className="gestion-main">
            <div className="slots-grid">
              {misNumeros.map((num) => {
                const bonoData = bonds.find(b => b.n_bono === num);
                const isSold = bonoData && bonoData.comprador !== "Disponible";
                
                return (
                  <div 
                    key={num} 
                    className={`slot-box ${isSold ? 'sold' : 'available'} ${selectedBono === num ? 'selected' : ''}`}
                    onClick={() => !isSold && setSelectedBono(num)}
                  >
                    <span className="slot-id">#{num}</span>
                    <span className="slot-status">{isSold ? "VENDIDO" : "LIBRE"}</span>
                    {isSold && <span className="slot-owner">{bonoData.comprador}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* MODAL DE REGISTRO */}
        {selectedBono && (
          <div className="form-overlay">
            <div className="form-card-pro anim-fade-in">
              <h3 className="form-modal-title">REGISTRAR BONO <span>#{selectedBono}</span></h3>
              
              <form onSubmit={handleRegister} className="form-grid-pro">
                <input type="text" placeholder="Nombre completo del comprador" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                <input type="number" placeholder="DNI del comprador" required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
                <input type="tel" placeholder="WhatsApp (Ej: 3541...)" required value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} />
                <input type="text" placeholder="Dirección / Localidad" required value={form.dir} onChange={e => setForm({...form, dir: e.target.value})} />
                
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setSelectedBono(null)}>CANCELAR</button>
                  <button type="submit" className="btn-confirm" disabled={isSaving}>
                    {isSaving ? "GUARDANDO..." : "CONFIRMAR VENTA"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}