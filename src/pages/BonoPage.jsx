import React, { useState, useMemo } from "react";
import "./BonoPage.css";

// Componente Interno para las Tarjetas de Distribución
const DistriCard = ({ percent, label, amount, icon }) => (
  <div className="bono-distri-card">
    <div className="distri-icon">{icon}</div>
    <div className="distri-info">
      <span className="distri-percent">{percent}%</span>
      <span className="distri-label">{label}</span>
      <span className="distri-amount">${amount.toLocaleString()}</span>
    </div>
    {/* Detalle decorativo técnico */}
    <div className="distri-corner"></div>
  </div>
);

export default function BonoPage() {
  // CONFIGURACIÓN DEL BONO
  const VALOR_BONO = 15000;
  const META_NUMEROS = 36;

  // ESTADO DE VENTAS (Aquí se conectará la base de datos)
  const [ventas, setVentas] = useState([]);

  // CÁLCULOS DE DISTRIBUCIÓN AUTOMÁTICA
  const distri = useMemo(() => ({
    vendedor: ventas.length * 7500,  // 50%
    delegado: ventas.length * 2250,  // 15%
    productora: ventas.length * 5250 // 35%
  }), [ventas.length]);

  return (
    <main className="bono-page-root">
      {/* CAPA DE TEXTURA TECNOLÓGICA (SCANLINES) */}
      <div className="bono-ui-overlay"></div>

      <div className="bono-pilar-central anim-fade-in">
        
        {/* ============================================================
            ACTO 1: CABECERA INSTITUCIONAL
            ============================================================ */}
        <section className="bono-hero">
          <div className="h-pretitle">
            <span className="h-dot"></span>
            <span className="h-label">SISTEMA DIGITAL DE AUTOGESTIÓN V26.0</span>
          </div>
          <h1 className="bono-main-title">
            GRAN BONO <br />
            <span>CONTRIBUCIÓN</span>
          </h1>
          <div className="bono-hr-neon"></div>
          <p className="bono-subtitle">
            Implementación de autogestión para el <strong>Pack Experiencia</strong>. 
            Sin inversión propia, 100% transparente y orientado al artista.
          </p>
        </section>

        {/* ============================================================
            ACTO 2: MONITOR DE PROGRESO (EL CUADRO DE CONTROL)
            ============================================================ */}
        <section className="bono-monitor">
          <div className="monitor-hardware-box">
            {/* Esquineros Decorativos Estilo HUD */}
            <div className="corner-tl"></div><div className="corner-tr"></div>
            <div className="corner-bl"></div><div className="corner-br"></div>
            
            <div className="monitor-header">
              <span className="monitor-log">LOG: DATA_RECEPTION_ON</span>
              <span className="monitor-ref">ID: CJ_META_2026</span>
            </div>
            
            <div className="monitor-display">
              <span className="curr-val">{ventas.length}</span>
              <span className="divider">/</span>
              <span className="goal-val">{META_NUMEROS}</span>
            </div>

            <div className="monitor-bar-container">
              <div 
                className="monitor-bar-fill" 
                style={{ width: `${Math.min((ventas.length / META_NUMEROS) * 100, 100)}%` }}
              ></div>
            </div>

            <div className="monitor-footer-status">
              {ventas.length >= META_NUMEROS 
                ? "ESTADO: OBJETIVO ALCANZADO - PACK LIBERADO" 
                : `ESTADO: FALTAN ${META_NUMEROS - ventas.length} NÚMEROS PARA CUBRIR EL PACK`
              }
            </div>
          </div>
        </section>

        {/* ============================================================
            ACTO 3: DISTRIBUCIÓN DE RECAUDACIÓN
            ============================================================ */}
        <section className="bono-distribution">
          <h2 className="bono-section-title">DISTRIBUCIÓN DE FONDOS (POR NUMERO)</h2>
          <div className="distri-grid">
            <DistriCard icon="👤" percent="50" label="PARA QUIEN VENDE" amount={distri.vendedor} />
            <DistriCard icon="💼" percent="15" label="DELEGADO / ENCARGADO" amount={distri.delegado} />
            <DistriCard icon="🏢" percent="35" label="PRODUCTORA" amount={distri.productora} />
          </div>
        </section>

        {/* ============================================================
            ACTO 4: CUADRO DE PREMIOS (DISEÑO MUSEO)
            ============================================================ */}
        <section className="bono-prizes">
          <div className="prizes-main-container">
             <h2 className="prizes-display-title">LISTADO DE PREMIOS</h2>
             <div className="prizes-flex-layout">
                <div className="prize-grand-winner">
                   <div className="grand-rank">1° PREMIO</div>
                   <div className="grand-amount">$5.000.000</div>
                   <div className="grand-label">EFECTIVO NACIONAL</div>
                </div>
                <div className="prizes-secondary-grid">
                   <div className="secondary-item"><span>2°</span> Horno Eléctrico</div>
                   <div className="secondary-item"><span>3°</span> Cafetera Eléctrica</div>
                   <div className="secondary-item"><span>4°</span> Minipimer</div>
                   <div className="secondary-item"><span>5°</span> Licuadora Eléctrica</div>
                   <div className="secondary-item"><span>6°</span> Pava Eléctrica</div>
                   <div className="secondary-item"><span>7°</span> Estadía Carlos Paz (2pax)</div>
                   <div className="secondary-item"><span>8°</span> Artesanía Regional</div>
                </div>
             </div>
             <div className="prizes-extra-benefits">
                <p>✔️ 2 BONIFICACIONES PARA PROFESORES</p>
                <p>✔️ 20 INTEGRANTES CON 10% OFF EN PRÓXIMO FESTIVAL</p>
             </div>
          </div>
        </section>

        {/* ============================================================
            ACTO 5: FORMULARIO DE CARGA (DISEÑO BLINDADO)
            ============================================================ */}
        <section className="bono-form-wrapper">
          <div className="form-hardware-frame">
            <h3 className="form-main-title">CARGA DIGITAL DE BONOS</h3>
            <form className="bono-main-form">
              <div className="form-row">
                <div className="form-field">
                  <label>NOMBRE Y APELLIDO COMPRADOR</label>
                  <input type="text" placeholder="Ej: Maria Perez" required />
                </div>
                <div className="form-field">
                  <label>DNI</label>
                  <input type="number" placeholder="Sin puntos ni espacios" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>TELÉFONO</label>
                  <input type="tel" placeholder="+54 9..." required />
                </div>
                <div className="form-field">
                  <label>DIRECCIÓN</label>
                  <input type="text" placeholder="Ciudad y domicilio" required />
                </div>
              </div>
              <div className="form-field full">
                <label>ACADEMIA / DELEGACIÓN</label>
                <input type="text" placeholder="Nombre de la institución" required />
              </div>
              <div className="form-field full accent-field">
                <label>NÚMERO DE BONO ASIGNADO</label>
                <input type="number" className="input-large-red" placeholder="0000" required />
              </div>
              <button type="submit" className="btn-bono-submit">
                CONFIRMAR REGISTRO DIGITAL
              </button>
            </form>
          </div>
        </section>

        {/* ============================================================
            ACTO 6: REGISTRO HISTÓRICO (TABLA DE TRANSPARENCIA)
            ============================================================ */}
        <section className="bono-table-area">
          <h2 className="bono-section-title">NÚMEROS ASIGNADOS EN TIEMPO REAL</h2>
          <div className="table-hardware-wrap">
            <table>
              <thead>
                <tr>
                  <th>N° BONO</th>
                  <th>COMPRADOR</th>
                  <th>ACADEMIA</th>
                  <th className="hide-mobile">DNI</th>
                  <th>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {ventas.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-msg">Sincronizando registros con la base de datos central...</td>
                  </tr>
                ) : (
                  ventas.map((v, i) => (
                    <tr key={i}>
                      <td className="cell-num">#{v.numero}</td>
                      <td>{v.comprador}</td>
                      <td>{v.academia}</td>
                      <td className="hide-mobile">{v.dni}</td>
                      <td className="cell-status">VALIDADO</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="table-footer-actions">
             <button className="btn-export-excel">EXPORTAR LISTADO COMPLETO (Excel)</button>
          </div>
        </section>

      </div>
    </main>
  );
}