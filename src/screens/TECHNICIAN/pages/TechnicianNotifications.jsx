import { React, useState, useEffect } from "react";
import bell from '../images/bell.png';
import filter from '../images/filter_icon.png';
import list from '../images/list_icon.png';
import profile from '../images/profile_icon.png';
import search from '../images/search.png';
import styles from '../SidebarCSS/NotificationsStyle.module.css';
import { useNavigate } from "react-router-dom";

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

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return new Date(0); // Default to epoch time if missing
    }
    return new Date(timestamp); // Fallback for standard date strings
  };

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

  // Combine filter, search, and sort logic in one place
  const filteredNotifications = notifications
    .filter(notification => {
      // Concatenate the necessary fields for searching
      const fullContent = [
        notification.issueId,
        notification.issueTitle,
        notification.type,
        notification.notificationType,  // Adding notificationType as well
        notification.location,            // Add location to the search fields
        notification.priority,            // Add priority to the search fields
      ]
        .filter(Boolean) // Remove undefined/null values
        .join(' ') // Join the fields into one string
        .toLowerCase(); // Convert to lowercase for case-insensitive search

      // Check if the search query is a substring of the concatenated fields
      return fullContent.includes(searchQuery.toLowerCase()) && 
             (filterType ? notification.type === filterType : true);
    })
    .sort((a, b) => {
      const dateA = formatDate(a.timestamp);
      const dateB = formatDate(b.timestamp);

      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else if (sortOrder === 'oldest') {
        return dateA - dateB;
      }
      return 0; // Default
    });

  const handleIssueClick = (issueId) => {
    localStorage.setItem("selected_log_id", issueId); // Store the issueId in local storage
    navigate(`/techniciandashboard/issues/${issueId}`); // Navigate to IssueDetails page
  };

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notificationsHeader}>
        <h2 className={styles.notificationsTitle}>
          <img src={bell} alt="Bell" height={30}/> NOTIFICATIONS
        </h2>
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
          <div className={styles.headerRight}>
            <div className={styles.notificationDropdown}>
              <button className={styles.theSearchFilterButton}><img src={filter} alt="Filter" height={15} /> Filter </button>
              <div className={styles.notificationDropdownContent}>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('')}>All</div>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('assignment')}>Assignment</div>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('resolution')}>Resolution</div>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('collaboration')}>Collaboration</div>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('ALERT')}>Alert</div>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('INFORMATION')}>Information</div>
                <div className={styles.notificationDropdownItem} onClick={() => setFilterType('WARNING')}>Warning</div>
              </div>
            </div>
            <div className={styles.notificationDropdown}>
              <button className={styles.theSortButton}><img src={list} alt="Sort" height={15}/> Sort</button>
              <div className={styles.notificationDropdownContent}>
                <div className={styles.notificationDropdownItem} onClick={() => setSortOrder('newest')}>Newest First</div>
                <div className={styles.notificationDropdownItem} onClick={() => setSortOrder('oldest')}>Oldest First</div>
                <div className={styles.notificationDropdownItem} onClick={() => setSortOrder('')}>Default</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.notificationsList}>
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className={styles.notificationItem}>
            <div className={styles.notificationProfile}>
              <img src={profile} alt="Profile" height={50}/>
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
              <span className={styles.notificationTime}>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
                }).format(formatDate(notification.timestamp))}
              </span>
              <button className={styles.notificationViewButton} onClick={() => handleIssueClick(notification.issueId)}>
                View
              </button>
              <span className={styles.notificationTime2}>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric', month: 'short', day: '2-digit'
                }).format(formatDate(notification.timestamp))}
                <br />
                {new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit', minute: '2-digit'
                }).format(formatDate(notification.timestamp))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;