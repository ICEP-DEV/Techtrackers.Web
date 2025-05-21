import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation(); // Get current route path

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="menu-icon" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" className="menu-link">
              <i className="fas fa-home"></i>
              <span className="menu-text">Dashboard</span>
            </Link>
          </li>
          <li className={location.pathname === "/all-issues" ? "active" : ""}>
            <Link to="/all-issues" className="menu-link">
              <i className="fas fa-list"></i>
              <span className="menu-text">All Issues</span>
            </Link>
          </li>
          <li className={location.pathname === "/manage-logs" ? "active" : ""}>
            <Link to="/manage-logs" className="menu-link">
              <i className="fas fa-tasks"></i>
              <span className="menu-text">Manage Logs</span>
            </Link>
          </li>
          <li
            className={location.pathname === "/generate-report" ? "active" : ""}
          >
            <Link to="/generate-report" className="menu-link">
              <i className="fas fa-chart-line"></i>
              <span className="menu-text">Generate Report</span>
            </Link>
          </li>
          <li
            className={location.pathname === "/notifications" ? "active" : ""}
          >
            <Link to="/notifications" className="menu-link">
              <i className="fas fa-bell"></i>
              <span className="menu-text">Notifications</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div
        className="logout-section"
        onClick={() => console.log("Logging out...")}
      >
        <i className="fas fa-sign-out-alt logout-icon"></i>
      </div>
    </div>
  );
}
