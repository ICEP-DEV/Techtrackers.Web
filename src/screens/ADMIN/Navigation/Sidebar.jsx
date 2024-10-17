import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Dashboard from './Icons/dashboard.png';
import ViewAllLogs from './Icons/allIssuesIcon.png';
import AsignTechnician from './Icons/notifications.png';
import AddTechnician from './Icons/addtechnician.png';
//import ReportIcon from './Icons/report.png';  // New report icon
import styles from '../AdminStyle/SideBar.module.css'; // Import the CSS module

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isIssuesOpen, setIsIssuesOpen] = useState(false); // State to manage dropdown

    const toggle = () => setIsOpen(!isOpen);
    const toggleIssuesDropdown = () => setIsIssuesOpen(!isIssuesOpen); // Toggle dropdown

    const menuItem = [
        {
            path: "adminDashboard/WelcomeAdmin",
            name: "DASHBOARD",
            icon: <img src={Dashboard} alt="Dashboard Icon" />,
        },
        {
            path: "/notifications",
            name: "NOTIFICATIONS",
            icon: <img src={AsignTechnician} alt="Notifications Icon" />,  
        },
        {
            path: "#",  // Placeholder path for the dropdown toggle
            name: "ISSUES",
            icon: <img src={ViewAllLogs} alt="Generate Report Icon" />, 
            dropdown: true,  // Flag for dropdown items
        },
        {
            path: "/AddTechnician",
            name: "ADD TECHNICIAN",
            icon: <img src={AddTechnician} alt="Add Technician Icon" />,  
        },
        {
            path: "/generateReport",
            name: "GENERATE REPORT",
            icon: <img src={ViewAllLogs} alt="Generate Report Icon" />,  
        },
    ];

    const issueItems = [
        { path: "/issueDisplay", name: "View All Issues" },
        { path: "/openIssues", name: "Open Issues" },
        { path: "/closedIssues", name: "Closed Issues" },
        { path: "/assignedIssues", name: "Assigned Issues" },
    ];

    return (
        <div className={styles.sidebarContainer}>
            <div className={isOpen ? styles.sidebarWrapper : `${styles.sidebarWrapper} ${styles.collapsed}`}>
                <div className={styles.topSection}>
                    <h1 style={{ display: isOpen ? 'block' : 'none' }} className={styles.staffTitle}>Admin</h1>
                    <div className={styles.menuIcon} onClick={toggle}>
                        <FaBars />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <div key={index}>
                        <NavLink
                            to={item.path}
                            onClick={item.dropdown ? toggleIssuesDropdown : undefined} // Toggle dropdown on "ISSUES" click
                            className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)}
                        >
                            <div className={styles.sidebarIcon}>{item.icon}</div>
                            <div style={{ display: isOpen ? 'block' : 'none' }}>
                                {item.name}
                            </div>
                            {item.dropdown && (isIssuesOpen ? <FaChevronUp /> : <FaChevronDown />)}
                        </NavLink>
                        {/* Render dropdown items when "ISSUES" is clicked */}
                        {item.dropdown && isIssuesOpen && (
                            <div className={styles.dropdownContainer}>
                                {issueItems.map((issueItem, issueIndex) => (
                                    <NavLink
                                        to={issueItem.path}
                                        key={issueIndex}
                                        className={({ isActive }) => (isActive ? `${styles.dropdownItem} ${styles.active}` : styles.dropdownItem)}
                                    >
                                        {issueItem.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
