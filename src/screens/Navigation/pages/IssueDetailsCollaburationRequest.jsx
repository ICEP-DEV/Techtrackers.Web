import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../SidebarCSS/IssueDetailsCollaburationRequest.module.css";
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
    <div className={styles.issueDetailsContainer}>
      {/* Issue Title */}
      <div className={styles.issue}>
        <h2>Issue Title: {issue.issueTitle}</h2>
        <a href="">
          <img src={chat} width="40" height="40" alt="Chat Icon" onClick={handleChat}/>
        </a>
      </div>

      {/* Header Section */}
      <div className={styles.issueHeader}>
        {/* Requestor Info */}
        <div className={styles.issueRequestor}>
          <p>Requested By:</p>
          <div className={styles.profile}>
            <img src={profIcon} width="50" height="50" alt="Profile Icon" />
            <p className={styles.name}>{issue.name}</p>
          </div>
          <div className={styles.issueInfo}>
            <p className={styles.prio}>Date: {issue.date}</p>
            <p className={styles.issueDate}>Time: {issue.time}</p>
          </div>
        </div>

        {/* Issue Date and Time */}
      </div>

      <div className={styles.issueDetails}>
        <h3>
          <img src={descIcon} width="25" height="30" alt="Description Icon" />
          <h4>Description</h4>
        </h3>
        <p className={styles.descriptionText}>
        I'm experiencing an issue where I cannot log into the system. After entering my username and password and hitting the login button, the system either displays an error message saying "Invalid credentials" or simply reloads the login page without any notification. I've double-checked my credentials and even tried resetting my password, but the problem persists. This issue is preventing access to the main dashboard and all features tied to the user account.
        </p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.acceptButton}>Accept</button>
        <button className={styles.declineButton}>Decline</button>
        <button className={styles.closeButton2} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IssueDetails;
