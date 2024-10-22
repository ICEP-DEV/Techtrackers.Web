import React, { useState, useEffect } from 'react';
import './StaffStyle/NotificationIssue.css';
import { FaBell, FaSearch, FaFilter, FaBars } from 'react-icons/fa';

const NotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('allRead');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [notificationsState, setNotificationsState] = useState([]);

  // Fetch notifications from the API when the component mounts
  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://localhost:44328/api/Notification/ReceiveNotification');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json(); // Parse JSON from the response
      if (data.isSuccess) {
        setNotificationsState(data.result); // Update state with the 'result' array from the API
      } else {
        console.error('Failed to fetch notifications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Use useEffect to fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []); // Empty dependency array means this runs once on component mount

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
    setFilterOpen(false); // Close filter dropdown after selection
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortOpen(false); // Close sort dropdown after selection
  };

  const markAsRead = (id) => {
    setNotificationsState(prevState =>
      prevState.map(notification =>
        notification.notification_ID === id ? { ...notification, read_Status: true } : notification
      )
    );
  };

  const formatMessage = (message) => {
    const parts = message.split(/(?<=[.,])\s*/);
    return parts.map((part, index) => (
      <p key={index} className="mb-0">
        {index === 0 ? part : <span className="indent">{part.trim()}</span>}
      </p>
    ));
  };

  // Helper function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    let formattedTime;

    if (diffInSeconds < 60) {
      formattedTime = `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      formattedTime = `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      formattedTime = `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      formattedTime = `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
      const weeks = Math.floor(diffInSeconds / 604800);
      formattedTime = `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }

    return formattedTime;
  };

  const filteredNotifications = notificationsState.filter(notification => {
    const matchesSearchQuery = notification.notification_Message.toLowerCase().includes(searchQuery.toLowerCase());

    const filterDateThreshold = () => {
      const now = Date.now();

      switch (filterOption) {
        case 'all':
          return 0; // Show all notifications
        case '1min':
          return now - 1 * 60 * 1000; // 1 minute ago
        case '1h':
          return now - 1 * 60 * 60 * 1000; // 1 hour ago
        case '1d':
          return now - 1 * 24 * 60 * 60 * 1000; // 1 day ago
        case '2d':
          return now - 2 * 24 * 60 * 60 * 1000; // 2 days ago
        case '1w':
          return now - 7 * 24 * 60 * 60 * 1000; // 1 week ago
        case '2w':
          return now - 14 * 24 * 60 * 60 * 1000; // 2 weeks ago
        case '1m':
          return now - 30 * 24 * 60 * 60 * 1000; // 1 month ago
        default:
          return 0; // Default case, shows all notifications
      }
    };

    const notificationDate = parseTimestamp(notification.timestamp);
    const isInTimeFrame = notificationDate >= filterDateThreshold(); // Check if the notification is within the selected time frame

    if (activeTab === 'allRead' && notification.status === 'read') {
      return matchesSearchQuery && isInTimeFrame;
    }
    return false;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const noNotificationsMessage = activeTab === 'unread' ? "No unread notifications available." : "No read notifications available.";

  return (
    <div className="main-content">
      <div className="containers mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <FaBell className="notification-icons me-2 text-success" />
            <h2>Notifications</h2>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <div className="search-bar-containers">
              <input 
                type="text" 
                className="form-control search-inputs" 
                placeholder="Search" 
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
              <FaSearch className="search-icons" />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mb-3 align-items-center">
          <div className="filter-sorts-containers d-flex align-items-center">
            <div className="filter-container">
              <div
                className="filter-sort-toggle text-center"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FaFilter className="filter-sort-icon" /> Filter
              </div>
              {filterOpen && (
                <div className="dropdown-menu show">
                  {Object.entries(filterOptions).map(([key, option]) => (
                    <button key={key} className="dropdown-item" onClick={() => handleFilterChange(key)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-container ms-2">
              <div
                className="filter-sort-toggle text-center"
                onClick={() => setSortOpen(!sortOpen)}
              >
                <FaBars className="filter-sort-icon" /> Sort
              </div>
              {sortOpen && (
                <div className="dropdown-menu show">
                  <button className="dropdown-item" onClick={() => handleSortChange('asc')}>Sort (Oldest First)</button>
                  <button className="dropdown-item" onClick={() => handleSortChange('desc')}>Sort (Newest First)</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'allRead' ? 'active' : ''}`}
              onClick={() => handleTabClick('allRead')}
            >
              All read issues
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'unread' ? 'active' : ''}`}
              onClick={() => handleTabClick('unread')}
            >
              Unread issues
            </button>
          </li>
        </ul>

        <table className="table table-borderless">
          <tbody>
            {sortedNotifications.length > 0 ? (
              sortedNotifications.map(notification => (
                <tr key={notification.notification_ID} className="notification-rows">
                  <td className="d-flex align-items-center">
                    <FaBell className="notification-icons me-2" />
                    <div>
                      {formatMessage(notification.notification_Message)}
                      <button onClick={() => markAsRead(notification.notification_ID)}>Mark as Read</button>
                    </div>
                  </td>
                  <td>
                    <small className="notification-timestamps">{formatTimestamp(notification.timestamp)}</small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  <p>{noNotificationsMessage}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationContainer;