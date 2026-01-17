import React from "react";
import ReactDOM from "react-dom";
import "./ModalUserEditor.css";

export default function ModalUserEditor({ isOpen, mode, data, onClose, onConfirm }) {
  if (!isOpen) return null;
  const safeData = data || {};

  return ReactDOM.createPortal(
    <div className="user-uefi-overlay" onClick={onClose}>
      <div className="user-uefi-card anim-impact" onClick={(e) => e.stopPropagation()}>
        <button className="uefi-close-x" onClick={onClose}>&times;</button>
        
        <h3 className="uefi-title">
          {mode === 'add' ? 'REGISTRAR NUEVO' : 'EDITAR'} <span>DELEGADO</span>
        </h3>
        
        <div className="uefi-form">
          <div className="uefi-row">
            <div className="uefi-group">
              <label>DNI (USUARIO)</label>
              <input type="number" defaultValue={safeData.dni} id="u_dni" disabled={mode === 'edit'} />
            </div>
            <div className="uefi-group">
              <label>CLAVE (CUMPLE)</label>
              <input type="text" placeholder="DDMMAAAA" defaultValue={safeData.password} id="u_pass" />
            </div>
          </div>

          <div className="uefi-group">
            <label>NOMBRE COMPRETO</label>
            <input type="text" defaultValue={safeData.nombre} id="u_name" />
          </div>

          <div className="uefi-row">
            <div className="uefi-group">
              <label>ACADEMIA</label>
              <input type="text" defaultValue={safeData.academia} id="u_academy" />
            </div>
            <div className="uefi-group">
              <label>PROVINCIA</label>
              <input type="text" defaultValue={safeData.provincia} id="u_prov" />
            </div>
          </div>

          <div className="uefi-actions">
            <button className="btn-modal-tech cancel" onClick={onClose}>ABORTAR</button>
            <button className="btn-modal-tech confirm" onClick={() => onConfirm({
              dni: document.getElementById('u_dni').value,
              password: document.getElementById('u_pass').value,
              nombre: document.getElementById('u_name').value,
              academia: document.getElementById('u_academy').value,
              provincia: document.getElementById('u_prov').value
            })}>GUARDAR NODO</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}