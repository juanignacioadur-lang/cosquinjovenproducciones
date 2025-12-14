import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "#000",
        color: "#fff",
        padding: "15px 10px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.8)"
      }}
    >
      <div className="footer-content" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
          <p style={{ margin: '0' }}>
            © 2026 <span style={{ color: "#d00000", fontWeight: "bold" }}>COSQUIN JOVEN</span> PRODUCCIONES
          </p>
        </div>
      </div>
    </footer>
  );
}