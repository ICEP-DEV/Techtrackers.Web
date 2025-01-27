import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/NotificationPage.module.css"; // Assuming you have a CSS module for styling
import AvatarIcon from "../adminIcons/avatarIcon.png";

const InProgressIssuesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inProgressData = location.state?.data || []; // Access data passed to this page

  // Filter issues by status
  const filterIssuesByStatus = (statuses) =>
    inProgressData.filter((issue) => statuses.includes(issue.status));

  // Pending issues (only "PENDING")
  const pendingIssues = filterIssuesByStatus(["PENDING"]);

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Pending Issues</h2>

      {/* Display Pending Issues */}
      {pendingIssues.length === 0 ? (
        <div className={styles.noIssues}>
          <strong>No pending issues found.</strong>
        </div>
      ) : (
        pendingIssues.map((issue) => (
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

      {/* View All Button */}
      <div className={styles.IssueButton}>
        <button
          className={styles.viewAllButton}
          onClick={() => {
            const activeIssues = filterIssuesByStatus(["PENDING", "ESCALATED", "ONHOLD"]);
            navigate("/admindashboard/viewAllLogs", { state: { data: activeIssues } });
          }}
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default InProgressIssuesPage;
