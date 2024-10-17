import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaBars } from 'react-icons/fa';
 import Dashboard from '../adminIcons/dashboard.png';
// //import ViewAllLogs from '../adminIcons/allIssuesIcon.png';
 import AssignTechnician from '../adminIcons/notifications.png';
 import AddTechnician from '../adminIcons/addtechnician.png';
 import IssueIcon from '../adminIcons/issueIcon.png';
import DropIcon from '../adminIcons/dropicon.png';
//import ReportIcon from './Icons/report.png';  // New report icon
import styles from '../Adminstyles/SideBar.module.css'; // Import the CSS module

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isIssuesOpen, setIsIssuesOpen] = useState(false); // State to manage dropdown

    const toggle = () => setIsOpen(!isOpen);
    const toggleIssuesDropdown = () => setIsIssuesOpen(!isIssuesOpen); // Toggle dropdown

    const menuItem = [
        {
            path: "/admindashboard/WelcomeAdmin",
            name: "DASHBOARD",
            icon: <img src={Dashboard} alt="Dashboard Icon" />,
        },
        {
            path: "/admindashboard/NotificationsPage",
            name: "NOTIFICATIONS",
            icon: <img src={AddTechnician}  alt="Notifications Icon" />,  
        },
        {
            path: "#",  // Placeholder path for the dropdown toggle
            name: "ISSUES",
            icon: <img src={IssueIcon} alt="Generate Report Icon" />, 
            dropdown: true,  // Flag for dropdown items
        },
        {
            path: "/admindashboard/AddTechnicianPage",
            name: "ADD TECHNICIAN",
            icon: <img src={AddTechnician} alt="Add Technician Icon" />,  
        },
        {
            path: "/admindashboard/ReportPage",
            name: "GENERATE REPORT",
            icon: <img src={AssignTechnician} alt="Generate Report Icon" />,  
        },
    ];

    const issueItems = [
        { path: "/admindashboard/MainContent", name: "VIEW ALL LOGS" },
        { path: "/admindashboard/LogIssue", name: "LOG ISSUE" },
        { path: "/admindashboard/AssignTech", name: "ASSIGN TECHNICIAN" },
        { path: "/admindashboard/MyIssues", name: "MY ISSUES" },
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









// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaBars } from 'react-icons/fa';
// import Dashboard from '../adminIcons/dashboard.png';
// //import ViewAllLogs from '../adminIcons/allIssuesIcon.png';
// import AssignTechnician from '../adminIcons/notifications.png';
// import AddTechnician from '../adminIcons/addtechnician.png';
// import IssueIcon from '../adminIcons/issueIcon.png';
// import DropIcon from '../adminIcons/dropicon.png';

// const Sidebar = ({ children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isIssueDropdownOpen, setIssueDropdownOpen] = useState(false);

//     const toggleSidebar = () => setIsOpen(!isOpen);
//     const toggleIssueDropdown = () => setIssueDropdownOpen(!isIssueDropdownOpen);

//     const menuItem = [
//         {
//             path: "/admindashboard/WelcomeAdmin",
//             name: "DASHBOARD",
//             icon: <img src={Dashboard} alt="Dashboard Icon" />,
//         },
//         {
//             path: "/admindashboard/AddTechnician",
//             name: "ADD TECHNICIAN",
//             icon: <img src={AddTechnician} alt="Add Technician Icon" />,
//         },
//         {
//             path: "/admindashboard/issueTracker",
//             name: "NOTIFICATIONS",
//             icon: <img src={AssignTechnician} alt="Notifications Icon" />,
//         },
//     ];

//     return (
//         <div className="container">
//             <div style={{ width: isOpen ? '200px' : '50px' }} className="sidebar">
//                 <div className="top_section">
//                     <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">Admin</h1>
//                     <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
//                         <FaBars onClick={toggleSidebar} />
//                     </div>
//                 </div>
                
//                 {/* Menu Items */}
//                 {menuItem.map((item, index) => (
//                     <NavLink to={item.path} key={index} className={({ isActive }) => (isActive ? 'link active' : 'link')}>
//                         <div className="icon">{item.icon}</div>
//                         <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">{item.name}</div>
//                     </NavLink>
//                 ))}

//                 {/* Issues Dropdown */}
//                 <div className="link" onClick={toggleIssueDropdown}>
//                     <div className="icon"><img src={IssueIcon} alt="Issues Icon" /></div>
//                     <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">ISSUES</div>
//                     {isOpen && <img src={DropIcon} alt="Dropdown Arrow" className={`drop-icon ${isIssueDropdownOpen ? 'rotate' : ''}`} />}
//                 </div>
                
//                 {isIssueDropdownOpen && isOpen && (
//                     <div className="dropdown">
//                         <NavLink to="/admindashboard/issueDisplay" className="dropdown-item">VIEW ALL LOGS</NavLink>
//                         <NavLink to="/admindashboard/logissueform" className="dropdown-item">LOG ISSUE</NavLink>
//                         <NavLink to="/admindashboard/assignTech" className="dropdown-item">ASSIGN TECHNICIAN</NavLink>
//                         <NavLink to="/admindashboard/myIssues" className="dropdown-item">MY ISSUES</NavLink>
//                     </div>
//                 )}
//             </div>
//             <main>{children}</main>
//         </div>
//     );
// };

// export default Sidebar;
