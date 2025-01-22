import React, { useState, useEffect } from 'react';
import styles from './StaffStyle/NotificationIssue.module.css';
import { FaBell, FaSearch, FaFilter, FaBars } from 'react-icons/fa';

const NotificationContainer = () => {
  const [activeTab, setActiveTab] = useState('allRead');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [notificationsState, setNotificationsState] = useState([]);

  // Filter options with time-based conditions
  const filterOptions = {
    all: { label: 'All', filter: () => true },
    today: {
      label: 'Today',
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        return (
          notificationDate.getDate() === now.getDate() &&
          notificationDate.getMonth() === now.getMonth() &&
          notificationDate.getFullYear() === now.getFullYear()
        );
      },
    },
    thisWeek: {
      label: 'This Week',
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return notificationDate >= startOfWeek;
      },
    },
    thisMonth: {
      label: 'This Month',
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        return (
          notificationDate.getMonth() === now.getMonth() &&
          notificationDate.getFullYear() === now.getFullYear()
        );
      },
    },
    older: {
      label: 'Older',
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        return notificationDate < new Date(now.setDate(now.getDate() - 30));
      },
    },
  };

  // Fetch notifications from the API when the component mounts
  const fetchNotifications = async () => {
    try {
      console.log('Fetching notifications...');
      const userInfo = JSON.parse(localStorage.getItem('user_info'));
      const userId = userInfo ? userInfo.userId : null;

      if (!userId) {
        throw new Error('User ID not found.');
      }

      const response = await fetch(`https://localhost:44328/api/Log/GetNotifications/${userId}?onlyUnread=false`);
      console.log('Response received:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data received:', data);

      const notificationsWithDefaults = data.map(notification => ({
        ...notification,
        message: notification.message || "", // Default to an empty string if `message` is undefined
      }));
      setNotificationsState(notificationsWithDefaults);
      console.log('Notifications state updated');
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
    setFilterOpen(false);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortOpen(false);
  };

  const markAsRead = (id) => {
    setNotificationsState((prevState) =>
      prevState.map((notification) =>
        notification.notification_ID === id ? { ...notification, read_Status: true } : notification
      )
    );
  };

  const formatMessage = (message) => {
    if (!message) return null;
    const parts = message.split(/(?<=[.,])\s*/);
    return parts.map((part, index) => (
      <p key={index} className="mb-0">
        {index === 0 ? part : <span className="indent">{part.trim()}</span>}
      </p>
    ));
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
      return new Date(timestamp).toLocaleString();
    }
  };

  const filteredNotifications = notificationsState.filter((notification) => {
    const matchesSearchQuery = notification.message
      ? notification.message.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    const isActiveTab = activeTab === 'unread' ? !notification.read_Status : notification.read_Status;

    const matchesTimeFilter = filterOptions[filterOption]?.filter(notification);

    return matchesSearchQuery && isActiveTab && matchesTimeFilter;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const noNotificationsMessage =
    activeTab === 'unread' ? 'No unread notifications available.' : 'No read notifications available.';

  return (
    <div className={styles.maiNContent}>
      <div className={`${styles.contners} mt-4`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <FaBell className={`${styles.notificationIcons} me-2 text-success`} />
            <h2>Notifications</h2>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <div className={styles.searchBarContainers}>
              <input
                type="text"
                className={`${styles.formmControl} ${styles.searchInputs}`}
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FaSearch className={styles.searchIcons} />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mb-3 align-items-center">
          <div className="filter-sorts-containers d-flex align-items-center">
            <div className={styles.filterContainer}>
              <div className={`${styles.filterSortToggle} text-center`} onClick={() => setFilterOpen(!filterOpen)}>
                <FaFilter className={styles.filterSortIcon} /> Filter
              </div>
              {filterOpen && (
                <div className={`${styles.dropdownMenu} ${styles.show}`}>
                  {Object.entries(filterOptions).map(([key, option]) => (
                    <button key={key} className={styles.dropdownItem} onClick={() => handleFilterChange(key)}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`${styles.filterContainer} ms-2`}>
              <div className={`${styles.filterSortToggle} text-center`} onClick={() => setSortOpen(!sortOpen)}>
                <FaBars className={styles.filterSortIcon} /> Sort
              </div>
              {sortOpen && (
                <div className={`${styles.dropdownMenu} ${styles.show}`}>
                  <button className={styles.dropdownItem} onClick={() => handleSortChange('asc')}>
                    Sort (Oldest First)
                  </button>
                  <button className={styles.dropdownItem} onClick={() => handleSortChange('desc')}>
                    Sort (Newest First)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <ul className={`nav ${styles.navTabs} mb-3`}>
          <li className={styles.navItem}>
            <button
              className={`${styles.navLink} ${activeTab === 'allRead' ? 'active' : ''}`}
              onClick={() => handleTabClick('allRead')}
            >
              All read issues
            </button>
          </li>
          <li className={styles.navItem}>
            <button
              className={`${styles.navLink} ${activeTab === 'unread' ? 'active' : ''}`}
              onClick={() => handleTabClick('unread')}
            >
              Unread issues
            </button>
          </li>
        </ul>

        <table className="table table-borderless">
          <tbody>
            {sortedNotifications.length > 0 ? (
              sortedNotifications.map((notification) => (
                <tr key={notification.notification_ID} className={styles.notificationRows}>
                  <td className="d-flex align-items-center">
                    <FaBell className={`${styles.notificationIcons} me-2`} />
                    <div>
                      {formatMessage(notification.message)}
                      <button onClick={() => markAsRead(notification.notification_ID)}>Mark as Read</button>
                    </div>
                  </td>
                  <td>
                    <small className={styles.notificationTimestamps}>{formatTimestamp(notification.timestamp)}</small>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className={styles.textCenter}>
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
