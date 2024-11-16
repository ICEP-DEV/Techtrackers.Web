import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../SidebarCSS/DetailView.module.css';

const TechnicianDetailView = ({ technician, onBack, onRemove }) => { // Added onRemove prop
  const [formData, setFormData] = useState(technician);
  const [isVisible, setIsVisible] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalType('update');
    setShowModal(true);
  };

  const confirmUpdate = () => {
    console.log('Updated Technician Info:', formData);
    toast.success('Technician information updated successfully!');

    // Delay the navigation back by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      setShowModal(false);
      onBack();
    }, 2000);
  };

  const handleRemove = () => {
    setModalType('remove');
    setShowModal(true);
  };

  const confirmRemove = () => {
    console.log(`Technician ${technician.technicianId} removed`);
    toast.success('Technician removed successfully!');

    // Use the onRemove function passed as a prop
    onRemove(technician.technicianId); // Call onRemove with the technician ID

    // Delay the visibility update by 2 seconds (2000 milliseconds)
    setTimeout(() => {
      setIsRemoved(true);
      setIsVisible(false);
      setShowModal(false);
      onBack();
    }, 2000);
  };

  const cancelAction = () => setShowModal(false); // Close modal without action

  if (isRemoved) {
    return <div className={styles.removedMessage}>Technician has been successfully removed.</div>;
  }

  if (!isVisible) return null;

  return (
    <div className={styles.detailContainer}>
      <h2>Edit Technician Information</h2>
      <form onSubmit={handleSubmit} className={styles.detailForm}>
        <div className={styles.leftColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="specialization">Specialization:</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact:</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fromTime">From Time:</label>
            <input type="time" name="fromTime" value={formData.fromTime} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="toTime">To Time:</label>
            <input type="time" name="toTime" value={formData.toTime} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button type="submit" className={styles.submitButton}>Update Technician</button>
          <button type="button" onClick={handleRemove} className={styles.removeButton}>Remove Technician</button>
          <button type="button" onClick={onBack} className={styles.backButton}>Back</button> {/* Back Button */}
        </div>
      </form>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <p>
              {modalType === 'update'
                ? 'Are you sure you want to update this technician information?'
                : 'Are you sure you want to remove this technician?'}
            </p>
            <div className={styles.buttonGroup}>
              <button
                onClick={modalType === 'update' ? confirmUpdate : confirmRemove}
                className={styles.confirmButton}
              >
                Yes
              </button>
              <button onClick={cancelAction} className={styles.cancelButton}>No</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

TechnicianDetailView.propTypes = {
  technician: PropTypes.shape({
    technicianId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    fromTime: PropTypes.string.isRequired,
    toTime: PropTypes.string.isRequired,
    activeIssues: PropTypes.number.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired, // Add this line to define onRemove prop type
};

export default TechnicianDetailView;
