import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../SidebarCSS/IssueDetailsCollaburationRequest.css";
import descIcon from "../images/descCollaborationRequest.png";
import attachIcon from "../images/attachmeCollaborationRequest.png";
import profIcon from "../images/profileCollaborationRequest.png";
import image from "../images/imageCollaborationRequest.png";
import chat from "../images/chatCollaborationRequest.png";

const IssueDetails = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { state: issue } = useLocation(); // Retrieve issue data from route state

  // Handle the Close button click
  const handleClose = () => {
    navigate("/collab"); // Navigate back to the table route
  };

  const handleChat = () => {
    navigate("/liveChat");
  };

  // Check if the issue data is available
  if (!issue) {
    return <div>Issue not found or data missing.</div>;
  }

  return (
    <div className="issue-details-container">
      {/* Issue Title */}
      <div className="issue">
        <h2>Issue Title: {issue.issueTitle}</h2>
        <a href="">
          <img src={chat} width="40" height="40" alt="Chat Icon" onClick={handleChat}/>
        </a>
      </div>

      {/* Header Section */}
      <div className="issue-header">
        {/* Requestor Info */}
        <div className="issue-requestor">
          <p>Requested By:</p>
          <div className="profile">
            <img src={profIcon} width="50" height="50" alt="Profile Icon" />
            <p className="name">{issue.name}</p>
          </div>
          <div className="issue-info">
            <p className="prio">Date: {issue.date}</p>
            <p className="issue-date">Time: {issue.time}</p>
          </div>
        </div>

        {/* Issue Date and Time */}
      </div>

      <div className="issue-details">
        <h3>
          <img src={descIcon} width="25" height="30" alt="Description Icon" />
          <h4>Description</h4>
        </h3>
        <p className="description-text">
        I'm experiencing an issue where I cannot log into the system. After entering my username and password and hitting the login button, the system either displays an error message saying "Invalid credentials" or simply reloads the login page without any notification. I've double-checked my credentials and even tried resetting my password, but the problem persists. This issue is preventing access to the main dashboard and all features tied to the user account.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="accept-button">Accept</button>
        <button className="decline-button">Decline</button>
        <button className="close-button2" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IssueDetails;
