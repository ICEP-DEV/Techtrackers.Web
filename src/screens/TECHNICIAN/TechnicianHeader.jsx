import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarCSS/TechnicianHeaderStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faExclamation } from '@fortawesome/free-solid-svg-icons';
import logo from './TechnicianIcons/tut.png';
import ProfileIcon from './TechnicianIcons/profile_icon.png';
import { ChevronDown, Bell } from "lucide-react";

const TechnicianHeader = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showReminders, setShowReminders] = useState(false); // Reminders visibility
    const [user, setUser] = useState(null);
    const [reminders, setReminders] = useState([]); // Store fetched reminders
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {

        const userInfo = JSON.parse(localStorage.getItem('user_info'));
            console.log("User Info from localStorage:", userInfo); // Debug
            setUser(userInfo);

        const userId = userInfo ? userInfo.userId : null;
        if (userId) {
            setUser(userInfo);
            fetchReminders(userId); // Fetch reminders only if user ID exists
        } else {
            console.error("User ID is undefined. Cannot fetch reminders.");
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setShowReminders(false); // Close reminders on outside click
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //const userId = userInfo ? userInfo.userId : null;
    const fetchReminders = async (userId) => {

        if (!userId) {
            console.error("Invalid userId provided to fetchReminders");
            return;
        }
        try {
            const response = await fetch(`https://localhost:44328/api/NewNotification/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched Reminders:", data);
                setReminders(data); // Store reminders in state
            } else {
                console.error("Failed to fetch reminders");
            }
        } catch (error) {
            console.error("Error fetching reminders:", error);
        }
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const handleBellClick = () => setShowReminders(!showReminders);

    const handleLogout = () => {
        localStorage.removeItem('user_info'); 
        closeDropdown();
        onLogout();
        navigate('/signIn'); 
    };

    return (
        <header className={styles.dashboardHeader}>
            <div className={styles.headerLeft}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.headerRight} ref={dropdownRef}>
                <button 
                    id="reminders-button"
                    onClick={handleBellClick}
                    className={styles.bellButton}
                >
                    <Bell size={40} color="red" /> {/* Red bell icon */}
                    <span className={styles.reminderCount}>{reminders.length}</span> {/* Dynamic count */}
                </button>

                <div className='profile-btn'>
                <button 
                    id="profile-button" 
                    onClick={toggleDropdown}
                    className={styles.profileButton}
                >
                    <img src={ProfileIcon} alt="Profile Icon" />
                    {user ? `${user.name}` : 'Technician Name'}
                    <ChevronDown />
                </button>
                </div>
                {isDropdownOpen && (
                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
                        <p>{user ? `${user.name}` : 'Name Surname'}</p>
                        <p className={styles.subText}>{user ? user.email : 'EzraAdmin.com'}</p>
                        <p className={styles.subText}>{user ? user.department : 'ICT'}</p>
                        <button onClick={() => { closeDropdown(); }}>Settings</button>
                        <button className={styles.signoutButton} onClick={handleLogout}>
                            <span className={styles.signoutIcon}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </span>
                            <span>Sign out</span>
                        </button>
                    </div>
                )}

                {showReminders && (
                    <div className={styles.remindersContainer}>
                    <h3 className={styles.remindersHeader}>Reminders!</h3>
                    {reminders.length > 0 ? (
                        reminders.map((reminder) => (
                            <div key={reminder.notificationId} className={styles.reminderItem}>
                                <FontAwesomeIcon icon={faExclamation} color="red" className={styles.iconLarge} style={{ fontSize: '50px' }} />
                                <div className={styles.reminderContent}>
                                    <p>
                                        <span className={styles.dueDateApproaching} style={{ fontSize: '12px' }}>
                                            {reminder.type}
                                        </span>{" "}
                                        - <strong>{reminder.message}</strong>
                                    </p>
                                    <p className={styles.reminderIssueId}>Log ID: {reminder.logId}</p>
                                    <span className={styles.reminderTime}>
                                        {new Date(reminder.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <hr className={styles.reminderDivider} />
                            </div>
                        ))
                    ) : (
                        <p>No reminders available.</p>
                    )}
                </div>
                )}
            </div>
        </header>
    );
};

export default TechnicianHeader;
