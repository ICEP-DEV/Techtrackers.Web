import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import './StaffStyle/AllIssuesPage.css';
import { FaPaperclip } from 'react-icons/fa';
//import brokenPrinter from '../Staff/IconsForStaff/brokenPrinter.jpg';

export default function IssueDetails({ issue, onClose, onOpenChat }) {
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
        <div className="attachments-section">
          {/* Removed Paperclip */}
          <div className="attachment">
            <img src="/placeholder.svg?height=50&width=50" alt="Attachment thumbnail" />
            <span>image.jpeg</span>
            <span>12 KB</span>
          </div>
        </div>
        <div className="close-button">
          <button className="c-button" onClick={onClose}>Close</button>
          <button className="Unresolved-button">Unresolved</button>
          <button className="Resolved-button">Resolved</button>
        </div>
      </main>
    );
}
