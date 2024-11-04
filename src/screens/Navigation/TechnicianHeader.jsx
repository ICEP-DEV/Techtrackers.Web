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
                setShowReminders(false); // Close reminders on outside click
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
                    <span className={styles.reminderCount}>3</span> {/* Red circle with number */}
                </button>

                <button 
                    id="profile-button" 
                    onClick={toggleDropdown}
                    className={styles.profileButton}
                >
                    <img src={ProfileIcon} alt="Profile Icon" />
                    {user ? `${user.name} ${user.surname}` : 'Technician Name'}
                    <ChevronDown />
                </button>

                {isDropdownOpen && (
                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
                        <p>{user ? `${user.name} ${user.surname}` : 'Name Surname'}</p>
                        <p className={styles.subText}>{user ? user.email : 'EzraAdmin.com'}</p>
                        <p className={styles.subText}>{user ? user.department : 'ICT'}</p>
                        <button onClick={() => { closeDropdown(); /* Navigate to profile */ }}>Profile</button>
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

        <div className={styles.reminderItem}>
            <FontAwesomeIcon icon={faExclamation} color="red" className={styles.iconLarge} style={{ fontSize: '50px' }}/>
            <div className={styles.reminderContent}>
                <p>
                    <span className={styles.dueDateApproaching} style={{ fontSize: '12px' }}>Due date approaching</span> - 
                    <strong> 6 Hrs remaining</strong>
                </p>
                <p className={styles.reminderIssueId}>HR-P1-1134</p>
                <p>Internal Issue: Server Downtime in Data Center</p>
                <span className={styles.reminderTime}> 12:06</span>
            </div>
        </div>
        <hr className={styles.reminderDivider} /> {/* Divider after the first issue */}

        <div className={styles.reminderItem}>
            <FontAwesomeIcon icon={faExclamation} color="red" className={styles.iconLarge} style={{ fontSize: '50px' }} />
            <div className={styles.reminderContent}>
                <p>
                    <span className={styles.dueDateApproaching} style={{ fontSize: '12px' }}>Due date approaching</span> - 
                    <strong> 24 Hrs remaining</strong>
                   
                </p>
                <p className={styles.reminderIssueId}>HR-P3-1132</p>
                <p>Access Issue: Unable to log into HR portal</p>
                <span className={styles.reminderTime}> 12:06</span> {/* Display time here */}
            </div> 
        </div>
        <hr className={styles.reminderDivider} /> {/* Divider after the second issue */}

        <div className={styles.reminderItem}>
            <FontAwesomeIcon icon={faExclamation} color="red" className={styles.iconLarge} style={{ fontSize: '50px' }} />
            <div className={styles.reminderContent}>
                <p>
                    <span className={styles.overdueText}>Issue resolution overdue</span>
                    
                </p>
                <p className={styles.reminderIssueId}>HR-P2-1122</p>
                <p>Access Issue: Unable to log into HR portal</p>
                <span className={styles.reminderTime}> 12:06</span> {/* Display time here */}
            </div>
        </div>
    </div>
)}
            </div>
        </header>
    );
};

export default TechnicianHeader;