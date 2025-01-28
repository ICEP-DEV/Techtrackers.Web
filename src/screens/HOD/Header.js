import React from "react";
import styles from "./Header.module.css"; // Import CSS module
import profileIcon from "./Assets/Profile.png";
import logo from "./Assets/tut_logo 2.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src={logo} alt="Logo" className={styles.TUTlogo} />
      </div>

      <div className={styles.headerUser}>
        <img src={profileIcon} alt="Profile Icon" className={styles.profileIcon} />
        <span className={styles.userName}>HOD</span>
        <i className="fas fa-chevron-down"></i> {/* Dropdown arrow */}
      </div>
    </header>
  );
}
