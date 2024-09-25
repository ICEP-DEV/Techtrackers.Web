import React, { useState, useEffect, useRef } from 'react';
import '../style/StaffStyle.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
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
            {/* <div className="header-center">
                <h1>Staff</h1>
            </div> */}
            <div className="header-right" ref={dropdownRef}>
                <button 
                    id="profile-button" 
                    onClick={toggleDropdown}
                >
                    <FontAwesomeIcon icon={faUser} />
                    {user ? `${user.name} ${user.surname}` : 'Staff Name'}
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <p>{user ? user.name : 'Staff Name'}</p>
                        <p>{user ? user.surname : 'Surname'}</p>
                        <p>{user ? user.department : 'Department'}</p>
                        <button onClick={() => { closeDropdown(); /* Navigate to staff */ }}>Staff</button>
                        <button onClick={() => { closeDropdown(); /* Navigate to settings */ }}>Settings</button>
                        <button onClick={() => { closeDropdown(); onLogout(); }}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default StaffHeader;
