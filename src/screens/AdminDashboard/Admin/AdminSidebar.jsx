import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SidebarCSS/SideBar.css";
import dashboard from "./adminIcons/dashIcon.png";
import notifications from "./adminIcons/notifIcon.png";
import issueIcon from "./adminIcons/issueIcon.png";
import addTechnician from "./adminIcons/addIcon.png";
import genetIcon from "./adminIcons/generIcon.png";
import logIcon from "./adminIcons/logIcon.png";
import dropIcon from "./adminIcons/dropicon.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIssueDropdownOpen, setIssueDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("dashboard"); // Default selected option

  const handleIssueClick = () => {
    setIssueDropdownOpen((prev) => !prev);
    if (!isMenuOpen) {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newValue = !prev;
      if (!newValue) {
        setIssueDropdownOpen(false);
      }
      return newValue;
    });
  };

  const handleItemClick = (option, path, closeDropdown = true) => {
    setSelectedOption(option);
    if (closeDropdown) {
      setIssueDropdownOpen(false); // Close the dropdown only for main items
    }
    navigate(path);
  };

  const handleSignOut = () => {
    // Add sign-out logic here (e.g., clearing tokens, updating state)
    // Redirect to sign-in page
    navigate("/signin");
  };

  return (
    <div className={`sidebar-container ${isMenuOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen && <span className="admin-name">Admin</span>}
        <FaBars />
      </div>
      <ul>
        <li
          onClick={() =>
            handleItemClick("dashboard", "/admindashboard/dashboard")
          }
          className={`list ${selectedOption === "dashboard" ? "selected" : ""}`}
        >
          <img
            src={dashboard}
            alt="Dashboard"
            className="sidebar-container-icon"
          />
          {isMenuOpen && <span>DASHBOARD</span>}
        </li>
        <li
          onClick={() =>
            handleItemClick("notifications", "/admindashboard/notifications")
          }
          className={`list ${
            selectedOption === "notifications" ? "selected" : ""
          }`}
        >
          <img
            src={notifications}
            alt="Notifications"
            className="sidebar-container-icon"
          />
          {isMenuOpen && <span>NOTIFICATIONS</span>}
        </li>

        <li onClick={handleIssueClick} className={`list`}>
          <img
            src={issueIcon}
            alt="issues"
            className="sidebar-container-icon"
          />
          {isMenuOpen && <span>ISSUES</span>}
          <img
            src={dropIcon}
            alt="dropdown arrow"
            className={`drop-icon ${isIssueDropdownOpen ? "rotate" : ""}`}
          />
        </li>

        {isIssueDropdownOpen && (
          <ul className="dropdown">
            <li
              onClick={() =>
                handleItemClick(
                  "viewAllLogs",
                  "/admindashboard/viewAllLogs",
                  false
                )
              }
              className={`dropdown-item ${
                selectedOption === "viewAllLogs" ? "selected" : ""
              }`}
            >
              {isMenuOpen && <span>VIEW ALL LOGS</span>}
            </li>
            <li
              onClick={() =>
                handleItemClick("logIssue", "/admindashboard/logIssue", false)
              }
              className={`dropdown-item ${
                selectedOption === "logIssue" ? "selected" : ""
              }`}
            >
              {isMenuOpen && <span>LOG ISSUE</span>}
            </li>
            <li
              onClick={() =>
                handleItemClick(
                  "assignTech",
                  "/admindashboard/assignTech",
                  false
                )
              }
              className={`dropdown-item ${
                selectedOption === "assignTech" ? "selected" : ""
              }`}
            >
              {isMenuOpen && <span>ASSIGN TECHNICIAN</span>}
            </li>
            <li
              onClick={() =>
                handleItemClick("myIssues", "/admindashboard/myIssues", false)
              }
              className={`dropdown-item ${
                selectedOption === "myIssues" ? "selected" : ""
              }`}
            >
              {isMenuOpen && <span>MY ISSUES</span>}
            </li>
          </ul>
        )}

        <li
          onClick={() =>
            handleItemClick("add-tech", "/admindashboard/add-tech")
          }
          className={`list ${selectedOption === "add-tech" ? "selected" : ""}`}
        >
          <img
            src={addTechnician}
            alt="Add Technician"
            className="sidebar-container-icon"
          />
          {isMenuOpen && <span>ADD TECHNICIAN</span>}
        </li>
        <li
          onClick={() =>
            handleItemClick("report-page", "/admindashboard/report-page")
          }
          className={`list ${
            selectedOption === "report-page" ? "selected" : ""
          }`}
        >
          <img
            src={genetIcon}
            alt="Generate Report"
            className="sidebar-container-icon"
          />
          {isMenuOpen && <span>GENERATE REPORT</span>}
        </li>
      </ul>
      <div className="log-out">
        <li
          onClick={handleSignOut} // Update to call handleSignOut
          className={`list`}
        >
          <img src={logIcon} alt="Logout" />
          {isMenuOpen && <span></span>} {/* Added label */}
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
