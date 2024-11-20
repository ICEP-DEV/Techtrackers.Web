import { React, useState } from "react";
import bell from '../images/bell.png';
import filter from '../images/filter_icon.png';
import list from '../images/list_icon.png';
import profile from '../images/profile_icon.png';
import search from '../images/search.png';
import styles from '../SidebarCSS/NotificationsStyle.module.css';
import { useNavigate } from "react-router-dom";
import useIssues from "./useIssues";
import chatIcon from "../images/chatIcon.png";

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const { issues } = useIssues();

  const navigate = useNavigate();

  const handleIssueClick = (issue) => {
    navigate(`/issues/${issue.id}`); // Pass the issue data
  };

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to issue',
      staffName: 'John Doe',
      issue: 'Issue Title: Server Downtime in Data Center',
      issueId: 'IT-P1-1220',
      time: '12:18',
    },
    {
      id: 2,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to issue',
      staffName: 'Themba Zwane',
      issue: 'Issue Title: Unable to log into HR Portal',
      issueId: 'HR-P1-1221',
      time: '12:16',
    },
    {
      id: 3,
      type: 'resolution',
      sender: 'Mike Jones',
      content: 'confirmed issue ',
      status: 'resolved',
      issueId: 'IT-P2-1225',
      time: 'Yesterday',
    },

    {
      id: 4,
      type: 'assignment',
      sender: 'Zinhle Ngidi',
      content: 'has assigned you to issue',
      staffName: 'Andile Zondo',
      issue: 'Issue: Title: Connectivity Issue',
      issueId: 'FI-P2-1223',
      time: '2024-08-18',
    },
    {
      id: 5,
      type: 'collaboration',
      sender: 'Mike Mdluli',
      content: 'invited you to collaborate with them',
      issue: 'Issue Title: Maintenance Request',
      action: 'View Collaboration Requests',
      time: '2024-08-14',
    },
    {
      id: 6,
      type: 'collaboration response',
      sender: 'Abel Makamu',
      content: 'accepted your collaboration request for issue ',
      staffName: 'John Doe',
      issue: 'Issue Title: 	Network Issue',
      issueId: 'F1-P1-1226',
      time: '15:43'
    },
  ];

  const formatDate = (timeString) => {
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
    const fullContent = `${notification.sender} ${notification.content} ${notification.staffName || ''} ${notification.issue || ''}`.toLowerCase();
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
        return 'black'; // Default color if no status is provided
    }
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
                  {notification.content}{' '}
                  {notification.issueId && <span><strong>{notification.issueId}</strong></span>}
                  {notification.status && (
                    <span style={{ color: getStatusColor(notification.status) }}>
                      { <strong> {notification.status}</strong>}
                    </span>
                  )}
                </span>
              </p>
              {notification.staffName && (
                <p className={styles.notificationStaffName}>{notification.staffName}</p>
              )}
              {notification.issue && (
                <p className={styles.notificationIssue}>{notification.issue}</p>
              )}
              {notification.action && (
                <p className={styles.notificationAction} onClick={() => navigate(`/collab`)}>{notification.action}</p>
              )}
            </div>
            <div className={styles.notificationMeta}>
              <span className={styles.notificationTime}>{notification.time}</span>
              {notification.type !== 'collaboration' && notification.type !== 'collaboration response'&&(
                <button className={styles.notificationViewButton} onClick={() => navigate(`/issues/${notification.issueId}`)}>
                  View
                </button>
              )}
              {notification.type == 'collaboration response' && (
                <div className={styles.techColabBtns}>
                <button className={styles.notificationViewButton} onClick={() => navigate(`/issues/${notification.issueId}`
                )}>
                  View
                </button>
                <button className={styles.techChatBtn} 
                onClick={() => navigate(`/tech2techchat`)}>
                  <img src={chatIcon} width="20" height="20" alt="Chat Icon"/> Tech-2-Tech
                </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
