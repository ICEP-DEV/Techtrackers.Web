import React, { useState } from 'react';
import './StaffStyle/NotificationIssue.css';
import { FaBell, FaSearch, FaFilter, FaBars } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

const NotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('allRead');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  const notifications = [
    { id: 1, message: "Issue: Internal Issue has been assigned to a technician, please keep track of the status.", timestamp: "1 min ago", status: 'read' },
    { id: 2, message: "Issue: Printer not working has been re-opened for further investigation. You will receive updates as we progress.", timestamp: "1 week ago", status: 'read' },
    { id: 3, message: "Issue: Printer not working has been Resolved. Make sure you confirm status.", timestamp: "1 month ago", status: 'read'},
    { id: 4, message: "Issue: Printer not working has been resolved. Make sure you confirm status.", timestamp: "1 week ago", status: 'read'},
    { id: 5, message: "Issue: Network is not responsive at the moment. Keep track of the status.", timestamp: "2 month ago", status: 'unread'},
    { id: 6, message: "Issue: I can't login to the portal. The matter will be sorted in a moment.", timestamp: "1 week ago", status: 'read'},
    { id: 7, message: "Issue: Printer not working has been resolved. Make sure you confirm status.", timestamp: "1 month ago", status: 'read'},
    
  ];

  const [notificationsState, setNotificationsState] = useState(notifications);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const markAsRead = (id) => {
    setNotificationsState(prevState =>
      prevState.map(notification =>
        notification.id === id ? { ...notification, status: 'read' } : notification
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

  const parseTimestamp = (timestamp) => {
    const timeUnits = {
      'min': 1 * 60 * 1000,
      'hour': 1 * 60 * 60 * 1000,
      'day': 1 * 24 * 60 * 60 * 1000,
      'week': 7 * 24 * 60 * 60 * 1000,
      'month': 30 * 24 * 60 * 60 * 1000,
    };

    const regex = /(\d+)\s*(min|hour|day|week|month)\s+ago/;
    const match = timestamp.match(regex);

    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2];
      return Date.now() - (value * timeUnits[unit]);
    }
    return Date.now();
  };

  const sortedNotifications = [...notificationsState].sort((a, b) => {
    const dateA = parseTimestamp(a.timestamp);
    const dateB = parseTimestamp(b.timestamp);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const filteredNotifications = sortedNotifications.filter(notification => {
    const matchesSearchQuery = notification.message.toLowerCase().includes(searchQuery.toLowerCase());

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

  const noNotificationsMessage = activeTab === 'unread' ? "No notifications available." : "No read notifications available.";

  return (
    <div className="main-content">
      <div className="containers mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <FaBell className="notification-icons me-2 text-success" />
            <h2>Notifications</h2>
          </div>
          <div className="d-flex justify-content-center mb-3"> {/* Center the search bar */}
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

        <div className="d-flex justify-content-end mb-3">
          <div className="filter-sorts-containers">
            <Dropdown drop="down">
              <Dropdown.Toggle variant="light" id="dropdown-filter">
                <FaFilter /> Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('all')}>All</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('1min')}>Last 1 Minute</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('1h')}>Last 1 Hour</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('1d')}>Last 1 Day</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('2d')}>Last 2 Days</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('1w')}>Last 1 Week</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('2w')}>Last 2 Weeks</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleFilterChange('1m')}>Last 1 Month</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown drop="down" className="ms-2">
              <Dropdown.Toggle variant="light" id="dropdown-sort">
                <FaBars /> Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={() => handleSortChange('asc')}>Sort(Oldest First)</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => handleSortChange('desc')}>Sort(Newest First)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <tr key={notification.id} className="notification-rows">
                  <td className="d-flex align-items-center">
                    <FaBell className="notification-icons me-2" />
                    <div>
                      {formatMessage(notification.message)}
                      <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                    </div>
                  </td>
                  <td>
                    <small className="notification-timestamps">{notification.timestamp}</small>
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
