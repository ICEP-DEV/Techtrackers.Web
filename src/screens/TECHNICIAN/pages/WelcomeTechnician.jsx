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

  const [tasks, setTasks] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const storedTasks = JSON.parse(localStorage.getItem('Tech Issues')) || [];

    const lastTask = storedTasks[storedTasks.length - 1];  //Last task in the array

    setTasks(lastTask ? [lastTask] : []);   //Set tasks to the last task

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

        const resolvedData = await resolvedResponse.json();
        const inProgressData = await inProgressResponse.json();
        const onHoldData = await onHoldResponse.json();
        const pendingData = await pendingResponse.json();

        setStatusCounts({
          resolved: resolvedData,
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

  const task = localStorage.getItem("Tech Issues");


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
            <p>You have {statusCounts.pending} new issues assigned to you.</p>
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
              <div
                key={index}
                className={`${styles.taskCard} ${styles[task.priority.toLowerCase()]}`}
                onClick={() => handleViewClick(`${task.issueId}`)}
              >
                <h4 className={styles.issuesTitle}>{task.issueTitle}</h4>
                <p>Priority: {task.priority}</p>
                <p>Status: {task.status}</p>
                <p className={styles.date}>{task.issuedAt}</p>

                {/* Progress Bar */}
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBar}
                    style={{
                      width:
                        task.status === "ESCALATED"
                          ? "100%"
                          : task.status === "INPROGRESS"
                            ? "50%"
                            : task.status === "CLOSED"
                              ? "100%"
                            : task.status === "PENDING"
                              ? "25%"
                              : task.status === "RESOLVED"
                                ? "100%"
                                : "20%",
                      backgroundColor:
                        task.status === "ESCALATED"
                          ? "red"
                          : task.status === "INPROGRESS"
                            ? "#14788f"
                            : task.status === "CLOSED"
                              ? "#808080"
                            : task.status === "PENDING"
                              ? "#ffa007"
                              : task.status === "RESOLVED"
                                ? "#28a745"
                                : "#ccc",
                    }}
                  >
                    {/* Percentage Text */}
                    <span className={styles.progressText}>
                      {task.status === "ESCALATED"
                        ? "100%"
                        : task.status === "INPROGRESS"
                          ? "70%"
                          : task.status === "CLOSED"
                            ? "100%"
                          : task.status === "PENDING"
                            ? "25%"
                            : task.status === "RESOLVED"
                              ? "100%"
                              : "20%"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Reviews Section */}
        <div className={styles.myReviews}>
          <div className={styles.reviewBox}>
            <div className={styles.rating}>
              <h4 className={styles.reviewTitle}>My Reviews</h4>
              {(() => {
                const feedback = JSON.parse(localStorage.getItem("tech_feedback"));
                if (feedback) {
                  return (
                    <>
                      <div className={styles.stars}>
                        <h3>{feedback.averageRating} </h3>
                        <div>
                          {Array(5).fill().map((_, i) => (
                            <span key={i}>
                              {i < Math.round(feedback.averageRating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={styles.ratingBreakdown}>
                        {feedback.ratingsDistribution.map((item) => (
                          <div className={styles.ratingItem} key={item.rating}>
                            <span>{item.rating}</span>
                            <div className={styles.bar}>
                              <div
                                className={styles.filled}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span>{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                } /*else {
                  return <p>No reviews available.</p>;
                }*/
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTechnician;
