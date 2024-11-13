// Table.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailView from './DetailView';
import styles from './HOD styles/Table.module.css';
import './HOD styles/AllIssues.css';
import { Clock } from "lucide-react";

const IssueTableHeader = () => (
  <div className={styles.headerContainer}>
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <i className="fa-regular fa-clock" aria-hidden="true" aria-label="Clock Icon"></i>
        <div className={styles.headerText}>
          <h2>My Issues</h2>
        </div>
      </div>
    </header>
  </div>
);

const Table = () => {
  // Constant Issues Data (Could be from useIssues hook or static data)
  const issues = [
    {
      issueId: "IT-P2-1234",
      name: "Excellent Nambane",
      title: "Internal Issue",
      description: "System error affecting multiple internal applications.",
      date: "19/08/2024",
      department: "IT Department",
      priority: "Medium",
      assigned: "None",
      status: "Pending",
      attachments: [
        { filename: "error_screenshot.png", imageUrl: "/path/to/error_screenshot.png" },
      ],
    },
    {
      issueId: "HR-P3-1235",
      name: "Themba Zwane",
      title: "Network Issue",
      description: "Connectivity issues impacting access to shared resources.",
      date: "15/08/2024",
      department: "Human Resources (HR)",
      priority: "High",
      assigned: "Abel Makamu",
      status: "Ongoing",
      attachments: [
        { filename: "network_diagram.jpg", imageUrl: "/path/to/network_diagram.jpg" },
      ],
    },
    {
      issueId: "HR-P1-1236",
      name: "Sara Smith",
      title: "Printer Not Working",
      description: "Office printer unable to print, likely due to a hardware issue.",
      date: "22/07/2024",
      department: "Human Resources (HR)",
      priority: "Low",
      assigned: "Matete Sekgotodi",
      status: "On Hold",
      attachments: [
        { filename: "printer_issue.jpg", imageUrl: "/path/to/printer_issue.jpg" },
      ],
    },
    {
      issueId: "HR-P1-1237",
      name: "John Doe",
      title: "Forgot Password",
      description: "User locked out of account due to forgotten password.",
      date: "15/07/2024",
      department: "Human Resources (HR)",
      priority: "High",
      assigned: "Hamilton Masipa",
      status: "Done",
      attachments: [
        { filename: "password_reset_email.png", imageUrl: "/path/to/password_reset_email.png" },
      ],
    },
  ];

  const [selectedLog, setSelectedLog] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'rgb(174, 0, 0)';
      case 'Ongoing':
        return '#bfa829';
      case 'Done':
        return 'green';
      case 'On Hold':
        return '#0a4d4d';
      default:
        return 'transparent';
    }
  };

  const handleViewClick = (issue) => {
    setSelectedLog(issue);
  };

  const handleBackToList = () => {
    setSelectedLog(null);
  };

  if (selectedLog) {
    return <DetailView log={selectedLog} onBack={handleBackToList} />;
  }

  return (
    <div className="HOD-main-content">
      <h2><Clock size={40} />ALL ISSUES</h2>
      <div className={styles.tableContainer}>
        <table className={styles.issueTable} aria-label="Issues Table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Name</th>
              <th>Issue Title</th>
              <th>Assigned to</th>
              <th>Date Reported</th>
              <th>Department</th>
              <th>Priority Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.length > 0 ? (
              issues.map((issue) => (
                <tr key={issue.issueId}>
                  <td>{issue.issueId}</td>
                  <td>{issue.name}</td>
                  <td>{issue.title}</td>
                  <td>{issue.assigned}</td>
                  <td>{issue.date}</td>
                  <td>{issue.department}</td>
                  <td>{issue.priority}</td>
                  <td>
                    <span
                      className={styles.status}
                      style={{ color: getStatusColor(issue.status) }}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewClick(issue)}
                      aria-label={`View details for issue ${issue.issueId}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No issues available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      issueId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      assigned: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
};

export default Table;
