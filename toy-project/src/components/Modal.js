import React from 'react';
import './css/Modal.css';

function Modal({ message, onClose, onConfirm, onCancel }) {
  const isConfirm = !!onConfirm || !!onCancel;

  return (
    <div className="modal-overlay">
      <div className="modal-single-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-text">{message}</p>

        {isConfirm ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {onConfirm && (
              <button className="modal-button" onClick={onConfirm}>확인</button>
            )}
            {onCancel && (
              <button className="modal-button cancel" onClick={onCancel}>취소</button>
            )}
          </div>
        ) : (
          <button className="modal-button" onClick={onClose}>확인</button>
        )}
      </div>
    </div>
  );
}

export default Modal;