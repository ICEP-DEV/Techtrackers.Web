import React, { useState, useEffect } from 'react';
import '../Notification Page/Notification.css';
import { FaBell, FaSearch, FaFilter, FaSort } from 'react-icons/fa';

const Notification = () => {
  const [activeTab, setActiveTab] = useState('allRead');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  
  // Sample notifications to demonstrate the functionality
  const [notificationsState, setNotificationsState] = useState([
    {
      notification_ID: 1,
      message: 'System update completed successfully.',
      read_Status: true,
      received_time: '2023-11-13T10:15:00',
    },
    {
      notification_ID: 2,
      message: 'New comment on your post.',
      read_Status: false,
      received_time: '2023-11-13T14:30:00',
    },
    {
      notification_ID: 3,
      message: 'Your password will expire in 5 days.',
      read_Status: true,
      received_time: '2023-11-12T09:20:00',
    },
    {
      notification_ID: 4,
      message: 'You have a new follower!',
      read_Status: false,
      received_time: '2023-11-13T16:45:00',
    },
  ]);

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleFilterChange = (option) => setFilterOption(option);
  const handleSortChange = (order) => setSortOrder(order);

  const filteredNotifications = notificationsState
    .filter((notification) => {
      if (activeTab === 'allRead') return notification.read_Status === true;
      if (activeTab === 'unread') return notification.read_Status === false;
      return true;
    })
    .filter((notification) => notification.message.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? new Date(a.received_time) - new Date(b.received_time)
        : new Date(b.received_time) - new Date(a.received_time);
    });

  return (
    <div className="main-content">
      <div className="containers mt-4">
        <div className="header-container">
          <div className="left-section">
            <FaBell className="notification-icons" />
            <h2>Notifications</h2>
          </div>
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
        <div className="filters-sorting-container">
          <div className="filters">
            <FaFilter />
            <select
              value={filterOption}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="filter-dropdown"
            >
              <option value="all">All</option>
              <option value="1d">Last 1 Day</option>
              <option value="1w">Last 1 Week</option>
            </select>
          </div>
          <div className="sorting">
            <FaSort />
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-dropdown"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="nav-tabs-container">
          <button
            className={`tab-button ${activeTab === 'allRead' ? 'active' : ''}`}
            onClick={() => handleTabClick('allRead')}
          >
            All Read
          </button>
          <button
            className={`tab-button ${activeTab === 'unread' ? 'active' : ''}`}
            onClick={() => handleTabClick('unread')}
          >
            Unread
          </button>
        </div>
        <div className="notification-list">
          {filteredNotifications.map((notification) => (
            <div key={notification.notification_ID} className="notification-item">
              <FaBell className="notification-item-icon" />
              <span className="notification-message">{notification.message}</span>
              <span className="notification-time">
                {new Date(notification.received_time).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;









