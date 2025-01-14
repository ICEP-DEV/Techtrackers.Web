import { React, useState, useEffect } from "react";
import bell from "../../images/bell.png";
import filter from "../../images/filter_icon.png";
import list from "../../images/list_icon.png";
import profile from "../../images/profile_icon.png";
import search from "../../images/search.png";
import "./NotificationsStyle.css";
import { useNavigate } from "react-router-dom";
import useIssues from "../All Issue and View Page/useIssues";

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "assignment",
      sender: "Zinhle Ngidi",
      content: "has assigned you to issue",
      issue: "Server Downtime in Data Center",
      issueId: "IT-P1-1221",
      time: "12:18",
      priority: "high",
      timeRemaining: 3600, // 1 hour countdown (in seconds)
    },
    {
      id: 2,
      type: "assignment",
      sender: "Zinhle Ngidi",
      content: "has assigned you to issue",
      issue: "Unable to log into HR Portal",
      issueId: "HR-P1-1225",
      time: "12:16",
      priority: "medium",
      timeRemaining: 1800, // 30 minutes countdown (in seconds)
    },
    {
      id: 3,
      type: "resolution",
      sender: "Mike Jones",
      content: "confirmed issue",
      status: "resolved",
      issueId: "IT-P2-1225",
      time: "Yesterday",
      priority: "low",
      timeRemaining: null, // No countdown for resolved issues
    },
    {
      id: 4,
      type: "assignment",
      sender: "Zinhle Ngidi",
      content: "has assigned you to issue",
      issue: "Connectivity Issue",
      issueId: "FI-P2-1223",
      time: "2024-08-18",
      priority: "medium",
      timeRemaining: 7200, // 2 hours countdown (in seconds)
    },
    {
      id: 5,
      type: "collaboration",
      sender: "Mike Mdluli",
      content: "invited you to collaborate with them",
      issue: "Maintenance Request",
      issueId: "FI-P2-1224",
      time: "2024-08-14",
      priority: "low",
      timeRemaining: null, // No countdown for collaborations
    },
  ]);

  const { issues } = useIssues();
  const navigate = useNavigate();

  const handleIssueClick = (issueId) => {
    navigate(`/issues/${issueId}`);
  };

  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => {
          if (notification.timeRemaining && notification.timeRemaining > 0) {
            // Debug log to check countdown
            console.log(
              `Updating countdown for notification ${notification.id}: ${notification.timeRemaining}`
            );
            return {
              ...notification,
              timeRemaining: notification.timeRemaining - 1, // Decrement countdown
            };
          }
          return notification; // No countdown for 'null' or expired
        })
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Format time remaining (seconds -> hh:mm:ss)
  const formatRemainingTime = (seconds) => {
    if (seconds <= 0) return "Expired";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Format time of notification (e.g., time ago: 2 hours ago)
  const formatTime = (timeString) => {
    const now = new Date();
    let date;

    if (timeString.toLowerCase() === "yesterday") {
      date = new Date();
      date.setDate(date.getDate() - 1);
    } else if (/^\d{2}:\d{2}$/.test(timeString)) {
      date = new Date();
      const [hours, minutes] = timeString.split(":").map(Number);
      date.setHours(hours, minutes, 0, 0);
    } else {
      date = new Date(timeString);
    }

    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  };

  const filteredNotifications = notifications.filter((notification) => {
    const fullContent = `${notification.sender} ${notification.content} ${
      notification.subject || ""
    } ${notification.issue || ""}`.toLowerCase();
    return (
      fullContent.includes(searchQuery.toLowerCase()) &&
      (filterType ? notification.type === filterType : true)
    );
  });

  const sortedNotifications = filteredNotifications.sort((a, b) => {
    const dateA = formatTime(a.time);
    const dateB = formatTime(b.time);

    if (sortOrder === "newest") {
      return dateB - dateA;
    } else if (sortOrder === "oldest") {
      return dateA - dateB;
    }
    return 0;
  });

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1 className="notifications-title">
          <img src={bell} alt="Bell" /> NOTIFICATIONS
        </h1>
        <div className="filter-container">
          <div className="the-search-container">
            <input
              type="text"
              placeholder="Search"
              className="the-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={search} className="the-search-icon" alt="Search" />
          </div>
          <div className="notification-dropdown">
            <button className="the-filter-button">
              Filter <img src={filter} alt="Filter" />
            </button>
            <div className="notification-dropdown-content">
              <div
                className="notification-dropdown-item"
                onClick={() => setFilterType("assignment")}
              >
                Assignment
              </div>
              <div
                className="notification-dropdown-item"
                onClick={() => setFilterType("resolution")}
              >
                Resolution
              </div>
              <div
                className="notification-dropdown-item"
                onClick={() => setFilterType("collaboration")}
              >
                Collaboration
              </div>
              <div
                className="notification-dropdown-item"
                onClick={() => setFilterType("")}
              >
                All
              </div>
            </div>
          </div>
          <div className="notification-dropdown">
            <button className="the-sort-button">
              Sort <img src={list} alt="Sort" />
            </button>
            <div className="notification-dropdown-content">
              <div
                className="notification-dropdown-item"
                onClick={() => setSortOrder("newest")}
              >
                Newest First
              </div>
              <div
                className="notification-dropdown-item"
                onClick={() => setSortOrder("oldest")}
              >
                Oldest First
              </div>
              <div
                className="notification-dropdown-item"
                onClick={() => setSortOrder("")}
              >
                Default
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="notifications-list">
        {sortedNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-profile">
              <img src={profile} alt="Profile" />
            </div>
            <div className="notification-content">
              <p className="notification-sender">
                {notification.sender}{" "}
                <span className="notification-message">
                  {notification.content}
                </span>
              </p>
              {notification.subject && (
                <p className="notification-subject">{notification.subject}</p>
              )}
              {notification.issue && (
                <p className="notification-issue">
                  {notification.issue}{" "}
                  {notification.timeRemaining != null &&
                  notification.timeRemaining > 0 ? (
                    <span className="countdown">
                      {formatRemainingTime(notification.timeRemaining)}
                    </span>
                  ) : (
                    <span className="countdown expired">Expired</span>
                  )}
                </p>
              )}
            </div>
            <div className="notification-meta">
              <span className="notification-time">
                {formatTime(notification.time)}
              </span>
              {notification.type !== "resolution" &&
                notification.type !== "collaboration" && (
                  <button
                    className="notification-view-button"
                    onClick={() => handleIssueClick(notification.issueId)}
                  >
                    View
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
