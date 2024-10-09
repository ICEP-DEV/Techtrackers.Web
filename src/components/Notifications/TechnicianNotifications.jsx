import { React, useState } from "react";
import bell from '../../images/bell.png';
import filter from '../../images/filter_icon.png';
import list from '../../images/list_icon.png';
import profile from '../../images/profile_icon.png';
import search from '../../images/search.png';
import './NotificationsStyle.css';

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to a new logged issue',
      subject: 'John Doe',
      issue: 'Internal Issue: Server Downtime in Data Center',
      time: '12:18',
    },
    {
      id: 2,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to a new logged issue',
      subject: 'Themba Zwane',
      issue: 'Access Issue: Unable to log into HR Portal',
      time: '12:16',
    },
    {
      id: 3,
      type: 'resolution',
      sender: 'Andile Zondo',
      content: 'confirmed their log issue as resolved',
      time: 'Yesterday',
    },
    {
      id: 4,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to a new logged issue',
      subject: 'Andile Zondo',
      issue: 'Connectivity Issue',
      time: '18/08/2024',
    },
    {
      id: 5,
      type: 'collaboration',
      sender: 'Mike Mdluli',
      content: 'invited you to collaborate with them',
      issue: 'Log Details: Maintenance Request',
      action: 'View Collaboration Requests',
      time: '14/08/2024',
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    const fullContent = `${notification.sender} ${notification.content} ${notification.subject || ''} ${notification.issue || ''}`.toLowerCase();
    return fullContent.includes(searchQuery.toLowerCase()) && 
           (filterType ? notification.type === filterType : true);
  });

  const sortedNotifications = filteredNotifications.sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    
    if (sortOrder === 'newest') {
      return dateB - dateA; // Newest to oldest
    } else if (sortOrder === 'oldest') {
      return dateA - dateB; // Oldest to newest
    }
    return 0; // Default to no sorting
  });

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1 className="notifications-title">
          <img src={bell} alt="Bell" /> NOTIFICATIONS
        </h1>
        <div className="filter-container">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <img src={search} className="search-icon" alt="Search" />
          </div>
          <div className="dropdown">
            <button className="filter-button">Filter <img src={filter} alt="Filter" /></button>
            <div className="dropdown-content">
              <div className="dropdown-item" onClick={() => setFilterType('assignment')}>Assignment</div>
              <div className="dropdown-item" onClick={() => setFilterType('resolution')}>Resolution</div>
              <div className="dropdown-item" onClick={() => setFilterType('collaboration')}>Collaboration</div>
              <div className="dropdown-item" onClick={() => setFilterType('')}>All</div>
            </div>
          </div>
          <div className="dropdown">
            <button className="sort-button">Sort <img src={list} alt="Sort" /></button>
            <div className="dropdown-content">
              <div className="dropdown-item" onClick={() => setSortOrder('newest')}>Newest First</div>
              <div className="dropdown-item" onClick={() => setSortOrder('oldest')}>Oldest First</div>
              <div className="dropdown-item" onClick={() => setSortOrder('')}>Default</div>
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
                <span className="notification-message">{notification.content}</span>
              </p>
              {notification.subject && (
                <p className="notification-subject">{notification.subject}</p>
              )}
              {notification.issue && (
                <p className="notification-issue">{notification.issue}</p>
              )}
              {notification.action && (
                <p className="notification-action">{notification.action}</p>
              )}
            </div>
            <div className="notification-meta">
              <span className="notification-time">{notification.time}</span>
              {notification.type !== 'resolution' && (
                <button className="view-button"> View</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
