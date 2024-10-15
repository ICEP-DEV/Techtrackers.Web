import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeTechnician.css'; // Assuming the styles are in this CSS file

const WelcomeTechnician = () => {
    return (
        <div className="main-content">
          {/* Top Container */}
          <div className="top-container">
            <h2>WELCOME, TECHNICIAN!</h2>
            <div className="status-cards">
              <div className="card completed">
                <h3>25</h3>
                <p>COMPLETED</p>
              </div>
              <div className="card in-progress">
                <h3>12</h3>
                <p>IN PROGRESS</p>
              </div>
              <div className="card on-hold">
                <h3>2</h3>
                <p>ON HOLD</p>
              </div>
              <div className="card pending">
                <h3>2</h3>
                <p>PENDING</p>
              </div>
              <div className="card upcoming-tasks">
                <a to="/upcoming-tasks">
                  <h3>UPCOMING TASKS</h3>
                  <p>You have 2 new issues assigned to you.</p>
                </a>
              </div>
              <div className="card update-status">
                <a to="/update-status">
                  <h3>UPDATE STATUS</h3>
                  <p>Update the issue status of pending, ongoing or resolved cases.</p>
                </a>
              </div>
            </div>
          </div>
    
          {/* Bottom Container */}
          <div className="bottom-container">
            {/* Active Tasks Section */}
            <div className="active-tasks">
              <h3>Active Tasks</h3>
              <div className="task-cards">
                <div className="task-card high">
                  <h4>Server Downtime</h4>
                  <p>Priority: HIGH</p>
                  <p>Status: Pending</p>
                  <p>Time: 09:48</p>
                </div>
                <div className="task-card medium">
                  <h4>Unable to Log into HR Portal</h4>
                  <p>Priority: MEDIUM</p>
                  <p>Status: Pending</p>
                  <p>Time: 09:48</p>
                </div>
                <div className="task-card high">
                  <h4>Printer Not Working</h4>
                  <p>Priority: HIGH</p>
                  <p>Status: In Progress</p>
                  <p>Time: Yesterday</p>
                </div>
                <div className="task-card low">
                  <h4>Low Disk Space</h4>
                  <p>Priority: LOW</p>
                  <p>Status: In Progress</p>
                  <p>Time: 18/08/2024</p>
                </div>
              </div>
            </div>
    
            {/* Reviews Section */}
            <div className="my-reviews">
              <div className="review-box">
              <h3>My Reviews</h3>
              <div className="rating">
                <h4>3.0 Rating</h4>
                <div className="stars">
                  <span>★</span><span>★</span><span>★</span><span>☆</span><span>☆</span>
                </div>
                <div className="rating-breakdown">
                  <div className="rating-item">
                    <span>5</span>
                    <div className="bar"><div className="filled" style={{ width: '15%' }}></div></div>
                    <span>3</span>
                  </div>
                  <div className="rating-item">
                    <span>4</span>
                    <div className="bar"><div className="filled" style={{ width: '25%' }}></div></div>
                    <span>4</span>
                  </div>
                  <div className="rating-item">
                    <span>3</span>
                    <div className="bar"><div className="filled" style={{ width: '30%' }}></div></div>
                    <span>6</span>
                  </div>
                  <div className="rating-item">
                    <span>2</span>
                    <div className="bar"><div className="filled" style={{ width: '20%' }}></div></div>
                    <span>4</span>
                  </div>
                  <div className="rating-item">
                    <span>1</span>
                    <div className="bar"><div className="filled" style={{ width: '10%' }}></div></div>
                    <span>2</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default WelcomeTechnician;





