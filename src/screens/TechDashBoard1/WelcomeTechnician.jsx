import React, { useState } from 'react';
import './WelcomeTechnician.css'; // Assuming the styles are in this CSS file
import arrow from './icons/Arrow.png';
import check_circle from './icons/Check.png';

const WelcomeTechnician = () => {
  // State for hardcoded data that will eventually be pulled from the backend
  const [tasks, setTasks] = useState([
    { title: "Server Downtime", priority: "HIGH", status: "Pending", time: "09:48" },
    { title: "Unable to Log into HR Portal", priority: "MEDIUM", status: "Pending", time: "09:48" },
    { title: "Printer Not Working", priority: "HIGH", status: "In Progress", time: "Yesterday" },
    { title: "Low Disk Space", priority: "LOW", status: "Completed", time: "18/08/2024" }
  ]);

  const [statusCounts, setStatusCounts] = useState({
    completed: 25,
    inProgress: 12,
    onHold: 2,
    pending: 2,
  });

  const [rating, setRating] = useState({
    overall: 3.0,
    stars: [3, 4, 6, 4, 2]
  });

  return (
    <div className="main-content1">
      {/* Top Container */}
      <div className="top-container">
        <h2 className='welcome-title'>WELCOME, TECHNICIAN!</h2>
        <div className='cards-left'>
          <div className="status-cards">
            <div className="card-left">
              <p><strong>{statusCounts.completed} </strong>  COMPLETED</p>
            </div>
            <div className="card-left">
              <p><strong>{statusCounts.inProgress} </strong> IN PROGRESS</p>
            </div>
          </div>
          <div className='status-cards2'>
            <div className="card-left">
              <p><strong>{statusCounts.onHold} </strong>  ON HOLD</p>
            </div>
            <div className="card-left">
              <p><strong>{statusCounts.pending} </strong> PENDING</p>
            </div>
          </div>
        </div>

        <div className='cards-right'>
          <div className="upcoming-tasks">
              <h4><img src={arrow} alt="arrow" height={50} /> UPCOMING TASKS</h4>
              <br />
              <p>You have 2 new issues assigned to you.</p>
          </div>
          <div className="update-status">
              <h4><img src={check_circle} alt="check" height={50} /> UPDATE STATUS</h4>
              <p>Update the issue status of pending, ongoing or resolved cases.</p>
          </div>
        </div>
      </div>

      {/* Bottom Container */}
      <div className="bottom-container">
        {/* Active Tasks Section */}
        <div className="active-tasks">
          <h3 className="active-title">Active Tasks</h3>
          <div className="task-cards">
            {tasks.map((task, index) => (
              <div key={index} className={`task-card ${task.priority.toLowerCase()}`}>
                <h4 className='issues-title'>{task.title}</h4>
                <div><p>Priority: {task.priority}</p></div>
                <p>{task.status}</p>
                <div className={`dashboard-progress-bar ${task.status.toLowerCase().replace(' ', '-')}`}></div>
                <p className='time'>{task.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="my-reviews">
          <div className="review-box">
            <h3 className='review-title'>My Reviews</h3>
            <div className="rating">
              <h4 className='rating-title'>{rating.overall} Rating</h4>
              <div className="stars">
                {Array(5).fill().map((_, i) => (
                  <span key={i}>{i < Math.round(rating.overall) ? '★' : '☆'}</span>
                ))}
              </div>
              <div className="rating-breakdown">
                {rating.stars.map((count, index) => (
                  <div className="rating-item" key={index}>
                    <span>{5 - index}</span>
                    <div className="bar">
                      <div className="filled" style={{ width: `${count * 10}%` }}></div>
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
