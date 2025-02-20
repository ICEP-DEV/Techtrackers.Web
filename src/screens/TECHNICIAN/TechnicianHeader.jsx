import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarCSS/TechnicianHeaderStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faExclamation, faL } from '@fortawesome/free-solid-svg-icons';
import logo from './TechnicianIcons/tut.png';
import ProfileIcon from './TechnicianIcons/profile_icon.png';
import { ChevronDown, Bell } from "lucide-react";
import SettingsModal from './pages/SettingsModal';

const TechnicianHeader = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showReminders, setShowReminders] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
        // Start countdown interval when component mounts
        const countdownInterval = setInterval(() => {
            setReminders((prevReminders) =>
                prevReminders.map((reminder) => {
                    if (reminder.timeRemaining > 0) {
                        const newTimeRemaining = reminder.timeRemaining - 1000; // decrease by 1 second
                        const progress = (1 - newTimeRemaining / reminder.dueIn) * 100;
                        
                        // Check for alerts based on the progress
                        if (progress >= 50 && progress < 51) {
                            alert(`${reminder.title}: Time remaining is 50%`);
                        } 
                        if (progress >= 100) {
                            alert(`${reminder.title}: Time has expired`);
                        }

                        return { ...reminder, timeRemaining: newTimeRemaining };
                    }
                    return reminder; // Keep the expired ones as they are
                })
            );
        }, 1000); // update every second

        return () => clearInterval(countdownInterval); // cleanup on unmount
    }, []); // Empty dependency array, ensuring this effect runs only once

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

    const handleBellClick = () => setShowReminders(!showReminders);

    const handleLogout = () => {
        localStorage.removeItem('user_info');
        closeDropdown();
        navigate('/signIn');
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const renderProgressBar = (reminder) => {
        const progress = reminder.timeRemaining > 0 ? (1 - reminder.timeRemaining / reminder.dueIn) * 100 : 100;
        return (
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                >
                    <span className={styles.progressText}>{Math.floor(progress)}%</span>
                </div>
            </div>
        );
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
                        <span className={styles.profileText}>
                            {user ? `${user.name} ` : 'Technician Name'}
                        </span>
                        <span className={styles.chevronIcon}>
                            <ChevronDown />
                        </span>
                    </button>
                </div>
                {isDropdownOpen && (
                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
                        <p>{user ? `${user.name}` : 'Name Surname'}</p>
                        <p className={styles.subText}>{user ? user.email : 'EzraAdmin.com'}</p>
                        <p className={styles.subText}>{user ? user.department : 'ICT'}</p>
                        <button onClick={() => { closeDropdown(); setIsSettingsOpen(true); }}>Settings</button>
                        <button className={styles.signoutButton} onClick={handleLogout}>
                            <span className={styles.signoutIcon}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </span>
                            <span>Sign out</span>
                        </button>
                    </div>
                )}

                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

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
                                    {renderProgressBar(reminder)}
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
