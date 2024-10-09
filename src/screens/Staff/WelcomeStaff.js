import React from 'react';
import '../Staff/StaffStyle/WelcomeStaff.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const WelcomeStaff = () => {

    const navigate = useNavigate();

    const handleLogIssue = () => {
        navigate('/staffdashboard/logissueform');
    }

    const handleNotifications = () => {
        navigate('/staffdashboard/issueTracker');
    }

    return (
     <div className="main-content">
        
            <h1 className="titles">WELCOME, Staff!</h1> {/* Title inside the container */}

            <div className="cards-container">
                <div className="cards log-issue" onClick={handleLogIssue}>
                    <div className="cards-icon"><FontAwesomeIcon icon={faCirclePlus} /></div>
                    <div className="cards-content">
                        <h2>LOG ISSUE</h2>
                        <p>Report a new technical problem or request assistance with equipment and systems.</p>
                    </div>
                </div>
                <div className="cards cards">
                    <div className="cards-icon"><FontAwesomeIcon icon={faCircleCheck} /></div>
                    <div className="cards-content">
                        <h2>STATUS</h2>
                        <p>Check the progress of your reported issues, including pending, ongoing, and resolved cases.</p>
                    </div>
                </div>
                <div className="cards cardn" onClick={handleNotifications}>
                    <div className="cards-icon"><FontAwesomeIcon icon={faBell} /></div>
                    <div className="cards-content">
                        <h2>NOTIFICATIONS</h2>
                        <p>Stay updated with the latest status changes and important alerts related to your issues.</p>
                    </div>
                </div>
            </div>
        </div>
      
    );
};

export default WelcomeStaff;
