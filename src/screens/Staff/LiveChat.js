import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';
import './StaffStyle/LiveChat.css';

export default function LiveChat({ onClose }) {
  const [messages, setMessages] = useState([
    { type: 'received', text: 'Hello, how can I help you?' },
    { type: 'sent', text: 'I need assistance with an issue.' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null); // State for attachment

  const handleSendMessage = () => {
    if (newMessage.trim() || attachment) {
      const message = { type: 'sent', text: newMessage };

      // If there's an attachment, simulate uploading and store the URL
      if (attachment) {
        const attachmentUrl = URL.createObjectURL(attachment); // Simulate file upload
        message.attachment = attachmentUrl; // Store the URL
      }

      setMessages([...messages, message]);
      setNewMessage('');
      setAttachment(null); // Clear attachment after sending
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file); // Store the file
    }
  };

  return (
    <div className="live-chat-overlay">
      <div className="live-chat-window">
        <div className="chat-header">
          <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" className="user-avatar" />
          <span className="live-chat-name">John Doe</span>
          <button className="close-chat-button" onClick={onClose}>
            ✖
          </button>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
              {msg.attachment && (
                <div className="attachment">
                  <a href={msg.attachment} target="_blank" rel="noopener noreferrer">
                    View Attachment
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <label className="attach-button">
            <Paperclip size={20} />
            <input
              type="file"
              onChange={handleAttachmentChange}
              style={{ display: 'none' }} // Hide the file input
            />
          </label>
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button type="button" className="send-button" onClick={handleSendMessage}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
