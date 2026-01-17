import React from "react";
import ReactDOM from "react-dom";
import "./ModalBonoEditor.css";

export default function ModalBonoEditor({ isOpen, data, onClose, onConfirm }) {
  if (!isOpen || !data) return null;

  const modalContent = (
    <div className="be-overlay-v72" onClick={onClose}>
      <div className="be-card-v72 anim-be-impact" onClick={(e) => e.stopPropagation()}>
        <button className="be-close-x-v72" onClick={onClose}>&times;</button>
        
        <h3 className="be-title-v72">
          EDITAR REGISTRO <br />
          <span>BONO #{data.id_bono}</span>
        </h3>
        
        <div className="be-form-v72">
          <div className="be-input-group-v72">
            <label>NOMBRE COMPRADOR</label>
            <input type="text" defaultValue={data.comprador} id="be_name_val" />
          </div>
          
          <div className="be-input-group-v72">
            <label>DNI COMPRADOR</label>
            <input type="number" defaultValue={data.dni_comp} id="be_dni_val" />
          </div>

          <div className="be-input-group-v72">
            <label>TELÉFONO</label>
            <input type="tel" defaultValue={data.tel} id="be_tel_val" />
          </div>

          <div className="be-actions-v72">
  <button className="btn-modal-tech cancel" onClick={onClose}>
    CANCELAR
  </button>
  <button 
    className="btn-modal-tech confirm" 
    onClick={() => onConfirm({
      comprador_nombre: document.getElementById('be_name_val').value,
      comprador_dni: document.getElementById('be_dni_val').value,
      telefono: document.getElementById('be_tel_val').value
    })}
  >
    GUARDAR
  </button>
</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}