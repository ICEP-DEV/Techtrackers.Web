import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../style/style.css'; // Import the main CSS file
import brokenPrinter from '../components/IconsForStaff/brokenPrinter.jpg';

const PrinterNotWorking = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
    const [isResolvedPopupOpen, setIsResolvedPopupOpen] = useState(false);
    const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleClose = () => {
        navigate('/all-issues');
    };

    const handleResolved = () => {
        // Show the resolved popup
        setIsResolvedPopupOpen(true);
    };

    const handleUnresolved = () => {
        // Show the feedback popup
        setIsFeedbackPopupOpen(true);
    };

    const handleFeedbackPopupClose = () => {
        setIsFeedbackPopupOpen(false);
    };

    const handleResolvedPopupClose = () => {
        setIsResolvedPopupOpen(false);
        setIsRatingPopupOpen(true); // Open the rating popup
    };

    const handleSubmitRating = () => {
        // Handle submission logic, e.g., send the rating and feedback to the server
        console.log(`Rating: ${rating}, Feedback: ${feedback}`);
        setIsRatingPopupOpen(false); // Close the rating popup
        setRating(0); // Reset rating
        setFeedback(''); // Reset feedback
    };

    return (
        <div className="issue-details-container">
            <h1 className="issue-title">Printer not working</h1>

            {/* Department Info, Priority, and Issue Date Container */}
            <div className="details-header">
                <div className="department-info">
                    <p className="department-info">Department - Human Resources (HR)</p>
                    <p className="department-info">Building 18 - 2nd Floor</p>
                </div>
                <div className="priority-info">
                    <strong>Priority: LOW</strong>
                </div>
                <p className="issue-date">Date: 22/07/2024</p>
            </div>

            <strong>Description</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            {/* Attachment Icon */}
            <div className="attachment-section">
                <FaPaperclip size={24} className="attachment-icon" />
                <span className="attachment-text">Attachments</span>
                <div className="attachment-box" onClick={openModal}>
                    Click here to open the attachment
                </div>
                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <img src={brokenPrinter} alt="Issue Full" className="modal-image" />
                    </div>
                )}
            </div>

            {/* Buttons Container */}
            <div className="buttons-container">
                <button className="resolved-button" onClick={handleResolved}>
                    Resolved
                </button>
                <button className="unresolved-button" onClick={handleUnresolved}>
                    Unresolved
                </button>
                <button className="close-button" onClick={handleClose}>
                    Close
                </button>
            </div>

            {/* Feedback Popup */}
            {isFeedbackPopupOpen && (
                <div className="feedback-popup">
                    <div className="feedback-popup-content">
                        <p>Your feedback has been noted, 
                            and the issue has been reopened for further 
                            investigation.</p>
                        <button className="feedback-popup-close" onClick={handleFeedbackPopupClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Resolved Popup */}
            {isResolvedPopupOpen && (
                <div className="resolved-popup">
                    <div className="resolved-popup-content">
                        <h2 style={{ color: 'green', fontWeight: 'bold' }}>Confirmed!</h2>
                        <p>Thank you for your update.</p>
                        <button className="resolved-popup-close" onClick={handleResolvedPopupClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Rating Popup */}
            {isRatingPopupOpen && (
                <div className="rating-popup">
                    <div className="rating-popup-content">
                    <h2 style={{ color: 'green', fontWeight: 'bold' }}>Rate your experience with the technician</h2>
                        <div className="rating-options">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span 
                                    key={star} 
                                    onClick={() => setRating(star)} 
                                    style={{ cursor: 'pointer', fontSize: '24px' }}
                                >
                                    {star <= rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <textarea 
                            placeholder="Additional Comment [optional]" 
                            rows="4" 
                            cols="50"
                            onChange={(e) => setFeedback(e.target.value)} 
                        />
                        <button className="submit-button" onClick={handleSubmitRating}>
                            Submit
                        </button>
                        <button className="rating-popup-close" onClick={() => setIsRatingPopupOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrinterNotWorking;


