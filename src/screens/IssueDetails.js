import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import '../style/AllIssuesPage.css';
import { FaPaperclip } from 'react-icons/fa';
import brokenPrinter from '../components/IconsForStaff/brokenPrinter.jpg';

const Popup = ({ title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancel" }) => (
    <div className="popup">
        <div className="popup-content">
            <h2 style={{ color: 'green', fontWeight: 'bold' }}>{title}</h2>
            <p>{message}</p>
            <button className="popup-close" onClick={onConfirm}>
                {confirmText}
            </button>
            {onCancel && (
                <button className="popup-close" onClick={onCancel}>
                    {cancelText}
                </button>
            )}
        </div>
    </div>
);

export default function IssueDetails({ issue, onClose, onOpenChat }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
    const [isResolvedPopupOpen, setIsResolvedPopupOpen] = useState(false);
    const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const handleResolved = () => {
        console.log('Resolved button clicked');
        setIsResolvedPopupOpen(true);
    };

    const handleUnresolved = () => {
        console.log('Unresolved button clicked');
        setIsFeedbackPopupOpen(true);
    };

    const handleResolvedPopupClose = () => {
        console.log('Resolved popup closed');
        setIsResolvedPopupOpen(false);
        setIsRatingPopupOpen(true); // Open the rating popup after confirming resolved
    };

    const handleUnresolvedPopupClose = () => {
        console.log('Unresolved feedback popup closed');
        setIsFeedbackPopupOpen(false); // Close the feedback popup
    };

    const handleSubmitRating = () => {
        console.log(`Rating: ${rating}, Feedback: ${feedback}`);
        setIsRatingPopupOpen(false); // Close the rating popup
        setRating(0); // Reset rating
        setFeedback(''); // Reset feedback
    };

    return (
        <main className="issue-details">
            <h2>{issue.title}</h2>
            <div className="issue-info">
                <div className="info-group">
                    <p>Department - {issue.department}</p>
                    <p>Building 18 - 2nd Floor</p>
                </div>
                <div className="info-group">
                    <p>Priority: <span className={`priority ${issue.priority.toLowerCase()}`}>{issue.priority}</span></p>
                </div>
                <div className="info-group">
                    <button className="live-chat-button" onClick={onOpenChat}>Live Chat</button>
                    <p>{issue.date}</p>
                </div>
            </div>
            <div className="description-section">
                <h3><FileText /> Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
            </div>

            {/* Attachment Section */}
            <div className="attachment-section">
                <FaPaperclip size={24} className="attachment-icon" />
                <span className="attachment-text">Attachments</span>
                <div className="attachment-box" onClick={openModal}>
                    Click here to open the attachment
                </div>
                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <img src={brokenPrinter} alt="Detailed view of the issue" className="modal-image" />
                    </div>
                )}
            </div>
            
            <div className="close-button-container">
                <button className="c-button" onClick={onClose}>Close</button>
                {/* Conditionally render buttons based on the issue's resolved status */}
                {issue.status.toLowerCase() === 'resolved' && (
                    <>
                        <button className="Unresolved-button" onClick={handleUnresolved}>Unresolved</button>
                        <button className="Resolved-button" onClick={handleResolved}>Resolved</button>
                    </>
                )}
            </div>

            {/* Resolved Popup */}
            {isResolvedPopupOpen && (
                <Popup 
                    title="Confirmed!" 
                    message="Thank you for your update."
                    onConfirm={handleResolvedPopupClose}
                />
            )}

            {/* Feedback Popup */}
            {isFeedbackPopupOpen && (
                <Popup 
                    title="Feedback Required"
                    message="Please provide feedback for reopening this issue."
                    onConfirm={handleUnresolvedPopupClose} // Close the popup
                    onCancel={() => setIsFeedbackPopupOpen(false)} // Close without confirmation
                    confirmText="Submit Feedback"
                />
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
        </main>
    );
}
