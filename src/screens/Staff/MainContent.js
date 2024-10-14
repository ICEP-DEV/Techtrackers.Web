import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import './StaffStyle/MainContent.css';

export default function MainContent({ onSelectIssue, onOpenChat }) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://localhost:44328/api/Log/GetLogs');
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
    <main className="main-content">
      <div className="status-header">
        <Clock size={32} />
        <h2>ALL ISSUES</h2>
      </div>
      <table className="issues-table">
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Issue title</th>
            <th>Date reported</th>
            <th>Department</th>
            <th>Priority level</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.logId}>
              <td>{issue.assigned_By}</td>
              <td>{issue.description}</td>
              <td>{new Date(issue.assigned_At).toLocaleDateString()}</td>
              <td>{issue.category_ID}</td>
              <td>{issue.priority}</td>
              {/* Check if issue.status exists before calling toLowerCase() */}
              <td><span className={`status ${issue.log_Status ? issue.Log_Status.toLowerCase() : ''}`}>{issue.log_Status || 'Unknown'}</span></td>
              <td><button className="view-button" onClick={() => onSelectIssue(issue)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
