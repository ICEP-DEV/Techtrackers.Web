import { React, useState } from "react";
import bell from '../images/bell.png';
import filter from '../images/filter_icon.png';
import list from '../images/list_icon.png';
import profile from '../images/profile_icon.png';
import search from '../images/search.png';
import '../SidebarCSS/NotificationsStyle.css';
import { useNavigate } from "react-router-dom";
import useIssues from "./useIssues";

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { issues } = useIssues();
  const navigate = useNavigate();
  const handleIssueClick = (issue) => {
    navigate(`/issues/${issue.id}`); // Pass the issue data
  };

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to issue',
      staffName: 'John Doe',
      issue: 'Internal Issue: Server Downtime in Data Center',
      issueId: 'IT-P1-1220',
      time: '12:18',
    },
    {
      id: 2,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to issue',
      staffName: 'Themba Zwane',
      issue: 'Access Issue: Unable to log into HR Portal',
      issueId: 'HR-P1-1221',
      time: '12:16',
    },
    {
      id: 3,
      type: 'resolution',
      sender: 'Mike Jones',
      content: 'confirmed issue ',
      status: 'resolved',
      issueId: 'IT-P2-1225',
      time: 'Yesterday',
    },

    {
      id: 4,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to issue',
      staffName: 'Andile Zondo',
      issue: 'Connectivity Issue',
      issueId: 'FI-P2-1223',
      time: '2024-08-18',
    },
    {
      id: 5,
      type: 'collaboration',
      sender: 'Mike Mdluli',
      content: 'invited you to collaborate with them',
      issue: 'Log Details: Maintenance Request',
      action: 'View Collaboration Requests',
      time: '2024-08-14',
    },
  ];

  const formatDate = (timeString) => {
    // Handle "Yesterday" explicitly
    if (timeString.toLowerCase() === "yesterday") {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    }
    
    // Handle time-only formats by assuming today's date
    const timeOnlyPattern = /^\d{2}:\d{2}$/;
    if (timeOnlyPattern.test(timeString)) {
      const today = new Date();
      const [hours, minutes] = timeString.split(":").map(Number);
      today.setHours(hours, minutes, 0, 0);
      return today;
    }
  
    // Handle full date strings in standard formats
    return new Date(timeString);
  };

  const filteredNotifications = notifications.filter(notification => {
    const fullContent = `${notification.sender} ${notification.content} ${notification.staffName || ''} ${notification.issue || ''}`.toLowerCase();
    return fullContent.includes(searchQuery.toLowerCase()) && 
           (filterType ? notification.type === filterType : true);
  });

  const sortedNotifications = filteredNotifications.sort((a, b) => {
    const dateA = formatDate(a.time);
    const dateB = formatDate(b.time);
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else if (sortOrder === 'oldest') {
      return dateA - dateB;
    }
    return 0;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'green';
      case 'unresolved':
        return 'red';
      default:
        return 'black'; // Default color if no status is provided
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1 className="notifications-title">
          <img src={bell} alt="Bell" /> NOTIFICATIONS
        </h1>
        <div className="filter-container">
          <div className="the-search-container">
            <input 
              type="text" 
              placeholder="Search" 
              className="the-search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <img src={search} className="the-search-icon" alt="Search" />
          </div>
          <div className="notification-dropdown">
            <button className="the-filter-button">Filter <img src={filter} alt="Filter" /></button>
            <div className="notification-dropdown-content">
              <div className="notification-dropdown-item" onClick={() => setFilterType('assignment')}>Assignment</div>
              <div className="notification-dropdown-item" onClick={() => setFilterType('resolution')}>Resolution</div>
              <div className="notification-dropdown-item" onClick={() => setFilterType('collaboration')}>Collaboration</div>
              <div className="notification-dropdown-item" onClick={() => setFilterType('')}>All</div>
            </div>
          </div>
          <div className="notification-dropdown">
            <button className="the-sort-button">Sort <img src={list} alt="Sort" /></button>
            <div className="notification-dropdown-content">
              <div className="notification-dropdown-item" onClick={() => setSortOrder('newest')}>Newest First</div>
              <div className="notification-dropdown-item" onClick={() => setSortOrder('oldest')}>Oldest First</div>
              <div className="notification-dropdown-item" onClick={() => setSortOrder('')}>Default</div>
            </div>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {sortedNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-profile">
              <img src={profile} alt="Profile" />
            </div>
            <div className="notification-content">
              <p className="notification-sender">
                {notification.sender}{' '}
                <span className="notification-message">
                  {notification.content}{' '}
                  {notification.issueId && <span><strong>{notification.issueId}</strong></span>}
                  {notification.status && (
                    <span style={{ color: getStatusColor(notification.status) }}>
                      { <strong> as {notification.status}</strong>}
                    </span>
                  )}
                </span>
              </p>
              {notification.staffName && (
                <p className="notification-staffName">{notification.staffName}</p>
              )}
              {notification.issue && (
                <p className="notification-issue">{notification.issue}</p>
              )}
              {notification.action && (
                <p className="notification-action" onClick={() => navigate(`/collab`)}>{notification.action}</p>
              )}
            </div>
            <div className="notification-meta">
              <span className="notification-time">{notification.time}</span>
              {notification.type !== 'resolution' && notification.type !== 'collaboration' && (
                <button className="notification-view-button" onClick={() => navigate(`/issues/${notification.issueId}`)}>
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
