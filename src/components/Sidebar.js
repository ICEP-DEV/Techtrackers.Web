import React, { useState } from "react";
import "./Sidebar.css"; // Import your CSS file for styling

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar starts open

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
            <i className="fas fa-home"></i>
            <span className="menu-text">Dashboard</span>
          </li>
          <li>
            <i className="fas fa-plus-circle"></i>
            <span className="menu-text">Log Issue</span>
          </li>
          <li>
            <i className="fas fa-list"></i>
            <span className="menu-text">All Issues</span>
          </li>
          <li>
            <i className="fas fa-tasks"></i>
            <span className="menu-text">Manage Logs</span>
          </li>
          <li>
            <i className="fas fa-chart-line"></i>
            <span className="menu-text">Generate Report</span>
          </li>
          <li>
            <i className="fas fa-bell"></i>
            <span className="menu-text">Notifications</span>
            {/* <span className="notification-count">2</span> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}
