import React from 'react';
import { FaBars } from 'react-icons/fa';
import './SideBar.css'; // Import the CSS file for styling
import allIssuesIcon from './IconsForStaff/allIssuesIcon.png';
import dashboard from './IconsForStaff/dashboard.png';
import notifications from './IconsForStaff/notifications.png';
import logIssueIcon from './IconsForStaff/logIssueIcon.png';

const Sidebar = ({ onSelect, isMenuOpen, toggleMenu }) => {
    return (
        <div className={`sidebar ${isMenuOpen ? 'open' : 'closed'}`}>
            <div className="menu-icon" onClick={toggleMenu}>
                <FaBars />
            </div>
            <ul>
                <li onClick={() => onSelect('dashboard')}>
                    <img src={dashboard} alt="Dashboard" className="sidebar-icon" />
                    {isMenuOpen && <span>DASHBOARD</span>}
                </li>
                <li onClick={() => onSelect('log-issue')}>
                    <img src={logIssueIcon} alt="Log Issues" className="sidebar-icon" />
                    {isMenuOpen && <span>LOG ISSUES</span>}
                </li>
                <li onClick={() => onSelect('all-issues')}>
                    <img src={allIssuesIcon} alt="All Issues" className="sidebar-icon" />
                    {isMenuOpen && <span>ALL ISSUES</span>}
                </li>
                <li onClick={() => onSelect('notifications')}>
                    <img src={notifications} alt="Notifications" className="sidebar-icon" />
                    {isMenuOpen && <span>NOTIFICATIONS</span>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
