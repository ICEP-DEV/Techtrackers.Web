import { React, useState, useEffect } from "react";
import bell from '../images/bell.png';
import filter from '../images/filter_icon.png';
import list from '../images/list_icon.png';
import profile from '../images/profile_icon.png';
import search from '../images/search.png';
import styles from '../SidebarCSS/NotificationsStyle.module.css';
import { useNavigate } from "react-router-dom";
import chatIcon from "../images/chatIcon.png";

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        const userId = userInfo ? userInfo.userId : null;

        if (!userId) {
          throw new Error("User ID not found in localStorage.");
        }

        const response = await fetch(`https://localhost:44328/api/Log/GetNotifications/${userId}?onlyUnread=false`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications from the API.");
        }

        const data = await response.json();
        setNotifications(data); // Update state with API data

      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const formatDate = (timeString) => {
    if (!timeString) {
      // Return a default date or handle the missing time appropriately
      return new Date(0); // Default to epoch time (January 1, 1970)
    }
  
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
    const fullContent = `${notification.sender} ${notification.content || ''} ${notification.staffName || ''} ${notification.issue || ''}`.toLowerCase();
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
        return 'black';
    }
  };

  // const handleIssueClick = (issueId) => {
  //   navigate(`/techniciandashboard/issues/${issueId}`);
  // };

  const handleIssueClick = (issueId) => {
    localStorage.setItem("selected_log_id", issueId); // Store the issueId in local storage
    navigate(`/techniciandashboard/issues/${issueId}`); // Navigate to IssueDetails page
  };

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notificationsHeader}>
        <h1 className={styles.notificationsTitle}>
          <img src={bell} alt="Bell" /> NOTIFICATIONS
        </h1>
        <div className={styles.filterContainer}>
          <div className={styles.theSearchContainer}>
            <input 
              type="text" 
              placeholder="Search" 
              className={styles.theSearchInput} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <img src={search} className={styles.theSearchIcon} alt="Search" />
          </div>
          <div className={styles.notificationDropdown}>
            <button className={styles.theSearchFilterButton}>Filter <img src={filter} alt="Filter" /></button>
            <div className={styles.notificationDropdownContent}>
              <div className={styles.notificationDropdownItem} onClick={() => setFilterType('assignment')}>Assignment</div>
              <div className={styles.notificationDropdownItem} onClick={() => setFilterType('resolution')}>Resolution</div>
              <div className={styles.notificationDropdownItem} onClick={() => setFilterType('collaboration')}>Collaboration</div>
              <div className={styles.notificationDropdownItem} onClick={() => setFilterType('')}>All</div>
            </div>
          </div>
          <div className={styles.notificationDropdown}>
            <button className={styles.theSortButton}>Sort <img src={list} alt="Sort" /></button>
            <div className={styles.notificationDropdownContent}>
              <div className={styles.notificationDropdownItem} onClick={() => setSortOrder('newest')}>Newest First</div>
              <div className={styles.notificationDropdownItem} onClick={() => setSortOrder('oldest')}>Oldest First</div>
              <div className={styles.notificationDropdownItem} onClick={() => setSortOrder('')}>Default</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.notificationsList}>
        {sortedNotifications.map((notification) => (
          <div key={notification.id} className={styles.notificationItem}>
            <div className={styles.notificationProfile}>
              <img src={profile} alt="Profile" />
            </div>
            <div className={styles.notificationContent}>
              <p className={styles.notificationCender}>
                {notification.sender}{' '}
                <span className={styles.notificationMessage}>
                  {notification.message}{' '}
                  {notification.type && <span><strong>{notification.type}</strong></span>}
                  {notification.status && (
                    <span style={{ color: getStatusColor(notification.status) }}>
                      <strong>{notification.status}</strong>
                    </span>
                  )}
                </span>
              </p>
              {notification.staffName && (
                <p className={styles.notificationStaffName}>{notification.staffName}</p>
              )}
              {notification.issue && (
                <p className={styles.notificationIssue}>{notification.issueTitle}</p>
              )}
              {notification.action && (
                <p className={styles.notificationAction} onClick={() => navigate(`/reviews`)}>{notification.action}</p>
              )}
            </div>
            <div className={styles.notificationMeta}>
              <span className={styles.notificationTime}>{notification.time}</span>
              <button className={styles.notificationViewButton} onClick={() => handleIssueClick(notification.issueId)}>
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
