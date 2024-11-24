import React, { useState } from "react";
import styles from "./Notification.module.css"; // CSS Module

const Notifications = ({ isSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterTime, setFilterTime] = useState("All");
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message:
        "Issue: Internal Issue has been assigned to a technician, please keep track of the status.",
      time: "1 day",
      read: false,
    },
    {
      id: 2,
      message:
        "Issue: Printer not working has been Re-opened for further investigation. You will receive updates as we progress.",
      time: "1mon",
      read: false,
    },
    {
      id: 3,
      message:
        "Issue: Printer not working has been Resolved. Make sure you confirm status.",
      time: "1mon",
      read: true,
    },
  ]);

  // Handle Tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle Sort Order
  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortDropdownOpen(false);

    const sortedNotifications = [...notifications].sort((a, b) => {
      // Customize sorting based on `time` or other logic
      if (order === "newest") {
        return a.time > b.time ? -1 : 1; // Sort descending
      } else {
        return a.time > b.time ? 1 : -1; // Sort ascending
      }
    });

    setNotifications(sortedNotifications);
  };

  // Handle Filter Change
  const handleFilterChange = (time) => {
    setFilterTime(time);
    setFilterDropdownOpen(false);
  };

  // Mark Notification as Read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
  };

  // Filter Notifications
  const filterNotifications = () => {
    if (filterTime === "All") return notifications;

    const filterMapping = {
      "Last 1 day": ["1 day"],
      "Last 1 week": ["1 day", "2 day", "3 day", "4 day", "5 day", "6 day", "7 day"],
      "Last 1 month": ["1mon"],
    };

    return notifications.filter((notif) =>
      filterMapping[filterTime].includes(notif.time)
    );
  };

  // Apply Filter & Tab Logic
  const filteredNotifications = filterNotifications().filter((notif) =>
    activeTab === "unread" ? !notif.read : activeTab === "all" || notif.read
  );

  return (
<div className={`${styles.notificationContainer} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      {/* Header */}
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
          />
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
        </div>

        {/* Filter Dropdown */}
        <div className={styles.dropdownContainer}>
          <button
            className={styles.filterButton}
            onClick={() => setFilterDropdownOpen(!isFilterDropdownOpen)}
          >
            <i className={`fas fa-filter ${styles.filterIcon}`}></i>
            Filter: {filterTime}
            <i className={`fas fa-caret-down ${styles.dropdownIcon}`}></i>
          </button>
          {isFilterDropdownOpen && (
            <ul className={styles.dropdown}>
              <li onClick={() => handleFilterChange("All")}>All</li>
              <li onClick={() => handleFilterChange("Last 1 day")}>
                Last 1 day
              </li>
              <li onClick={() => handleFilterChange("Last 1 week")}>
                Last 1 week
              </li>
              <li onClick={() => handleFilterChange("Last 1 month")}>
                Last 1 month
              </li>
            </ul>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className={styles.dropdownContainer}>
          <button
            className={styles.sortButton}
            onClick={() => setSortDropdownOpen(!isSortDropdownOpen)}
          >
            <i className={`fas fa-sort ${styles.sortIcon}`}></i>
            Sort: {sortOrder}
            <i className={`fas fa-caret-down ${styles.dropdownIcon}`}></i>
          </button>
          {isSortDropdownOpen && (
            <ul className={styles.dropdown}>
              <li onClick={() => handleSortChange("newest")}>Newest</li>
              <li onClick={() => handleSortChange("oldest")}>Oldest</li>
            </ul>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "all" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("all")}
        >
          All
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "unread" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("unread")}
        >
          Unread
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {filteredNotifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={styles.notificationItem}
              onClick={() => markAsRead(notif.id)}
            >
              <i
                className={`fas fa-bell ${
                  notif.read ? styles.readIcon : styles.unreadIcon
                }`}
              ></i>
              <div className={styles.notificationText}>
                <p>{notif.message}</p>
                <span className={styles.notificationTime}>{notif.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
