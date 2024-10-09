import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

// Import your custom icons
import dashboardIcon from './IconsForStaff/dashboard.png';
import logIssueIcon from './IconsForStaff/logIssueIcon.png';
import allIssuesIcon from './IconsForStaff/allIssuesIcon.png';
import notificationsIcon from './IconsForStaff/notifications.png';

const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    const menuItem = [
        {
            path: "/staffdashboard/WelcomeStaff",
            name: "DASHBOARD",
            icon: <img src={dashboardIcon} alt="Dashboard" className="sidebar-icon" />
        },
        {
            path: "/staffdashboard/logissueform",
            name: "LOG ISSUE",
            icon: <img src={logIssueIcon} alt="Log Issue" className="sidebar-icon" />
        },
        {
            path: "/staffdashboard/IssueDisplay",
            name: "ALL ISSUE",
            icon: <img src={allIssuesIcon} alt="All Issues" className="sidebar-icon" />
        },
        {
            path: "/staffdashboard/issueTracker",
            name: "NOTIFICATIONS",
            icon: <img src={notificationsIcon} alt="Notifications" className="sidebar-icon" />
        },
    ];

    return (
        <div className="cup">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="staffTitle">Staff</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="menuIcon">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className="ItemIcon">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="navItem">{item.name}</div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default SideBar;
