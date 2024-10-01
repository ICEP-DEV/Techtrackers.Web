import React, { useState, useEffect, useRef } from 'react';
import '../style/StaffStyle.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import logo from '../images/tut.png';


const StaffHeader = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null); // Simulating user data
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Replace with actual user data fetching logic
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        setUser(userInfo);
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside of it
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

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="header-right" ref={dropdownRef}>
                <button 
                    id="profile-button" 
                    onClick={toggleDropdown}
                    className="profile-button"
                >
                    <FontAwesomeIcon icon={faUser} />
                    {user ? `${user.name} ${user.surname}` : 'John Doe'}
                </button>
                {isDropdownOpen && (
                    <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                        <p>{user ? `${user.name} ${user.surname}` : 'Name Surname'}</p>
                        <p className="sub-text">{user ? user.email : 'Joestaff.com'}</p>
                        <p className="sub-text">{user ? user.department : 'HR'}</p>
                        <p className="sub-text">{user ? `Human Resources(${user.department})` : 'Human Resources(HR)'}</p>
                        <button onClick={() => { closeDropdown(); /* Navigate to profile */ }}>Profile</button>
                        <button onClick={() => { closeDropdown(); /* Navigate to settings */ }}>Settings</button>
                        <button className="signout-button" onClick={() => { closeDropdown(); onLogout(); }}>
                            <span className="signout-icon">
                                <FontAwesomeIcon icon={faSignOutAlt} /> {/* Add signout icon here */}
                            </span>
                            <span>Sign out</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default StaffHeader;