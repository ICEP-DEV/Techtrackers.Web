import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Import your CSS file for styling
import '@fortawesome/fontawesome-free/css/all.min.css';



export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="menu-icon" onClick={toggleSidebar}>
        {/* Hamburger Menu Icon */}
        <i className="fas fa-bars"></i>
      </div>

      {/* Sidebar Content */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="menu-link">
              <i className="fas fa-home"></i>
              <span className="menu-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/log-issue" className="menu-link">
              <i className="fas fa-plus-circle"></i>
              <span className="menu-text">Log Issue</span>
            </Link>
          </li>
          <li>
            <Link to="/all-issues" className="menu-link">
              <i className="fas fa-list"></i>
              <span className="menu-text">All Issues</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-logs" className="menu-link">
              <i className="fas fa-tasks"></i>
              <span className="menu-text">Manage Logs</span>
            </Link>
          </li>
          <li>
            <Link to="/generate-report" className="menu-link">
              <i className="fas fa-chart-line"></i>
              <span className="menu-text">Generate Report</span>
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="menu-link">
              <i className="fas fa-bell"></i>
              <span className="menu-text">Notifications</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout section */}
      <div className="logout-section" onClick={() => console.log('Logging out...')}>
        <i className="fas fa-sign-out-alt logout-icon"></i>
      </div>
    </div>
  );
}
