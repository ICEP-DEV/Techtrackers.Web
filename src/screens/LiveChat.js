import React, { useState } from 'react'
import { Paperclip, Send } from 'lucide-react';
import '../style/AllIssuesPage.css';

export default function LiveChat({ onClose }) {
  const [messages, setMessages] = useState([
    { type: 'received', text: 'Hello, how can I help you?' },
    { type: 'sent', text: 'I need assistance with an issue.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { type: 'sent', text: newMessage }]);
      setNewMessage('');
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
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <button type="button" className="attach-button">
            <Paperclip size={20} />
          </button>
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
