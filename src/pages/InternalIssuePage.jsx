import React, { useState } from 'react';
import { FaPaperclip, FaComments } from 'react-icons/fa'; // Import chat icon
import { useNavigate } from 'react-router-dom';
import '../style/style.css'; // Import the main CSS file

const IssueDetailsPage = ({ onClose }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat modal
    const [chatMessages, setChatMessages] = useState([]); // State to hold chat messages
    const [currentMessage, setCurrentMessage] = useState(''); // State to hold the current message being typed

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleClose = () => {
        navigate('/all-issues');
    };

    const openChat = () => {
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    // Handle sending chat messages
    const handleSendMessage = () => {
        if (currentMessage.trim() !== '') {
            // Add new message to chat messages array
            setChatMessages([...chatMessages, { user: 'You', text: currentMessage }]);
            setCurrentMessage(''); // Clear input field after sending
        }
    };

    return (
        <div className="issue-details-container">
            <h1 className="issue-title">Internal Issue: Server Downtime in Data Center</h1>

            {/* Department Info, Priority, Issue Date, and Chat Button Container */}
            <div className="details-header">
                <p className="department-info">Department - Human Resource</p>
                <div className="priority-info">
                    <strong>Priority: MEDIUM</strong>
                </div>
                <p className="issue-date">
                    Date: 19/08/2024
                    {/* Chat Button */}
                    <FaComments
                        size={20}
                        className="chat-icon"
                        onClick={openChat} // Open chat modal on click
                        style={{ marginLeft: '10px', cursor: 'pointer' }} // Styling
                    />
                </p>
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
                <FaPaperclip
                    size={24}
                    className="attachment-icon"
                />
                <span className="attachment-text">Attachment</span>
                {/* Clickable box to open the attachment */}
                <div
                    className="attachment-box"
                    onClick={openModal} // Open modal on box click
                >
                    Click here to open the attachment
                </div>
                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <img
                            src="path/to/full-image.jpg"
                            alt="Issue Full"
                            className="modal-image"
                        />
                    </div>
                )}
            </div>

            {/* Close Button */}
            <div className="close-button-container">
                <button className="close-button" onClick={handleClose}>
                    Close
                </button>
            </div>

            {/* Chat Modal */}
            {isChatOpen && (
                <div className="chat-modal">
                    <div className="chat-modal-content">
                        <h3>Chat</h3>
                        <div className="chat-messages">
                            {/* Display chat message history */}
                            {chatMessages.map((msg, index) => (
                                <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
                            ))}
                        </div>
                        <textarea
                            className="chat-input"
                            placeholder="Type your message..."
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)} // Update message input state
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            Send
                        </button>
                        <button className="close-chat-button" onClick={closeChat}>
                            Close Chat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IssueDetailsPage;
