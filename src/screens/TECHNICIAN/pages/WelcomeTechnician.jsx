import React, { useState } from 'react';
import styles from '../SidebarCSS/WelcomeTechnician.module.css';
import arrow from '../images/Arrow.png';
import check_circle from '../images/Check.png';

const WelcomeTechnician = () => {
  // State for hardcoded data that will eventually be pulled from the backend
  const [tasks, setTasks] = useState([
    { title: "Server Downtime", priority: "HIGH", status: "Pending", time: "09:48" },
    { title: "Unable to Log into HR Portal", priority: "MEDIUM", status: "Pending", time: "09:48" },
    { title: "Printer Not Working", priority: "HIGH", status: "InProgress", time: "Yesterday" },
    { title: "Low Disk Space", priority: "LOW", status: "Resolved", time: "18/08/2024" }
  ]);

  const [statusCounts, setStatusCounts] = useState({
    resolved: 25,
    inProgress: 12,
    onHold: 2,
    pending: 2,
  });
  const [rating, setRating] = useState({
    overall: 3.0,
    stars: [3, 4, 6, 4, 2]
  });

  return (
    <div className={styles.mainContent1}>
      {/* Top Container */}
      <div className={styles.topContainer}>
        <h2 className={styles.welcomeTitle}>WELCOME, TECHNICIAN!</h2>
      <div className={styles.cardsLeft}>
          <div className={styles.statusCards}>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.resolved} </strong>  RESOLVED</p>
            </div>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.inProgress} </strong> IN PROGRESS</p>
            </div>
          </div>
          <div className={styles.statusCards2}>
            <div className={styles.cardLeft}>
              <p><strong>{statusCounts.onHold} </strong>  ON HOLD</p>
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
