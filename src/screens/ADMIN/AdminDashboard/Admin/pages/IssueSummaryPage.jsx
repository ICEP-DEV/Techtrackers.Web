import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/NotificationPage.module.css"; // Use the same CSS module

const IssueSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {}; // Get the data passed from ViewAllLogs

  // Ensure data exists, sort by date in descending order (latest first)
  const sortedData = data
    ? [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  // Slice the array to show only 3 issues after sorting
  const issuesToDisplay = sortedData.slice(0, 3);

  // Get the total number of issues
  const totalIssues = data ? data.length : 0;

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        ← {/* Left arrow */}
      </button>
      <div className={styles.header}>
        <h1>Issue Summary</h1>
        <p className={styles.totalIssues}>Total Issues: {totalIssues}</p>
      </div>

      {/* Display the issues */}
      {issuesToDisplay.length > 0 ? (
        issuesToDisplay.map((row, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.issueInfo}>
              <strong>{row.user}</strong>
              <strong>{row.issueId}</strong>
              <span
                className={
                  row.status === "RESOLVED"
                    ? styles.resolved
                    : row.status === "IN PROGRESS"
                    ? styles.inProgress
                    : ""
                }
              >
                {row.status}
              </span>
            </div>
            <div className={styles.details}>
              <p>
                <strong>Description:</strong> {row.description}
              </p>
              <p>
                <strong>Date:</strong> {row.date}
              </p>
              <p>
                <strong>Priority:</strong> {row.priority}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No issues to display</p>
      )}

      {/* Buttons for Back and View All */}
      <div className={styles.IssueButton}>
        {/* View All Button */}
        <button
          className={styles.viewAllButton}
          onClick={() => navigate("/admindashboard/viewAllLogs")} // Navigate to the full issue list
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default IssueSummaryPage;
