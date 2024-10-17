// ConfirmationModal.js
import React from 'react';
import './styles/confirmationModal.css'; // Ensure this path is correct based on your file structure

const ConfirmationModal = ({ showModal, onClose, onConfirm }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-close" onClick={onClose}>
                    &times; {/* Close icon */}
                </div>
                <div className="modal-message">
                    Are you sure you want to remove this technician?
                </div>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Yes</button>
                    <button className="modal-button cancel" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
