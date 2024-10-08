import React from 'react';
import './HODDashboard.css'; // Import your CSS for styling

export default function HODDashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="welcome-message">WELCOME, HOD!</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h2>48</h2>
          <p>ALL ISSUES</p>
        </div>
        <div className="stat-card">
          <h2>16</h2>
          <p>OPEN ISSUES</p>
        </div>
        <div className="stat-card">
          <h2>48</h2>
          <p>CLOSED ISSUES</p>
        </div>
        <div className="stat-card">
          <h2>Human Resources Department</h2>
        </div>
      </div>
      {/* Charts or any other information can go below */}
      <div className="charts-container">
        <div className="chart">
          <h3>Average Resolution Time</h3>
          {/* You can add chart or visualization here */}
        </div>
        <div className="chart">
          <h3>Issue Summary</h3>
          {/* You can add chart or visualization here */}
        </div>
      </div>
    </div>
  );
}
