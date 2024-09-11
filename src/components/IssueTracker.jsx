// IssueTracker.jsx
import React from 'react';
import '../style/NotificationIssue.css';


const IssueTracker = () => {
  return (
    <div className="container">
      {/* Header with Search Bar */}
      <div className="header">
        <div className="search-bar">
          <input type="text" placeholder="Search notifications" />
          <button>Search</button>
        </div>
        <div className="notifications-heading">
          <span className="notification-icon">🔔</span> Notifications
        </div>
      </div>

      {/* Filter and Offcanvas Navbar */}
      <div className="filter-container">
        <div className="filter-icon">⚙️</div>
        <div className="filter-label">Filter</div>
        <div className="offcanvas-navbar">
          <div>Offcanvas Navbar</div>
          <div className="sort-label">Sort</div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        <div className="notification-item">
          <span className="notification-icon">🔔</span>
          <div className="notification-text">
            Issue: Internal Issue has been assigned to a technician, please keep track of the status
          </div>
          <div className="time-ago">1 min ago</div>
        </div>
        {/* Add more notification items here */}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="page active">All Issues</span>
        <span className="page">Unread Issues</span>
      </div>
    </div>
  );
};

export default IssueTracker;


