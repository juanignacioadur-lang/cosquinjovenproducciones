import React, { useState, useEffect, useMemo } from "react";
import { getBonds } from "../services/api";
import "./BonoPage.css";

export default function BonoPage() {
  const [data, setData] = useState({ sales: [], delegates: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      const res = await getBonds();
      setData(res);
      setLoading(false);
    };
    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, []);

  // 1. VENTAS VALIDADAS (Base para todo)
  const ventasValidadas = useMemo(() => {
    return data.sales.filter(s => s.estado === "VALIDADO");
  }, [data.sales]);

  const totalVendidos = ventasValidadas.length;
  const porcentajeVendido = (totalVendidos / 1000) * 100;

  // 2. ULTIMAS VENTAS (Para FOMO)
  const ultimasVentas = useMemo(() => {
    return [...ventasValidadas].reverse().slice(0, 6);
  }, [ventasValidadas]);

  // 3. ULTIMAS VENTAS DETALLADAS (Con Academia)
  const ultimasVentasDetalladas = useMemo(() => {
    return ultimasVentas.map(v => {
      const infoDelegado = data.delegates.find(d => d.dni.toString() === v.vendedor.toString());
      return {
        ...v,
        academia: infoDelegado ? infoDelegado.academia : "Academia Independiente"
      };
    });
  }, [ultimasVentas, data.delegates]);

  // 4. RANKING FEDERAL
const rankingDelegados = useMemo(() => {
    const stats = {};

    ventasValidadas.forEach(s => {
      const dniVendedor = s.vendedor.toString();
      
      if (!stats[dniVendedor]) {
        // Buscamos al delegado en la lista para obtener su cupo total (columna J)
        const infoDelegado = data.delegates.find(d => d.dni.toString() === dniVendedor);
        
        stats[dniVendedor] = {
          nombre: s.vendedor_nombre,
          academia: infoDelegado ? infoDelegado.academia : "Independiente",
          cant: 0,
          // Capturamos el cupo total, si no existe ponemos 100 por defecto para evitar división por cero
          totalCupo: infoDelegado ? Number(infoDelegado.cantidad) : 100 
        };
      }
      stats[dniVendedor].cant += 1;
    });

    return Object.values(stats)
      .sort((a, b) => b.cant - a.cant)
      .slice(0, 4);
  }, [ventasValidadas, data.delegates]);

  if (loading) return <div className="loader-tech">SINCRONIZANDO SISTEMA FEDERAL...</div>;

  return (
    <div className="bono-supreme-root anim-reveal">
      <div className="bono-grid-bg"></div>
      <div className="bono-vignette"></div>

      <header className="bono-header-supreme">
        <div className="title-monument-stack">
          <div className="arched-top">
            <svg viewBox="0 0 1000 240" className="svg-monument">
              <path id="curve-wide" d="M 100,200 Q 500,20 900,200" fill="transparent" />
              <text className="svg-text-bono">
                <textPath href="#curve-wide" startOffset="50%" textAnchor="middle">
                  GRAN BONO
                </textPath>
              </text>
            </svg>
          </div>
          <div className="year-center-box">
             <span className="year-glitch">2026</span>
             <div className="year-neon-line"></div>
          </div>
        </div>
        <p className="bono-official-tag">[ SISTEMA DE CONTRIBUCIÓN NACIONAL - RECAUDACIÓN EN VIVO ]</p>
      </header>

      <main className="bono-pilar-v42">
        {/* ACTO 2: EL RADAR */}
        <div className="bono-radar-grid">
          <section className="radar-main-box">
            <div className="radar-header">
               <span className="label-tech">ESTADO DE EMISIÓN</span>
               <div className="live-dot-wrap"><div className="dot"></div> LIVE</div>
            </div>
            <div className="radar-counter">
               <h2 className="count-big">{totalVendidos}</h2>
               <div className="count-info">
                  <span className="total-of">/ 1000</span>
                  <span className="status-txt">BONOS ADQUIRIDOS</span>
               </div>
            </div>
            <div className="radar-progress-container">
               <div className="radar-fill" style={{ width: `${porcentajeVendido}%` }}>
                  <div className="fill-light"></div>
               </div>
            </div>
            <div className="radar-footer">
               <span>PROGRESO: {porcentajeVendido.toFixed(1)}%</span>
               <span>DISPONIBLES: {1000 - totalVendidos}</span>
            </div>
          </section>

          <section className="radar-ticker-box">
            <h4 className="ticker-title">LIVE FEED: TRANSACCIONES</h4>
            <div className="ticker-scroll">
              {ultimasVentasDetalladas.map((v, i) => (
                <div key={i} className="ticker-card anim-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="t-card-header">
                     <span className="t-buyer">✓ {v.comprador}</span>
                     <span className="t-timestamp">
                       {new Date(v.fecha).toLocaleDateString('es-AR', {day:'2-digit', month:'2-digit'})} | {new Date(v.fecha).toLocaleTimeString('es-AR', {hour:'2-digit', minute:'2-digit'})}
                     </span>
                  </div>
                  <div className="t-card-body">
                     <p className="t-desc">Adquirió el <span className="t-highlight">BONO #{v.id_bono}</span></p>
                     <p className="t-academy">GESTIÓN: <strong>{v.academia}</strong></p>
                  </div>
                  <div className="t-status-bar"><div className="t-led-mini"></div>BONO VALIDADO</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- ACTO 3: VALOR E INCENTIVOS (DISEÑO HARDWARE) --- */}
        <div className="bono-info-blocks">
           <article className="info-block-item highlight">
              <span className="block-label">VALOR UNITARIO</span>
              <h3 className="block-val">$15.000</h3>
              <div className="block-deco-line"></div>
           </article>
           <article className="info-block-item">
              <span className="block-label">META DELEGACIÓN</span>
              <p className="block-p">Vendiendo <strong>32 números</strong> cubrís tu <strong>Pack Experiencia</strong> total.</p>
           </article>
           <article className="info-block-item">
              <span className="block-label">INVERSIÓN</span>
              <p className="block-p">Sin inversión propia. Premios y logística a cargo de la productora.</p>
           </article>
        </div>

        {/* --- ACTO 4: TABLA DE PREMIOS (GALA EDITION) --- */}
        <section className="bono-prizes-titan">
           <div className="section-head-v42">
              <div className="h-line"></div>
              <h3>LISTADO OFICIAL DE PREMIOS</h3>
           </div>

           <div className="titan-prizes-grid">
              <div className="titan-prize-card master">
                 <span className="master-rank">PRIMER PREMIO</span>
                 <h2 className="master-amount">$5.000.000</h2>
                 <p className="master-desc">ORDEN DE PAGO EN EFECTIVO</p>
                 <div className="master-shine"></div>
              </div>
              
              <div className="titan-prize-subgrid">
                 <div className="sub-prize-card"><span>02</span> <p>Horno Eléctrico</p></div>
                 <div className="sub-prize-card"><span>03</span> <p>Cafetera Eléctrica</p></div>
                 <div className="sub-prize-card"><span>04</span> <p>Minipimer Pro</p></div>
                 <div className="sub-prize-card"><span>05</span> <p>Licuadora Premium</p></div>
                 <div className="sub-prize-card"><span>06</span> <p>Pava Eléctrica</p></div>
                 <div className="sub-prize-card"><span>07</span> <p>Estadía para 2/p</p>
                                                                  <small>Villa Carlos Paz - Temporada Baja</small></div>
                 <div className="sub-prize-card"><span>08</span> <p>Artesanía Regional</p></div>
              </div>
           </div>
        </section>

        {/* --- ACTO 5: RANKING FEDERAL --- */}
<section className="bono-leaderboard-v42">
  <div className="section-head-v42">
    <div className="h-line"></div>
    <h3>RANKING FEDERAL DE ACADEMIAS</h3>
  </div>
  
  <div className="leaderboard-wrap">
    {rankingDelegados.map((d, i) => (
      <div key={i} className="leader-row anim-slide-in" style={{ animationDelay: `${i * 0.15}s` }}>
        <div className="leader-pos-hex">
           <span>0{i + 1}</span>
        </div>
        
<div className="leader-info">
  <div className="leader-identity">
    <span className="leader-name">{d.nombre}</span>
    <span className="leader-academy-tag">{d.academia}</span>
  </div>
  <div className="leader-bar-container">
    <div 
      className="leader-bar-fill" 
      /* AHORA: Divide las ventas por su cupo real del Excel */
      style={{ width: `${(d.cant / d.totalCupo) * 100}%` }}
    >
      <div className="bar-glow"></div>
    </div>
  </div>
</div>
        
        <div className="leader-stats-badge">
           <span className="l-num">{d.cant}</span>
           <span className="l-txt">VENTAS</span>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* --- ACTO 6: BENEFICIOS Y DISTRIBUCIÓN --- */ }
        <div className="bono-final-grid">
           <section className="benefits-card-v42">
              <h4>BENEFICIOS DELEGACIÓN GANADORA</h4>
              <ul>
                 <li>✓ 2 Bonificaciones para Profesores (Liberados).</li>
                 <li>✓ 20 Integrantes con 10% OFF en próximo Festival.</li>
              </ul>
           </section>

           <section className="distro-card-v42">
              <h4>DISTRIBUCIÓN TÉCNICA</h4>
              <div className="distro-rows">
                 <div className="d-row"><span>VENDEDOR (50%)</span> <strong>$7.500</strong></div>
                 <div className="d-row"><span>DELEGADO (15%)</span> <strong>$2.250</strong></div>
                 <div className="d-row"><span>PRODUCTORA (35%)</span> <strong>$5.250</strong></div>
              </div>
           </section>
        </div>

      </main>
    </div>
  );
}