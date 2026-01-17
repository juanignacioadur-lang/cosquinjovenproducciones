import React from "react";
import ReactDOM from "react-dom";
import "./ModalPortal.css";
import "/src/UIElements.css";

export default function ModalPortal({ isOpen, type, data, onClose, onConfirm, modalMode }) {
  if (!isOpen) return null;

  // Blindaje: si data es null, usamos un objeto vacío para evitar pantalla negra
  const safeData = data || {};

  const renderContent = () => {
    switch (type) {
      case "editar":
        return (
          <>
            <h3 className="modal-title-tech">EDITAR REGISTRO: <span>BONO #{safeData.id_bono}</span></h3>
            <div className="modal-form-v33">
              <div className="mf-group"><label>NOMBRE COMPRADOR</label><input type="text" defaultValue={safeData.comprador} id="edit_name" /></div>
              <div className="mf-group"><label>DNI COMPRADOR</label><input type="number" defaultValue={safeData.dni_comp} id="edit_dni" /></div>
              <div className="mf-group"><label>TELÉFONO</label><input type="tel" defaultValue={safeData.tel} id="edit_tel" /></div>
              <div className="modal-footer-btns">
                <button className="btn-ui outline" onClick={onClose}>CANCELAR</button>
                <button className="btn-ui primary" onClick={() => onConfirm({
                  comprador_nombre: document.getElementById('edit_name').value,
                  comprador_dni: document.getElementById('edit_dni').value,
                  telefono: document.getElementById('edit_tel').value
                })}>CONFIRMAR</button>
              </div>
            </div>
          </>
        );

      case "usuario":
        return (
          <>
            <h3 className="modal-title-tech">
              {modalMode === 'add' ? 'REGISTRAR NUEVO' : 'EDITAR'} <span>DELEGADO</span>
            </h3>
            <div className="modal-form-v33">
              <div className="mf-row">
                <div className="mf-group">
                  <label>DNI (USUARIO)</label>
                  <input type="number" defaultValue={safeData.dni} id="user_dni" disabled={modalMode === 'edit'} />
                </div>
                <div className="mf-group">
                  <label>CONTRASEÑA</label>
                  <input type="text" placeholder="DDMMAAAA" defaultValue={safeData.password} id="user_pass" />
                </div>
              </div>
              <div className="mf-group">
                <label>NOMBRE COMPRETO</label>
                <input type="text" defaultValue={safeData.nombre} id="user_name" />
              </div>
              <div className="mf-row">
                <div className="mf-group">
                  <label>ACADEMIA</label>
                  <input type="text" defaultValue={safeData.academia} id="user_academy" />
                </div>
                <div className="mf-group">
                  <label>PROVINCIA</label>
                  <input type="text" defaultValue={safeData.provincia} id="user_prov" />
                </div>
              </div>
              <div className="modal-footer-btns">
                <button className="btn-ui outline" onClick={onClose}>CANCELAR</button>
                <button className="btn-ui primary" onClick={() => onConfirm({
                  dni: document.getElementById('user_dni').value,
                  password: document.getElementById('user_pass').value,
                  nombre: document.getElementById('user_name').value,
                  academia: document.getElementById('user_academy').value,
                  provincia: document.getElementById('user_prov').value
                })}>GUARDAR</button>
              </div>
            </div>
          </>
        );
      default: return null;
    }
  };

  const modalContent = (
    <div className="master-modal-overlay" onClick={onClose}>
      <div className="master-modal-card anim-impact" onClick={(e) => e.stopPropagation()}>
        <button className="master-modal-close-x" onClick={onClose}>&times;</button>
        {renderContent()}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}