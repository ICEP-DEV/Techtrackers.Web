import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Paperclip, MoreVertical, MessageCircle } from 'lucide-react'
import LiveChat from './LiveChat'

function DetailView({ log, onBack }) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleCloseLiveChat = () => {
    setIsChatOpen(false)
  }

  return (
    <div className="dashboard-container">
      
      <div className="detail-header">
        <h2>Internal Issue: Maintenance Request</h2>
        <div className="header-actions">
          <button className="live-chat-button" onClick={() => setIsChatOpen(true)}>
            <MessageCircle size={20} />
            <span>Live Chat</span>
          </button>
          <button className="more-button">
            <MoreVertical size={20} />More
          </button>
        </div>
      </div>
      <div className="detail-content">
        <div className="issue-info">
          <div className="issue-logged-by">
            <img src="/placeholder.svg?height=40&width=40" alt="User Avatar" className="avatar" />
            <div>
              <p>Issue Logged By:</p>
              <p className="user-name">{log.assigned}</p>
            </div>
          </div>
          <div className="issue-priority">
            <p>Priority: <span className={`priority ${log.priority.toLowerCase()}`}>{log.priority}</span></p>
          </div>
          <div className="issue-date">
            <p>{log.date}</p>
          </div>
        </div>
        <div className="issue-description">
          <h3>Description</h3>
          <p>{log.description}</p>
        </div>
        <div className="issue-attachments">
          <h3>
            <Paperclip className="icon" />
            Attachments
          </h3>
          <div className="attachment">
            <img src="/placeholder.svg?height=50&width=50" alt="Attachment thumbnail" />
            <span>image.jpeg</span>
            <span className="file-size">12 KB</span>
          </div>
        </div>
        <div className="issue-location">
          <p>Department - IT Support</p>
          <p>Building 18 - 2nd Floor</p>
        </div>
        <div className="issue-status">
          <p>Status: <span className={`status ${log.status.toLowerCase()}`}>{log.status}</span></p>
        </div>
        <div className="action-buttons">
          <button className="close-button">CLOSE</button>
          <button className="reopen-button">RE-OPEN</button>
          <button className="back-button-d" onClick={onBack}>BACK</button>
        </div>
      </div>
      {isChatOpen && <LiveChat onClose={handleCloseLiveChat} />}
    </div>
  )
}

DetailView.propTypes = {
  log: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    assigned: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
}

export default DetailView