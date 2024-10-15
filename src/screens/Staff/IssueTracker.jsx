
import React, { useState } from 'react';
import './StaffStyle/NotificationIssue.css';
import { FaBell, FaSearch, FaFilter, FaBars } from 'react-icons/fa';

const NotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('allRead');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filterOptions = {
    all: { label: 'All Notifications' },
    assigned: { label: 'Assigned Issues' },
    resolved: { label: 'Resolved Issues' },
    unread: { label: 'Unread Issues' },
  };

  // Using ISO date strings for easier parsing
  const notifications = [
    { id: 1, message: "Issue: Internal Issue has been assigned to a technician. Please keep track of the status.", timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), status: 'read' }, // 1 hour ago
    { id: 2, message: "Issue: Printer not working has been re-opened for further investigation. You will receive updates as we progress.", timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'read' }, // 1 month ago
    { id: 3, message: "Issue: Printer not working has been resolved. Make sure you confirm status.", timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), status: 'read' }, // 2 weeks ago
    { id: 4, message: "Issue: Network is not responsive at the moment.Please keep track of the status", timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), status: 'read' }, // 2 weeks ago
    { id: 5, message: "Issue: I can't login to the portal. The matter will be sorted in a moment.", timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'read' }, // 1 week ago
    { id: 6, message: "Issue: Printer not working has been resolved. Make sure you confirm status.", timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), status: 'read' }, // 2 weeks ago
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
    setFilterOpen(false); // Close filter dropdown after selection
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortOpen(false); // Close sort dropdown after selection
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

  const sortedNotifications = [...notificationsState].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const filteredNotifications = sortedNotifications.filter(notification => {
    const matchesSearchQuery = notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    // Check if the notification is in the selected tab
    const isActiveTab = activeTab === 'unread' ? notification.status === 'unread' : notification.status === 'read';

    // Filtering based on the new filter options
    const matchesFilterOption = () => {
      if (filterOption === 'all') return true; // Show all notifications
      if (filterOption === 'assigned') return notification.message.includes('assigned'); // Check for assigned notifications
      if (filterOption === 'resolved') return notification.message.includes('resolved'); // Check for resolved notifications
      if (filterOption === 'unread') return notification.status === 'unread'; // Check for unread notifications
      return true; // Default case, shows all notifications
    };

    return matchesSearchQuery && matchesFilterOption() && isActiveTab;
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