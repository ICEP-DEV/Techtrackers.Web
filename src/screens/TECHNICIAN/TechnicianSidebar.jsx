import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SidebarCSS/SideBar.css';
import dashboard from './TechnicianIcons/dashIcon.png';
import notifications from './TechnicianIcons/notifIcon.png';
import allIssue from './TechnicianIcons/allIssue.png';
import collaborationRequests from './TechnicianIcons/collaborationRequests.png';
import reviews from './TechnicianIcons/reviews.png';
import logIcon from './TechnicianIcons/logIcon.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIssueDropdownOpen, setIssueDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('dashboard'); // Default selected option

    const handleIssueClick = () => {
        setIssueDropdownOpen(prev => !prev);
        if (!isMenuOpen) {
            toggleMenu();
        }
    };

    const handleOptionClick = (option, path) => {
        setSelectedOption(option); // Set the selected option
        const dropdownOptions = ['viewAllLogs', 'logIssue', 'assignTech', 'myIssues'];
        if (!dropdownOptions.includes(option)) {
            setIssueDropdownOpen(false);
        }
        navigate(path);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => {
            const newValue = !prev;
            if (!newValue) {
                setIssueDropdownOpen(false);
            }
            return newValue;
        });
    };

    return (
        <div className={`sidebar-container ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-icon" onClick={toggleMenu}>
                {isMenuOpen && <span className="admin-name">Technician</span>}
                <FaBars className='icon-menu'/>
            </div>
            <ul>
                <li onClick={() => handleOptionClick("dashboard", "/techniciandashboard/dashboard")} className={`list ${selectedOption === 'dashboard' ? 'selected' : ''}`}>
                    <img src={dashboard} alt="Dashboard" className="sidebar-container-icon" />
                    {isMenuOpen && <span>DASHBOARD</span>}
                </li>
                <li onClick={() => handleOptionClick("notifications", "/techniciandashboard/notifications")} className={`list ${selectedOption === 'notifications' ? 'selected' : ''}`}>
                    <img src={notifications} alt="Notifications" className="sidebar-container-icon" />
                    {isMenuOpen && <span>NOTIFICATIONS</span>}
                </li>

                <li onClick={() => handleOptionClick("tbl", "/techniciandashboard/tbl")} className={`list ${selectedOption === 'tbl' ? 'selected' : ''}`}>
                    <img src={allIssue} alt="tbl" className="sidebar-container-icon" />
                    {isMenuOpen && <span>ALL ISSUES</span>}
                </li>

                <li onClick={() => handleOptionClick("collab", "/techniciandashboard/collab")} className={`list ${selectedOption === 'collab' ? 'selected' : ''}`}>
                    <img src={collaborationRequests} alt="tech" className="sidebar-container-icon" height={40}/>
                    {isMenuOpen && <span>COLLABORATION REQUESTS</span>}
                </li>
                <li onClick={() => handleOptionClick("reviews", "/techniciandashboard/reviews")} className={`list ${selectedOption === 'reviews' ? 'selected' : ''}`}>
                    <img src={reviews} alt="report" className="sidebar-container-icon" />
                    {isMenuOpen && <span>REVIEWS</span>}
                </li>
            </ul>
            <div className='log-out'>
                <li onClick={() => handleOptionClick("logout", "/login")} className={`list`}>
                    <img src={logIcon} alt="logout" />
                    {isMenuOpen && <span></span>}
                </li>
            </div>
        </div>
    );
};

export default Sidebar;
