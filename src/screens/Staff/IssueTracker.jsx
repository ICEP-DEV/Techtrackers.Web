import React, { useState, useEffect } from 'react';
import './StaffStyle/NotificationIssue.css';
import { FaBell, FaSearch, FaFilter, FaBars } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

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
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
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

  const filteredNotifications = notificationsState.filter(notification => {
    const matchesSearchQuery = notification.notification_Message.toLowerCase().includes(searchQuery.toLowerCase());

    const filterDateThreshold = () => {
      const now = Date.now();

      switch (filterOption) {
        case 'all':
          return 0;
        case '1min':
          return now - 1 * 60 * 1000;
        case '1h':
          return now - 1 * 60 * 60 * 1000;
        case '1d':
          return now - 1 * 24 * 60 * 60 * 1000;
        case '2d':
          return now - 2 * 24 * 60 * 60 * 1000;
        case '1w':
          return now - 7 * 24 * 60 * 60 * 1000;
        case '2w':
          return now - 14 * 24 * 60 * 60 * 1000;
        case '1m':
          return now - 30 * 24 * 60 * 60 * 1000;
        default:
          return 0;
      }
    };

    const notificationDate = new Date(notification.timestamp).getTime(); // Use the timestamp from the API
    const isInTimeFrame = notificationDate >= filterDateThreshold();

    if (activeTab === 'allRead' && notification.read_Status === true) {
      return matchesSearchQuery && isInTimeFrame;
    }
    return false;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
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
