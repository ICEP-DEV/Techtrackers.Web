import React from 'react';
import styles from '../Staff/StaffStyle/WelcomeStaff.module.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const WelcomeStaff = () => {
    const navigate = useNavigate();

    const handleLogIssue = () => {
        navigate('/staffdashboard/logissueform');
    };

    const handleNotifications = () => {
        navigate('/staffdashboard/issueTracker');
    };

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.titles}>WELCOME, Staff!</h1>

            <div className={styles.cardsContainer}>
                {/* Log Issue Card */}
                <div className={`${styles.cards} ${styles.logIssue}`} onClick={handleLogIssue}>
                    <div className={styles.cardsIcon}><FontAwesomeIcon icon={faCirclePlus} /></div>
                    <div className={styles.cardsContent}>
                        <h2>LOG ISSUE</h2>
                        <p>Report a new technical problem or request assistance with equipment and systems.</p>
                    </div>
                </div>

                {/* Status Card */}
                <div className={`${styles.cards} ${styles.cards}`}>
                    <div className={styles.cardsIcon}><FontAwesomeIcon icon={faCircleCheck} /></div>
                    <div className={styles.cardsContent}>
                        <h2>STATUS</h2>
                        <p>Check the progress of your reported issues, including pending, ongoing, and resolved cases.</p>
                    </div>
                </div>

                {/* Notifications Card */}
                <div className={`${styles.cards} ${styles.cardn}`} onClick={handleNotifications}>
                    <div className={styles.cardsIcon}><FontAwesomeIcon icon={faBell} /></div>
                    <div className={styles.cardsContent}>
                        <h2>NOTIFICATIONS</h2>
                        <p>Stay updated with the latest status changes and important alerts related to your issues.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeStaff;
