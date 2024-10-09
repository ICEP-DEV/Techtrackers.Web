import React from 'react';
import { Clock } from 'lucide-react';
import './StaffStyle/MainContent.css';

export default function MainContent({ onSelectIssue, onOpenChat }) {
  const issues = [
    { 
        id: 1, 
        issueID: 'IT-P2-1234', 
        title: 'Internal Issue: Server Downtime in Data Center', 
        date: '19/08/2024', 
        department: 'IT Support', 
        priority: 'Medium', 
        status: 'Pending',
        description: 'The data center experienced a critical server downtime that affected multiple systems, including primary servers SRV-001 and SRV-002. This disruption caused significant delays in internal operations and impacted user access to essential applications.' 
    },
    { 
        id: 2, 
        issueID: 'HR-P3-12345', 
        title: 'Network Issue', 
        date: '15/08/2024', 
        department: 'Human Resources (HR)', 
        priority: 'High', 
        status: 'Ongoing',
        description: 'I am experiencing network connectivity problems in the office. Both wired and wireless connections are intermittent, disrupting access to shared drives and cloud services. This is affecting my productivity and that of my colleagues. Please provide an update on the status and estimated resolution time. Thank you!' 
    },
    { 
        id: 3, 
        issueID: 'HR-P1-1236', 
        title: 'Printer not working', 
        date: '22/07/2024', 
        department: 'Human Resources (HR)', 
        priority: 'Low', 
        status: 'Resolved',
        description: 'The office printer is not functioning, preventing me in printing important documents.' 
    },
    { 
        id: 4, 
        issueID: 'HR-P1-1237', 
        title: 'Forgot password', 
        date: '15/07/2024', 
        department: 'Human Resources (HR)', 
        priority: 'High', 
        status: 'On-Hold',
        description: 'I am unable to access the account due to a forgotten password and require assistance to reset it.' 
    },
];


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
              <td>{issue.priority}</td>
              <td><span className={`status ${issue.status.toLowerCase()}`}>{issue.status}</span></td>
              <td><button className="view-button" onClick={() => onSelectIssue(issue)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Attach the onOpenChat function to the Live Chat button */}
    
    </main>
  );
}

