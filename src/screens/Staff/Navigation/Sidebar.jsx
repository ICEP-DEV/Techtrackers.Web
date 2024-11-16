import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

// Import your custom icons
import dashboardIcon from './IconsForStaff/dashboard.png';
import logIssueIcon from './IconsForStaff/logIssueIcon.png';
import allIssuesIcon from './IconsForStaff/allIssuesIcon.png';
import notificationsIcon from './IconsForStaff/notifications.png';
import styles from '../StaffStyle/staffdashboard.module.css';

const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    const menuItem = [
        {
            path: "/staffdashboard/WelcomeStaff",
            name: "DASHBOARD",
            icon: <img src={dashboardIcon} alt="Dashboard" className={styles.sidebarIcons} />
        },
        {
            path: "/staffdashboard/logissueform",
            name: "LOG ISSUE",
            icon: <img src={logIssueIcon} alt="Log Issue" className={styles.sidebarIcons} />
        },
        {
            path: "/staffdashboard/IssueDisplay",
            name: "ALL ISSUE",
            icon: <img src={allIssuesIcon} alt="All Issues" className={styles.sidebarIcons} />
        },
        {
            path: "/staffdashboard/issueTracker",
            name: "NOTIFICATIONS",
            icon: <img src={notificationsIcon} alt="Notifications" className={styles.sidebarIcons} />
        },
    ];

    return (
        <div className={styles.cup}>
            <div style={{ width: isOpen ? "225px" : "60px" }} className={styles.sidebar}>
                <div className={styles.topSection}>
                    <h1 style={{ display: isOpen ? "block" : "none" }} className={styles.staffTitle}>Staff</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="menuIcon">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className="ItemIcon">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className={styles.Link}>
                            <div className={styles.Icon}>{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className={styles.NavItem}>{item.name}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default SideBar;
