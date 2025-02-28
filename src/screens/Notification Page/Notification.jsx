import React, { useState } from "react";
import styles from "./Notification.module.css"; // CSS Module

const Notifications = ({ isSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterTime, setFilterTime] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Issue: Internal Issue has been assigned to a technician, please keep track of the status.",
      timestamp: new Date().getTime() - 1000000,
      read: false,
    },
    {
      id: 2,
      message: "Issue: Printer not working has been Re-opened for further investigation.",
      timestamp: new Date().getTime() - 10000000,
      read: false,
    },
    {
      id: 3,
      message: "Issue: Printer not working has been Resolved. Make sure you confirm status.",
      timestamp: new Date().getTime() - 100000000,
      read: true,
    },
  ]);

  const filterOptions = {
    all: { label: "All", filter: () => true },
    today: {
      label: "Today",
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        return notificationDate.toDateString() === now.toDateString();
      },
    },
    thisWeek: {
      label: "This Week",
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return notificationDate >= startOfWeek;
      },
    },
    thisMonth: {
      label: "This Month",
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        return notificationDate.getMonth() === now.getMonth() && notificationDate.getFullYear() === now.getFullYear();
      },
    },
    older: {
      label: "Older",
      filter: (notification) => {
        const now = new Date();
        const notificationDate = new Date(notification.timestamp);
        return notificationDate < new Date(now.setDate(now.getDate() - 30));
      },
    },
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredNotifications = notifications
    .filter((notif) =>
      activeTab === "unread" ? !notif.read : activeTab === "all" || notif.read
    )
    .filter((notif) => filterTime === "All" || filterOptions[filterTime].filter(notif))
    .filter((notif) => notif.message.toLowerCase().includes(searchTerm));

  const sortedNotifications = [...filteredNotifications].sort((a, b) =>
    sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleString();
  };

  return (
    <div className={`${styles.notificationContainer} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          <i className={`fas fa-bell ${styles.icon}`}></i>
          <h2>Notifications</h2>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
        </div>

        <div className={styles.dropdownContainer}>
          <button className={styles.filterButton} onClick={() => setFilterDropdownOpen(!isFilterDropdownOpen)}>
            <i className={`fas fa-filter ${styles.filterIcon}`}></i>
            Filter: {filterTime}
            <i className={`fas fa-caret-down ${styles.dropdownIcon}`}></i>
          </button>
          {isFilterDropdownOpen && (
            <ul className={styles.dropdown}>
              {Object.keys(filterOptions).map((key) => (
                <li key={key} onClick={() => setFilterTime(key)}>
                  {filterOptions[key].label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.dropdownContainer}>
          <button className={styles.sortButton} onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}>
            <i className={`fas fa-sort ${styles.sortIcon}`}></i>
            Sort: {sortOrder}
            <i className={`fas fa-caret-down ${styles.dropdownIcon}`}></i>
          </button>
          {isSortDropdownOpen && (
            <ul className={styles.dropdown}>
              <li onClick={() => setSortOrder("newest")}>Newest</li>
              <li onClick={() => setSortOrder("oldest")}>Oldest</li>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`} onClick={() => setActiveTab("all")}>
          All
        </button>
        <button className={`${styles.tab} ${activeTab === "unread" ? styles.active : ""}`} onClick={() => setActiveTab("unread")}>
          Unread
        </button>
      </div>

      <div className={styles.content}>
        {sortedNotifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          sortedNotifications.map((notif) => (
            <div key={notif.id} className={styles.notificationItem} onClick={() => markAsRead(notif.id)}>
              <i className={`fas fa-bell ${notif.read ? styles.readIcon : styles.unreadIcon}`}></i>
              <div className={styles.notificationText}>
                <p>{notif.message}</p>
                <span className={styles.notificationTime}>{formatTimestamp(notif.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
