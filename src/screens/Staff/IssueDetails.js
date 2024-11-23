import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import './StaffStyle/IssueDetails.css';
import { FaPaperclip } from 'react-icons/fa';
import brokenPrinter from '../Staff/IconsForStaff/brokenPrinter.jpg';

export default function IssueDetails({ issue, onClose, onOpenChat }) {
    const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
    const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false); // State for error popup
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);

    const handleAttachmentClick = () => {
        setIsAttachmentOpen(true);
    };

    const closeAttachment = () => {
        setIsAttachmentOpen(false);
    };

    const handleUnresolvedClick = () => {
        setIsFeedbackPopupOpen(true);
    };

    const closeFeedbackPopup = () => {
        setIsFeedbackPopupOpen(false);
    };

    const handleResolvedClick = () => {
        setIsConfirmationPopupOpen(true);
    };

    const closeConfirmationPopup = () => {
        setIsConfirmationPopupOpen(false);
        setIsRatingPopupOpen(true);
    };

    const handleRating = (value) => {
        setRating(value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitRating = async() => {
        if (rating === 0) {
            setIsErrorPopupOpen(true);
            return;
        }
    
        const feedbackData = {
            Log_ID: issue.logId,
            User_ID: issue.userId,
            Rating: rating,
            Comment: comment
        };
    
        try {
            const response = await fetch('https://localhost:44328/api/Feedback/SubmitFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });
    
            if (response.ok) {
                console.log("Feedback submitted successfully");
                setIsRatingPopupOpen(false);
            } else {
                console.error("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    const closeErrorPopup = () => {
        setIsErrorPopupOpen(false); // Close error popup
    };

    return (
        <main className="issue-deta">
            <h2>{issue.title}</h2>
            <div className="issue-in-fo">
                <div className="in-fo-group">
                    <p>Department - {issue.department}</p>
                    <p>{issue.Location}</p>
                </div>
                <div className="in-fo-group">
                    <p>Priority: <span className={`prioritx ${issue.priority.toLowerCase()}`}>{issue.priority}</span></p>
                </div>
                <div className="in-fo-group">
                    <button className="live-chat-btn" onClick={onOpenChat}>Live Chat</button>
                    <p>{issue.date}</p>
                </div>
            </div>
            <div className="descrip-section">
    <h3><FileText /> Description</h3>
    <p>{issue.description}</p>
</div>

            <div className="attach-section">
                <h3><FaPaperclip /> Attachments</h3>
                <div className="attach">
                    <a href="#" onClick={handleAttachmentClick}>View attachment (image.jpeg, 12 KB)</a>
                </div>
            </div>

            {isAttachmentOpen && (
                <div className="attachment-modal">
                    <div className="attachment-modal-content">
                        <span className="close-modal" onClick={closeAttachment}>&times;</span>
                        <img src={issue.AttachmentUrl} alt="Attachment" className="attachment-image" />
                    </div>
                </div>
            )}

            <div className="close-btn">
                <button className="c-btn" onClick={onClose}>Close</button>
                {issue.status === 'Resolved' && (
                    <>
                        <button className="Unresolved-btn" onClick={handleUnresolvedClick}>Unresolved</button>
                        <button className="Resolved-btn" onClick={handleResolvedClick}>Resolved</button>
                    </>
                )}
            </div>

            {isFeedbackPopupOpen && (
                <div className="feedback-popup">
                    <div className="feedback-popup-content">
                        <p>Your feedback has been noted, and the issue has been reopened for further investigation.</p>
                        <button className="ok-btn" onClick={closeFeedbackPopup}>OK</button>
                    </div>
                </div>
            )}

            {isConfirmationPopupOpen && (
                <div className="confirmation-popup">
                    <div className="confirmation-popup-content">
                        <h3 style={{ color: 'green' }}>CONFIRM!!</h3>
                        <p>Thank You, The issue has been marked resolved.</p>
                        <button className="ok-btn" onClick={closeConfirmationPopup}>OK</button>
                    </div>
                </div>
            )}

            {isRatingPopupOpen && (
                <div className="rating-popup">
                    <div className="rating-popup-content">
                        <h3 style={{ color: 'green' }}>Rate your experience with the technician?</h3>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '24px',
                                        color: star <= rating ? 'gold' : 'gray' // Yellow for filled stars
                                    }}
                                >
                                    {star <= rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Additional Comment [optional]"
                            value={comment}
                            onChange={handleCommentChange}
                            rows={4}
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                        <button className="submit-rating-btn" onClick={handleSubmitRating}>Submit</button>
                        <button className="rating-popup-close" onClick={() => setIsRatingPopupOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isErrorPopupOpen && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <h2 style={{ color: 'red' }}>Error</h2>
                        <p>Please select a rating before submitting.</p>
                        <button className="ok-btn" onClick={closeErrorPopup}>OK</button>
                    </div>
                </div>
            )}
        </main>
    );
}