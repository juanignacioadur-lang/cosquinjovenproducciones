import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getBonds } from "../../../services/api";
import { askCJAssistant } from "../../../services/aiService";
import "./ChatIA.css";

export default function ChatIA() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'bot', content: `SISTEMA EN LÍNEA. Hola ${user?.nombre}, soy CJ-PILOT V3.0. He sincronizado los datos de la Academia ${user?.academia}. ¿Qué consulta estratégica deseas realizar?` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [bondsCount, setBondsCount] = useState(0);
  const chatEndRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Cargar contador de bonos para el contexto de la IA
  useEffect(() => {
    const loadStats = async () => {
      const data = await getBonds();
      const count = data.filter(b => b.vendedor === user?.dni).length;
      setBondsCount(count);
    };
    loadStats();
  }, [user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await askCJAssistant(userText, {
        userName: user?.nombre,
        academia: user?.academia,
        rol: user?.rol,
        soldCount: bondsCount
      });
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Error de enlace. Reiniciando protocolos..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-ia-root anim-fade-in">
      
      {/* 1. MONITOR DE ESTADO LATERAL (Solo PC) */}
      <aside className="chat-status-sidebar">
        <div className="status-monitor-card">
          <div className="monitor-header">
            <div className="led-green"></div>
            <span>IA_STATUS: ACTIVE</span>
          </div>
          <div className="monitor-data">
            <div className="data-row"><span>MODEL:</span> <strong>GEMINI 3.0 FLASH</strong></div>
            <div className="data-row"><span>REGION:</span> <strong>ARG</strong></div>
            <div className="data-row"><span>LATENCY:</span> <strong>LOW</strong></div>
          </div>
        </div>

        <div className="chat-suggestions">
          <p>SUGERENCIAS:</p>
          <button onClick={() => setInput("¿Cómo calculo mis comisiones?")}>Comisiones</button>
          <button onClick={() => setInput("¿Cuántos números me faltan?")}>Estado Metas</button>
          <button onClick={() => setInput("Explicame los premios")}>Listado Premios</button>
        </div>
      </aside>

      {/* 2. AREA DE CHAT CENTRAL */}
      <section className="chat-main-console">
        <div className="chat-history">
          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrapper ${msg.role}`}>
              <div className="msg-avatar">{msg.role === 'bot' ? 'CJ' : 'U'}</div>
              <div className="msg-bubble">
                {msg.content}
                <span className="msg-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
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
              placeholder="ESCRIBE UN COMANDO O CONSULTA..." 
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