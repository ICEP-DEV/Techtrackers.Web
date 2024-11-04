import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styles from "../SidebarCSS/DashboardPage.module.css";
import totalIssuesIcon from "../adminIcons/totalIssuesIcon.png";
import openIssuesIcon from "../adminIcons/openIssuesIcon.png";
import ManageTech from "../pages/ManageTech"; // Import the ManageTech component

const DashboardPage = () => {
  const [showManageTech, setShowManageTech] = useState(false); // State to toggle view

  // Function to toggle ManageTech display
  const handleManageTechClick = () => {
    setShowManageTech(true);
  };

  // If showManageTech is true, display ManageTech component
  if (showManageTech) {
    return <ManageTech />;
  }

  // Default dashboard view
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeMessage}>WELCOME, ADMIN!</h1>

      {/* Total Issues Section */}
      <div className={styles.dashboardCard}>
        <div className={styles.cardIcon}>
          <img
            src={totalIssuesIcon}
            alt="Total issues Icon"
            className={styles.icon}
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>Total Issues</h2>
          <p className={styles.cardDescription}>
            These are the total number of issues present.
          </p>
        </div>
      </div>

      {/* Open Issues Section */}
      <div className={styles.dashboardCard}>
        <div className={styles.cardIcon}>
          <img
            src={openIssuesIcon}
            alt="Open Issues Icon"
            className={styles.icon}
          />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>Open Issues</h2>
          <p className={styles.cardDescription}>
            These represent the total number of opened issues.
          </p>
        </div>
      </div>

      {/* Manage Technicians Section */}
      <div
        className={styles.dashboardCard}
        onClick={handleManageTechClick} // Show ManageTech when clicked
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardIcon}>
          <FontAwesomeIcon icon={faUsers} className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>Manage Technicians</h2>
          <p className={styles.cardDescription}>
            View and manage all technicians.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
