import React from 'react';
import { Clock } from 'lucide-react';
import '../style/AllIssuesPage.css';

export default function MainContent({ onSelectIssue, onOpenChat }) {
  const issues = [
    { id: 1, issueID: 'IT-P2-1234', title: 'Internal Issue: Server Downtime in Data Center', date: '19/08/2024', department: 'IT Support', priority: 'Medium', status: 'Pending' },
    { id: 2, issueID: 'HR-P3-12345', title: 'Network Issue', date: '15/08/2024', department: 'Human Resources (HR)', priority: 'High', status: 'Ongoing' },
    { id: 3, issueID: 'HR-P1-1236', title: 'Printer not working', date: '22/07/2024', department: 'Human Resources (HR)', priority: 'Low', status: 'Resolved' },
    { id: 4, issueID: 'HR-P1-1237', title: 'Forgot password', date: '15/07/2024', department: 'Human Resources (HR)', priority: 'High', status: 'On-Hold' },
  ];

  // Function to get the status class based on the status value
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'status ongoing'; // Orange
      case 'resolved':
        return 'status resolved'; // Green
      case 'pending':
        return 'status pending'; // Red
      case 'on-hold':
        return 'status on-hold'; // Light blue or custom color
      default:
        return 'status'; // Default class
    }
  };

  // Function to get the priority class based on the priority level
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority high'; // Red
      case 'medium':
        return 'priority medium'; // Orange
      case 'low':
        return 'priority low'; // Green
      default:
        return 'priority'; // Default class
    }
  };

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
            <tr key={issue.id}>
              <td>{issue.issueID}</td>
              <td>{issue.title}</td>
              <td>{issue.date}</td>
              <td>{issue.department}</td>
              <td><span className={getPriorityClass(issue.priority)}>{issue.priority}</span></td>
              <td><span className={getStatusClass(issue.status)}>{issue.status}</span></td>
              <td><button className="view-button" onClick={() => onSelectIssue(issue)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Attach the onOpenChat function to the Live Chat button */}
    </main>
  );
}
