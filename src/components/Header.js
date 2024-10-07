import React from "react";
import "./Header.css"; // Import your CSS styling for the header
import profileIcon from "./Assets/Profile.png";
import logo from "./Assets/tut_logo 2.png";



export default function Header() {
  return (
    <header className="header">
      
      <div className="header-logo">
        <img src={logo} alt="Logo"  className="TUTlogo"/>
      </div>

      <div className="header-user">
    
        {/*<i className="fas fa-user-circle"></i>  User profile icon */}
        <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
        <span className="user-name">HOD</span>
        <i className="fas fa-chevron-down"></i> {/* Dropdown arrow */}
      </div>
      
    </header>
  );
}
