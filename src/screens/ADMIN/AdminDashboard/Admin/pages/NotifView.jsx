import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../SidebarCSS/NotifView.module.css";
import profIcon from "../adminIcons/profile.png";

const NotifView = () => {
  const navigate = useNavigate();
  const { state: notification } = useLocation(); // Retrieve issue data from route state

  // Handle the Back button click
  const handleBack = () => {
    navigate(-1); // Redirect back to the previous page
  };

  // Check if the issue data is available
  if (!notification) {
    return <div className={styles.error}>Notification data not found.</div>;
  }

  // Determine the color of the status value
  const statusColor =
    notification.status === "RESOLVED"
      ? "green"
      : notification.status === "IN PROGRESS"
      ? "goldenrod"
      : "black"; // Default color

  return (
    <div className={styles.issueDetailsContainer}>
      {/* Issue Title */}
      <div className={styles.issue}>
        <h2>
          Status:{" "}
          <span style={{ color: statusColor }}>{notification.status}</span>
        </h2>
      </div>

      {/* Header Section */}
      <div className={styles.issueHeader}>
        {/* Requestor Info */}
        <div className={styles.issueRequestor}>
          <p>Requested By:</p>
          <div className={styles.profile}>
            <img src={profIcon} width="50" height="50" alt="Profile Icon" />
            <p className={styles.name}>{notification.user}</p>
          </div>
          <div className={styles.issueInfo}>
            <p className={styles.prio}>User ID: {notification.issueId}</p>
            <p className={styles.issueDate}>Time: {notification.time}</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className={styles.actions}>
        <button className={styles.closeButton} onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default NotifView;
