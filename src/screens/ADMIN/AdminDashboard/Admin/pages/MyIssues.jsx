// Table.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../SidebarCSS/Table.module.css';
import PropTypes from 'prop-types';
import DetailView from './DetailView'; // Ensure this import is correct for DetailView

const IssueTableHeader = () => {
  const navigate = useNavigate();

  const handleLogIssueClick = () => {
    navigate('/admindashboard/logIssue'); // Navigate to Log Issue page
  };

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <i className="fa-regular fa-clock" aria-hidden="true"></i>
          <div className={styles.headerText}>
            <h2>My Issues</h2>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.logIssueButton} onClick={handleLogIssueClick}>
            LOG ISSUE
          </button>
        </div>
      </header>
    </div>
  );
};

const Table = ({ issues }) => {
  const [selectedLog, setSelectedLog] = useState(null); // State to store selected log

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
    setSelectedLog(issue); // Set the selected log to the clicked issue
  };

  const handleBackToList = () => {
    setSelectedLog(null); // Reset selected log to go back to the list view
  };

  if (selectedLog) {
    return <DetailView log={selectedLog} onBack={handleBackToList} />; // Render DetailView if a log is selected
  }

  return (
    <div className={styles.tableContainer}>
      <IssueTableHeader />
      <table className={styles.issueTable}>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.issueId}>
              <td>{issue.issueId}</td>
              <td>{issue.name}</td>
              <td>{issue.title}</td>
              <td>{issue.assigned}</td>
              <td>{issue.date}</td>
              <td>{issue.department}</td>
              <td>{issue.priority}</td>
              <td>
                <div
                  className={styles.status}
                  style={{
                    color: getStatusColor(issue.status),
                    display: 'inline',
                  }}
                >
                  {issue.status}
                </div>
              </td>
              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(issue)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  ).isRequired,
};

export default Table;
