import React, { useState, useEffect } from 'react';
import styles from '../SidebarCSS/WelcomeTechnician.module.css';
import arrow from '../images/Arrow.png';
import check_circle from '../images/Check.png';
import { useNavigate } from 'react-router-dom';

const WelcomeTechnician = () => {
  // State for dynamic data
  const navigate = useNavigate();
  const [statusCounts, setStatusCounts] = useState({
    resolved: 0,
    inProgress: 0,
    onHold: 0,
    pending: 0,
  });

  const [tasks, setTasks] = useState([
    { title: "Server Downtime", priority: "HIGH", status: "Pending", time: "09:48" },
    { title: "Unable to Log into HR Portal", priority: "MEDIUM", status: "Pending", time: "09:48" },
    { title: "Printer Not Working", priority: "HIGH", status: "InProgress", time: "Yesterday" },
    { title: "Low Disk Space", priority: "LOW", status: "Resolved", time: "18/08/2024" },
  ]);

  const [rating, setRating] = useState({
    overall: 3.0,
    stars: [3, 4, 6, 4, 2],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        const technicianId = userInfo ? userInfo.userId : null;

        if (!technicianId) {
          throw new Error("Technician ID is missing");
        }

        // Fetching data from the backend
        const resolvedResponse = await fetch(
          `https://localhost:44328/api/Tech/CountResolvedLogs/${technicianId}/countResolved`
        );
        const inProgressResponse = await fetch(
          `https://localhost:44328/api/Tech/CountInProgressLogs/${technicianId}/countInProgress`
        );
        const onHoldResponse = await fetch(
          `https://localhost:44328/api/Tech/CountOnHoldLogs/${technicianId}/countOnHold`
        );
        const pendingResponse = await fetch(
          `https://localhost:44328/api/Tech/CountPendingLogs/${technicianId}/countPending`
        );

        if (
          !resolvedResponse.ok ||
          !inProgressResponse.ok ||
          !onHoldResponse.ok ||
          !pendingResponse.ok
        ) {
          throw new Error("Failed to fetch status counts");
        }

        // Parse JSON responses
        const resolvedData = await resolvedResponse.json();
        const inProgressData = await inProgressResponse.json();
        const onHoldData = await onHoldResponse.json();
        const pendingData = await pendingResponse.json();

        // Assuming each API returns an object like { status: "Resolved", count: 25 }
        setStatusCounts({
          resolved: resolvedData, // Extracting only the count
          inProgress: inProgressData,
          onHold: onHoldData,
          pending: pendingData,
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatusCounts();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleViewClick = (issueId) => {
    localStorage.setItem("selected_log_id", issueId); // Store the issueId in local storage
    navigate(`/techniciandashboard/issues/${issueId}`); // Navigate to IssueDetails page
  };

  return (
    <div className={styles.mainContent1}>
      {/* Top Container */}
      <div className={styles.topContainer}>
        <h2 className={styles.welcomeTitle}>WELCOME, TECHNICIAN!</h2>
        <div className={styles.cardsLeft}>
          <div className={styles.statusCards}>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.resolved}</strong> RESOLVED</p> {/* `statusCounts.resolved` is now a number */}
            </div>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.inProgress}</strong> IN PROGRESS</p>
            </div>
          </div>

          <div className={styles.statusCards2}>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.onHold} </strong> ON HOLD</p>
            </div>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.pending} </strong> PENDING</p>
            </div>
          </div>
        </div>

        <div className={styles.cardsRight}>
          <div className={styles.upcomingTasks}>
            <h4><img src={arrow} alt="arrow" height={50} /> UPCOMING TASKS</h4>
            <br />
            <p>You have 2 new issues assigned to you.</p>
          </div>
          <div className={styles.updateStatus}>
            <h4><img src={check_circle} alt="check" height={50} /> UPDATE STATUS</h4>
            <p>Update the issue status of pending, ongoing or resolved cases.</p>
          </div>
        </div>
      </div>

      {/* Bottom Container */}
      <div className={styles.bottomContainer}>
        {/* Active Tasks Section */}
        <div className={styles.activeTasks}>
          <h3 className={styles.activeTitle}>Active Tasks</h3>
          <div className={styles.taskCards}>
            {tasks.map((task, index) => (
              <div key={index} className={`${styles.taskCard} ${styles[task.priority.toLowerCase()]}`}>
                <h4 className={styles.issuesTitle}>{task.title}</h4>
                <div><p>Priority: {task.priority}</p></div>
                <p>{task.status}</p>
                <div className={`${styles.dashboardProgressBar} ${styles[task.status.toLowerCase().replace(' ', '-')]}`}></div>
                <p className={styles.time}>{task.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles.myReviews}>
          <div className={styles.reviewBox}>
            <h3 className={styles.reviewTitle}>My Reviews</h3>
            <div className={styles.rating}>
              <h4 className={styles.ratingTitle}>{rating.overall} Rating</h4>
              <div className={styles.stars}>
                {Array(5).fill().map((_, i) => (
                  <span key={i}>{i < Math.round(rating.overall) ? '★' : '☆'}</span>
                ))}
              </div>
              <div className={styles.ratingBreakdown}>
                {rating.stars.map((count, index) => (
                  <div className={styles.ratingItem} key={index}>
                    <span>{5 - index}</span>
                    <div className={styles.bar}>
                      <div className={styles.filled} style={{ width: `${count * 10}%` }}></div>
                    </div>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTechnician;
