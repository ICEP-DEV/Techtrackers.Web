import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import './StaffStyle/AllIssuesPage.css';
import { FaPaperclip } from 'react-icons/fa';
import brokenPrinter from '../Staff/IconsForStaff/brokenPrinter.jpg';
import { useLocation } from 'react-router-dom';

const Popup = ({ title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancel" }) => (
  <div className="popup">
    <div className="popup-content">
      <h2 style={{ color: 'green', fontWeight: 'bold' }}>{title}</h2>
      <p>{message}</p>
      <button className="popup-close" onClick={onConfirm}>{confirmText}</button>
      {onCancel && (
        <button className="popup-close" onClick={onCancel}>{cancelText}</button>
      )}
    </div>
  </div>
);

export default function IssueDetails({ issue = {}, onClose, onOpenChat }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);
  const [isResolvedPopupOpen, setIsResolvedPopupOpen] = useState(false);
  const [isRatingPopupOpen, setIsRatingPopupOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  console.log("Issue Details: ", issue); // Debugging: Check if issue is passed correctly

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleResolved = () => {
    setIsResolvedPopupOpen(true);
  };

  const handleUnresolved = () => {
    setIsFeedbackPopupOpen(true);
  };

  const handleResolvedPopupClose = () => {
    setIsResolvedPopupOpen(false);
    setIsRatingPopupOpen(true);
  };

  const handleUnresolvedPopupClose = () => {
    setIsFeedbackPopupOpen(false);
  };

  const handleSubmitRating = () => {
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
    setIsRatingPopupOpen(false);
    setRating(0);
    setFeedback('');
  };

  // Add more checks to avoid calling .toLowerCase() on undefined
  const issueStatus = (issue.status && typeof issue.status === 'string') ? issue.status.toLowerCase() : '';
  const issuePriority = (issue.priority && typeof issue.priority === 'string') ? issue.priority.toLowerCase() : '';

 

  return (
    <main className="issue-details">
      
      <h2>{issue.title}</h2>
      <div className="issue-info">
        <div className="info-group">
          <p>Department - {issue.department || 'N/A'}</p>
          <p>Building 18 - 2nd Floor</p>
        </div>
        <div className="info-group">
          <p>Priority: <span className={`priority ${issuePriority}`}>{issuePriority || 'N/A'}</span></p>
        </div>
        <div className="info-group">
          <button className="live-chat-button" onClick={onOpenChat}>Live Chat</button>
          <p>{issue.date || 'N/A'}</p>
        </div>
      </div>

      <div className="description-section">
        <h3><FileText /> Description</h3>
        <p>{issue.description || 'No description available.'}</p>
      </div>

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
        {issueStatus === 'resolved' && (
          <>
            <button className="Unresolved-button" onClick={handleUnresolved}>Unresolved</button>
            <button className="Resolved-button" onClick={handleResolved}>Resolved</button>
          </>
        )}
      </div>

      {isResolvedPopupOpen && (
        <Popup 
          title="Confirmed!" 
          message="Thank you for your update."
          onConfirm={handleResolvedPopupClose}
        />
      )}

      {isFeedbackPopupOpen && (
        <Popup 
          title="Feedback Required"
          message="Please provide feedback for reopening this issue."
          onConfirm={handleUnresolvedPopupClose}
          onCancel={() => setIsFeedbackPopupOpen(false)}
          confirmText="Submit Feedback"
        />
      )}

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
              value={feedback}
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
