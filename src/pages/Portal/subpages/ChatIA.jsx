import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getBonds, saveChatMessage } from "../../../services/api"; // Asegúrate de tener saveChatMessage en api.js
import { askCJAssistant } from "../../../services/aiService";
import "./ChatIA.css";

export default function ChatIA() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bondsCount, setBondsCount] = useState(0);
  const [myInfo, setMyInfo] = useState(null); // <--- AGREGAR ESTA
  const [loading, setLoading] = useState(true); // <--- AGREGAR ESTA
  const chatEndRef = useRef(null);
  
  // CARGA ÚNICA DE HISTORIAL, CUPO Y VENTAS
  useEffect(() => {
    const initChat = async () => {
      if (!user?.dni) return;

      setLoading(true); // Ahora sí existe
      try {
        const res = await getBonds(user.dni); 
        
        // A. Sincronizar Historial
        if (res.history && res.history.length > 0) {
          setMessages(res.history);
        } else {
          setMessages([{ role: 'bot', content: `SISTEMA SINCRONIZADO. Hola ${user.nombre}, soy CJ-PILOT. ¿En qué puedo ayudarte?` }]);
        }
        
        // B. Sincronizar Contador de Ventas
        const count = res.sales?.filter(b => b.vendedor.toString() === user.dni.toString()).length || 0;
        setBondsCount(count);

        // C. Sincronizar Cupo del Delegado
        const info = res.delegates?.find(d => d.dni.toString() === user.dni.toString());
        setMyInfo(info);

      } catch (error) {
        console.error("Error de enlace federal:", error);
      }
      setLoading(false);
    };
    initChat();
  }, [user]);

  // 3. ENVÍO DE MENSAJES CON PERSISTENCIA
const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim() || isTyping) return;

  const userText = input;
  const now = new Date(); // <--- Creamos la hora actual

  // Actualizamos UI localmente incluyendo el timestamp
  setMessages(prev => [...prev, { 
    role: 'user', 
    content: userText, 
    timestamp: now // <--- Agregamos la hora al mensaje nuevo
  }]);
  
  setInput("");
    
    // GUARDAR EN GOOGLE SHEETS (Mensaje Usuario)
    saveChatMessage(user.dni, 'user', userText);

    setIsTyping(true);

    try {
      const response = await askCJAssistant(userText, {
        userName: user?.nombre,
        academia: user?.academia,
        rol: user?.rol,
        soldCount: bondsCount,
        assignedLimit: myInfo?.cantidad || 0
      });

      // GUARDAR EN GOOGLE SHEETS (Respuesta Bot)
      saveChatMessage(user.dni, 'bot', response);

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Error de enlace federal. Los datos se guardarán al restablecer la conexión." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-ia-root anim-fade-in">
      
      {/* 1. MONITOR DE ESTADO LATERAL */}
      <aside className="chat-status-sidebar">
        <div className="status-monitor-card">
          <div className="monitor-header">
            <div className="led-green"></div>
            <span>IA_STATUS: ACTIVE</span>
          </div>
          <div className="monitor-data">
            <div className="data-row"><span>MODEL:</span> <strong>GEMINI 3.0 FLASH</strong></div>
            <div className="data-row"><span>CUPO:</span> <strong>{bondsCount} / {myInfo?.cantidad || '--'}</strong></div>
            <div className="data-row"><span>ESTADO:</span> <strong>EN LÍNEA</strong></div>
          </div>
        </div>

        <div className="chat-suggestions">
          <p>SUGERENCIAS:</p>
          <button onClick={() => setInput("¿Cómo calculo mis comisiones?")}>Calcular Ganancias</button>
          <button onClick={() => setInput("¿Cuánto me falta para completar mi cupo?")}>Estado de Meta</button>
          <button onClick={() => setInput("Explicame los premios del bono")}>Listado de Premios</button>
        </div>
      </aside>

      {/* 2. AREA DE CHAT CENTRAL */}
      <section className="chat-main-console">
        <div className="chat-history">
          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrapper ${msg.role}`}>
              <div className="msg-avatar">
  {msg.role === 'bot' ? 'CJ' : (user?.nombre?.charAt(0).toUpperCase() || 'U')}
</div>
              <div className="msg-bubble">
  {msg.content}
  <span className="msg-time">
    {/* 
       Si el mensaje tiene timestamp (del Excel o nuevo), lo usamos. 
       Si no, ponemos la hora actual por seguridad.
    */}
    {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
      hour: '2-digit', 
      minute: '2-digit'
    })}
  </span>
</div>
            </div>
          ))}
          {isTyping && (
            <div className="msg-wrapper bot">
              <div className="msg-avatar">CJ</div>
              <div className="msg-bubble typing-bubble">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 3. INPUT BAR FUTURISTA */}
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <div className="input-glow-wrap">
            <input 
              type="text" 
              placeholder="ESCRIBE UNA CONSULTA..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="btn-send-tech" disabled={isTyping || !input.trim()}>
              {isTyping ? "..." : "DESPACHAR"}
            </button>
          </div>
        </form>
      </section>

    </div>
  );
}