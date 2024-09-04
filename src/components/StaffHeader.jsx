// src/Header.js
import React from 'react';
import '../style/StaffStyle.css'; // Import the CSS file for styling

const StaffHeader = ({ onLogout }) => {
    const handleSearch = (event) => {
        console.log("Search query:", event.target.value);
        // Implement search functionality
    };

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <img src="/logo.png" alt="Logo" className="logo" />
                <h1>Staff Dashboard</h1>
            </div>
            <div className="header-right">
                <input
                    type="text"
                    id="search-bar"
                    placeholder="Search..."
                    onChange={handleSearch}
                />
                <button id="notifications-button">🔔</button>
                <button id="profile-button">👤</button>
                <button id="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </header>
    );
};

export default StaffHeader;
