import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarCSS/TechnicianHeaderStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignOutAlt ,} from '@fortawesome/free-solid-svg-icons';
import logo from './TechnicianIcons/tut.png';
import ProfileIcon from './TechnicianIcons/profile_icon.png';
import {  ChevronDown,Bell } from "lucide-react";


const TechnicianHeader = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const closeDropdown = () => setIsDropdownOpen(false);

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
                
                    id="profile-button" 
                    onClick={toggleDropdown}
                    className={styles.profileButton}
                >
                     <Bell size={40}/>
                    <img src={ProfileIcon} alt="Profile Icon" />
                    {user ? `${user.name} ${user.surname}` : 'Technician Name'}
                <ChevronDown/>

                </button>
                {isDropdownOpen && (
                    <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
                        <p>{user ? `${user.name} ${user.surname}` : 'Name Surname'}</p>
                        <p className={styles.subText}>{user ? user.email : 'EzraAdmin.com'}</p>
                        <p className={styles.subText}>{user ? user.department : 'ICT'}</p>
                        <button onClick={() => { closeDropdown(); /* Navigate to profile */ }}>Profile</button>
                        <button onClick={() => { closeDropdown(); setIsSettingsOpen(true); }}>Settings</button>
                        <button className={styles.signoutButton} onClick={handleLogout}>
                            <span className={styles.signoutIcon}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </span>
                            <span>Sign out</span>
                        </button>
                    </div>
                    
                )}
            </div>

            {/* Render the Settings Modal */}
    
        </header>
    );
};

export default TechnicianHeader;
