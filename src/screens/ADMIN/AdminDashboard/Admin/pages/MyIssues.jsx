import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../SidebarCSS/Table.module.css';
import PropTypes from 'prop-types';
import DetailView from './DetailView'; // Ensure this import is correct for DetailView

const IssueTableHeader = () => {
  const navigate = useNavigate();

  const handleLogIssueClick = () => {
    navigate('/admindashboard/LogIssue'); // Navigate to Log Issue page
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



const Table = ({adminId}) => {
  const [issues, setIssues] = useState([]); // State to store fetched issues
  const [selectedLog, setSelectedLog] = useState(null); // State to store selected log
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch issues from the API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo ? userInfo.userId : null;
        const response = await fetch(`https://localhost:44328/api/AdminLog/GetAdminLoggedIssues/GetAdminLoggedIssues/admin/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } 
        const data = await response.json();
        setIssues(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIssues();
  }, [adminId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#ffa007';
      case 'ONGOING':
        return '#bfa829';
      case 'INPROGRESS':
        return '#14788f';
      case 'ONHOLD':
        return '#8f9396';
      case 'ESCALATED':
        return '#f70000';
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

  if (loading) {
    return <div>Loading...</div>; // Loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

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
              <td>{issue.logBy}</td>
              <td>{issue.issueTitle}</td>
              <td>{issue.assignedTo}</td>
              <td>{new Date(issue.issuedAt).toLocaleDateString()}</td>
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
  adminId: PropTypes.number.isRequired, // Admin ID to fetch issues for
};

export default Table;
