import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { getBonds, registerSale } from "../../services/api";
import { askCJAssistant } from "../../services/aiService";
import ReactDOM from "react-dom";
import "./GestionBono.css";

export default function GestionBono() {
  const { user, logout } = useAuth();
  
  const [data, setData] = useState({ sales: [], delegates: [] });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // --- ESTADOS DE CONTROL ---
  const [numeroElegido, setNumeroElegido] = useState(""); // Número manual
  const [isAdding, setIsAdding] = useState(false); // Modo Carga
  const [detailedBono, setDetailedBono] = useState(null); // Modo Ver Info
  const [form, setForm] = useState({ nombre: "", dni: "", tel: "", dir: "" });

  // --- IA ESTATAL ---
  const [chat, setChat] = useState([
    { role: 'bot', content: `Hola ${user?.nombre}. Sistema de Cupo Global Activo. Podés elegir cualquier número del 1 al 1000. ¿En qué te ayudo?` }
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
    } catch (e) { console.error("Sync Error:", e); }
    setLoading(false);
  };

  // --- LÓGICA DE DATOS ---
  const myInfo = useMemo(() => data.delegates?.find(d => d.dni.toString() === user.dni.toString()), [data.delegates]);
  const mySalesCount = useMemo(() => data.sales?.filter(s => s.vendedor.toString() === user.dni.toString()).length || 0, [data.sales]);
  const sortedSales = useMemo(() => [...(data.sales || [])].sort((a, b) => a.id_bono - b.id_bono), [data.sales]);

  // --- ACCIONES ---
  const handleOpenAdd = () => {
    if (mySalesCount >= (myInfo?.cantidad || 0)) {
      return alert(`Límite alcanzado: Tu cupo es de ${myInfo?.cantidad} bonos.`);
    }
    setIsAdding(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const num = parseInt(numeroElegido);

    if (!num || num < 1 || num > 1000) return alert("Número inválido (1-1000)");

    // Validación de disponibilidad de último segundo
    const ocupado = data.sales.find(s => s.id_bono.toString() === num.toString());
    if (ocupado) return alert(`¡ERROR! El bono #${num} acaba de ser vendido por otra academia.`);

    setIsSaving(true);
    const res = await registerSale({
      id_bono: num,
      vendedor_dni: user.dni,
      vendedor_nombre: user.nombre,
      comprador_nombre: form.nombre,
      comprador_dni: form.dni,
      telefono: form.tel,
      direccion: form.dir,
      academia: user.academia
    });

    if (res.status === "success") {
      alert("¡VENTA REGISTRADA CON ÉXITO!");
      setIsAdding(false);
      setNumeroElegido("");
      setForm({ nombre: "", dni: "", tel: "", dir: "" });
      fetchData();
    } else {
      alert(res.message);
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
      soldCount: mySalesCount
    });
    setAiTyping(false);
    setChat(prev => [...prev, { role: 'bot', content: aiResponse }]);
  };

  if (loading) return <div className="loader-tech"><center>SINCRONIZANDO SISTEMA FEDERAL...</center></div>;

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
                <span className="s-val">{mySalesCount} / {myInfo?.cantidad || 0}</span>
             </div>
             <button onClick={logout} className="btn-logout">SALIR</button>
          </div>
        </header>

        <div className="gestion-grid">
          
          <aside className="gestion-tools">
            <div className="tool-card ai-assistant">
              <div className="ai-header">
                <div className={`ai-led ${aiTyping ? 'typing' : ''}`}></div>
                <span>CJ-PILOT (IA)</span>
              </div>
              <div className="ai-chat-window">
                {chat.map((msg, i) => <div key={i} className={`ai-bubble ${msg.role}`}>{msg.content}</div>)}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={askAI} className="ai-input-group">
                <input type="text" placeholder="Consultar..." value={userInput} onChange={e => setUserInput(e.target.value)} />
                <button type="submit">OK</button>
              </form>
            </div>
          </aside>

          <section className="gestion-main">
            <div className="slots-grid">
              
              {/* BOTÓN PARA AGREGAR NUEVO */}
              <div className="slot-box add-new-btn" onClick={handleOpenAdd}>
                <span className="slot-id">+</span>
                <span className="slot-status">VENDER</span>
              </div>

              {/* GRILLA DE BONOS VENDIDOS GLOBALMENTE */}
              {sortedSales.map((sale) => {
                const isMine = sale.vendedor.toString() === user.dni.toString();
                return (
                  <div 
                    key={sale.id_bono} 
                    className={`slot-box ${isMine ? 'mine' : 'occupied'}`}
                    onClick={() => isMine ? setDetailedBono(sale) : null}
                  >
                    <span className="slot-id">#{sale.id_bono}</span>
                    <span className="slot-status">{isMine ? "VER INFO" : "OCUPADO"}</span>
                    {isMine && <span className="slot-owner">{sale.comprador.split(' ')[0]}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* --- MODAL 1: REGISTRAR VENTA --- */}
        {isAdding && ReactDOM.createPortal(
          <div className="form-overlay" onClick={() => setIsAdding(false)}>
            <div className="form-card-pro anim-impact" onClick={e => e.stopPropagation()}>
              <button className="btn-close-x" onClick={() => setIsAdding(false)}>&times;</button>
              <h3 className="form-modal-title">NUEVA VENTA</h3>
              <form onSubmit={handleRegister} className="form-grid-pro">
                <div className="f-group">
                  <label>ID DE BONO (1-1000)</label>
                  <input type="number" placeholder="Número elegido" required value={numeroElegido} onChange={e => setNumeroElegido(e.target.value)} />
                </div>
                <input type="text" placeholder="NOMBRE COMPRADOR" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                <input type="number" placeholder="DNI COMPRADOR" required value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
                <input type="tel" placeholder="WHATSAPP" required value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} />
                <input type="text" placeholder="LOCALIDAD" required value={form.dir} onChange={e => setForm({...form, dir: e.target.value})} />
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsAdding(false)}>ABORTAR</button>
                  <button type="submit" className="btn-confirm" disabled={isSaving}>CONFIRMAR</button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

        {/* --- MODAL 2: FICHA TÉCNICA (DETALLE) --- */}
        {detailedBono && ReactDOM.createPortal(
          <div className="detail-overlay" onClick={() => setDetailedBono(null)}>
            <div className="detail-card-pro anim-impact" onClick={e => e.stopPropagation()}>
              <button className="btn-close-x" onClick={() => setDetailedBono(null)}>&times;</button>
              <header className="detail-header">
                <h4>FICHA TÉCNICA: <span>BONO #{detailedBono.id_bono}</span></h4>
              </header>
              <div className="detail-body">
                <p><strong>COMPRADOR:</strong> {detailedBono.comprador}</p>
                <p><strong>DNI:</strong> {detailedBono.dni_comp}</p>
                <p><strong>TEL:</strong> {detailedBono.tel}</p>
                <p><strong>ESTADO:</strong> <span className={detailedBono.estado.toLowerCase()}>{detailedBono.estado}</span></p>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </main>
  );
}