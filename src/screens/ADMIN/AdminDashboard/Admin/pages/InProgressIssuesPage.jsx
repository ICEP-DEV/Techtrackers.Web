import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/NotificationPage.module.css"; // Assuming you have a CSS module for styling
import AvatarIcon from "../adminIcons/avatarIcon.png";

const InProgressIssuesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inProgressData = location.state?.data || []; // Access data passed from ViewAllLogs

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← {/* Left arrow */}
      </button>
      <h2>In Progress Issues</h2>

      {inProgressData.length === 0 ? (
        <div className={styles.issueRow}>
          <div className={styles.issueDetails}>
            <strong>No issues are currently in progress.</strong>
          </div>
        </div>
      ) : (
        inProgressData.map((issue) => (
          <div key={issue.id} className={styles.issueRow}>
            <div className={styles.userInfo}>
              <img
                src={AvatarIcon}
                alt="User Avatar"
                width="44"
                height="44"
                className={styles.userIcon}
              />
              <div className={styles.issueDetails}>
                <strong>{issue.assigned}</strong> is working on issue{" "}
                <strong>{issue.id}</strong>: {issue.description}
                <span className={styles.statusInProgress}>{issue.status}</span>
              </div>
            </div>
            <div className={styles.time}>{issue.date}</div>
          </div>
        ))
      )}

      <div className={styles.IssueButton}>
        <button
          className={styles.viewAllButton}
          onClick={() => navigate("/admindashboard/viewAllLogs")}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default InProgressIssuesPage;
