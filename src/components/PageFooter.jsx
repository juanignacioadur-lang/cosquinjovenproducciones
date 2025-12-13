import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        /* Posición Fija abajo */
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000, /* Z-index alto, pero menor que el InfoBox */
        
        /* Estilos visuales */
        background: "#000",
        color: "#fff",
        padding: "20px 10px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <div className="footer-content" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
        
        {/* SECCIÓN DE EMOJIS ELIMINADA */}

        <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
          <p style={{ margin: '5px 0' }}>
            © 2026 <span style={{ color: "#d00000", fontWeight: "bold" }}>COSQUIN JOVEN</span> PRODUCCIONES
          </p>
        </div>
      </div>
    </footer>
  );
}