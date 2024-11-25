import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import styles from'./StaffStyle/MainContent.module.css';

export default function MainContent({ onSelectIssue, onOpenChat }) {
  const [issues, setIssues] = useState([]);
 
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const userId = userInfo ? userInfo.userId : null;

        const response = await fetch(`https://localhost:44328/api/Log/GetLogsForStaff?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched logs:', data); // Log the fetched data for debugging
          setIssues(data);
        } else {
          console.error('Failed to fetch issues');
        }
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return (
    <main className={styles.MmainContent}>
      <div className={styles.statusHeader}>
        <Clock size={32} />
        <h2>ALL ISSUES</h2>
      </div>
      <table className={styles.issuesTable}>
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Category</th>
            <th>Date reported</th>
            <th>Department</th>
            <th>Priority level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.issueId}>
              <td>{issue.issueId}</td>
              <td>{issue.categoryName}</td>
              <td>
                {new Date(issue.issuedAt).toLocaleDateString()} {new Date(issue.issuedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td>{issue.department}</td>
              <td>{issue.priority}</td>
              {/* Check if issue.log_Status exists before calling toLowerCase() */}
              <td>
              <span className={`${styles.status} ${styles[issue.status ? issue.status.toLowerCase() : 'unknown']}`}>
                  {issue.status || 'Unknown'}
                </span>
              </td>
              <td><button className={styles.viewButton} onClick={() => onSelectIssue(issue)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
