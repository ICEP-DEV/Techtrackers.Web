import React, { useState, useEffect, useRef } from 'react';
import '../style/StaffStyle.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import logo from './IconsForStaff/Fix_flow.jpg';
import '../style/StaffStyle.css';


const Header = ({ onLogout }) => {
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
              <div className="header-right">
                <h1>Staff</h1>
            </div>
            <div className="header-center">
                 <img src={logo} alt="Logo" className="logo" />
                {/* <h1>Staff</h1> */}
            </div>
          
            <div className="header-right">
                {/* <input
                    type="text"
                    id="search-bar"
                    placeholder="Search..."
                    onChange={(event) => console.log("Search query:", event.target.value)}
                /> */}
                {/* <button id="notifications-button">🔔</button> */}
                <div className="dashboard-header" ref={dropdownRef}>
                    <button 
                        id="profile-button" 
                        onClick={toggleDropdown}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        {user ? user.email : 'Staff Name'}
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={() => { closeDropdown(); /* Navigate to staff */ }}>Staff</button>
                            <button onClick={() => { closeDropdown(); /* Navigate to settings */ }}>Settings</button>
                            <button onClick={() => { closeDropdown(); onLogout(); }}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
