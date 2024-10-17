import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';//kushoda faTools
import '../ADMIN/Adminstyles/adminStyles.css'; // Import your styles

import totalIssuesIcon from './images/totalIssuesIcon.png';
import openIssuesIcon from './images/openIssuesIcon.png';

const WelcomeAdmin = () => {
    return (
        <div className="dashboard-container">
            {/* Welcome Section */}
            <h1 className="welcome-message">WELCOME, ADMIN!</h1>

            {/* Total Issues Section */}
            <div className="dashboard-card">
                <div className="card-icon">
                    <img src={totalIssuesIcon} alt="Total issues Icon" className="icon" />
                </div>
                <div className="card-content">
                    <h2 className="card-title">Total Issues</h2>
                    <p className="card-description">These are the total number of issues present.</p>
                </div>
            </div>

            {/* Open Issues Section */}
            <div className="dashboard-card">
                <div className="card-icon">
                    <img src={openIssuesIcon} alt="Open Issues Icon" className="icon" />
                </div>
                <div className="card-content">
                    <h2 className="card-title">Open Issues</h2>
                    <p className="card-description">These represent the total number of opened issues.</p>
                </div>
            </div>

            {/* Manage Technicians Section */}
            <div className="dashboard-card">
                <div className="card-icon">
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                </div>
                <div className="card-content">
                    <h2 className="card-title">Manage Technicians</h2>
                    <p className="card-description">View and manage all technicians.</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeAdmin;
