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
    const [showReminders, setShowReminders] = useState(false);
    const [user, setUser] = useState(null);
    const [reminders, setReminders] = useState([
        {
            id: 'IT-P1-1220',
            title: 'Internal Issue: Server Downtime in Data Center',
            dueIn: 6 * 60 * 60 * 1000, // 6 hours in milliseconds
            status: 'Due date approaching',
            timeRemaining: 6 * 60 * 60 * 1000, // initial time left
        },
        {
            id: 'HR-P1-1221',
            title: 'Access Issue: Unable to log into HR portal',
            dueIn: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
            status: 'Due date approaching',
            timeRemaining: 24 * 60 * 60 * 1000, // initial time left
        },
        {
            id: 'FI-P2-1123',
            title: 'Access Issue: Unable to log into HR portal',
            dueIn: 0, // Overdue immediately
            status: 'Issue resolution escalated',
            timeRemaining: 0, // Time expired
        }
    ]);
    
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        setUser(userInfo);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setShowReminders(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setReminders((prevReminders) =>
                prevReminders.map((reminder) => {
                    if (reminder.timeRemaining > 0) {
                        const newTimeRemaining = reminder.timeRemaining - 1000; // decrease by 1 second
                        return { ...reminder, timeRemaining: newTimeRemaining };
                    }
                    return reminder; // Keep the expired ones as they are
                })
            );
        }, 1000); // update every second

        return () => clearInterval(countdownInterval); // cleanup on unmount
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const handleBellClick = () => setShowReminders(!showReminders);

    const handleLogout = () => {
        localStorage.removeItem('user_info');
        closeDropdown();
        onLogout();
        navigate('/signIn');
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
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
                    <Bell size={40} color="red" />
                    <span className={styles.reminderCount}>3</span>
                </button>

                <div className='profile-btn'>
                    <button 
                        id="profile-button" 
                        onClick={toggleDropdown}
                        className={styles.profileButton}
                    >
                        <img src={ProfileIcon} alt="Profile Icon" />
                        {user ? `${user.name} ${user.surname}` : 'Technician Name'}
                        <ChevronDown />
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
                        <p>{user ? `${user.name} ${user.surname}` : 'Name Surname'}</p>
                        <p className={styles.subText}>{user ? user.email : 'EzraAdmin.com'}</p>
                        <p className={styles.subText}>{user ? user.department : 'ICT'}</p>
                        <button onClick={() => { closeDropdown(); }}>Profile</button>
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
                        {reminders.map((reminder) => (
                            <div key={reminder.id} className={styles.reminderItem}>
                                <FontAwesomeIcon icon={faExclamation} color="red" className={styles.iconLarge} style={{ fontSize: '50px' }} />
                                <div className={styles.reminderContent}>
                                    <p>
                                        <span className={styles.dueDateApproaching} style={{ fontSize: '12px' }}>
                                            {reminder.status}
                                        </span> - 
                                        <strong>{reminder.timeRemaining > 0 ? formatTime(reminder.timeRemaining) : 'Expired'}</strong>
                                    </p>
                                    <p className={styles.reminderIssueId}>{reminder.id}</p>
                                    <p>{reminder.title}</p>
                                    <span className={styles.reminderTime}>
                                        {reminder.timeRemaining > 0 ? formatTime(reminder.timeRemaining) : 'Expired'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default TechnicianHeader;
