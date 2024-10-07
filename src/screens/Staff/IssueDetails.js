import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import './StaffStyle/IssueDetails.css';
import { FaPaperclip } from 'react-icons/fa';
import brokenPrinter from '../Staff/IconsForStaff/brokenPrinter.jpg';

export default function IssueDetails({ issue, onClose, onOpenChat }) {
    return (
      <main className="issue-deta">
        <h2>{issue.title}</h2>
        <div className="issue-in-fo">
          <div className="in-fo-group">
            <p>Department - {issue.department}</p>
            <p>Building 18 - 2nd Floor</p>
          </div>
          <div className="in-fo-group">
            <p>Priority: <span className={`prioritx ${issue.priority.toLowerCase()}`}>{issue.priority}</span></p>
          </div>
          <div className="in-fo-group">
            {/* Live Chat button with onClick to open chat */}
            <button className="live-chat-btn" onClick={onOpenChat}>Live Chat</button>
            <p>{issue.date}</p>
          </div>
        </div>
        <div className="descrip-section">
          <h3><FileText /> Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
        </div>
        <div className="attach-section">
          <h3><FaPaperclip /> Attachments</h3>
          <div className="attach">
            <img src="/placeholder.svg?height=50&width=50" alt="Attachment thumbnail" />
            <span>image.jpeg</span>
            <span>12 KB</span>
          </div>
        </div>
        <div className="close-btn">
          <button className="c-btn" onClick={onClose}>Close</button>
          <button className="Unresolved-btn">Unresolved</button>
          <button className="Resolved-btn">Resolved</button>
        </div>
      </main>

    )
}