import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSitemap } from "@fortawesome/free-solid-svg-icons";
import styles from "../SidebarCSS/DashboardPage.module.css";
import totalIssuesIcon from "../adminIcons/totalIssuesIcon.png";
import openIssuesIcon from "../adminIcons/openIssuesIcon.png";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleTotalIssuesClick = () => {
    navigate("/admindashboard/issue-summary"); // Navigate to the total issues page
  };

  const handleOpenIssuesClick = () => {
    navigate("/admindashboard/in-progress-issues"); // Navigate to the open issues page
  };

  const handleDepartmentsClick = () => {
    navigate("/admindashboard/Departments"); // Navigate to ManageTech page
  };

  const handleManageTechClick = () => {
    navigate("/admindashboard/ManageTech"); // Navigate to ManageTech page
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeMessage}>WELCOME, ADMIN!</h1>

      {/* Total Issues Section */}
      <div className={styles.dashboardCard} onClick={handleTotalIssuesClick}>
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
            View total number of present issues.
          </p>
        </div>
      </div>

      {/* Open Issues Section */}
      <div className={styles.dashboardCard} onClick={handleOpenIssuesClick}>
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
            View the total number of opened issues.
          </p>
        </div>
      </div>

      {/* Manage Technicians Section */}
      <div
        className={styles.dashboardCard}
        onClick={handleManageTechClick}
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

      {/* Manage Department Section */}
      <div
        className={styles.dashboardCard}
        onClick={handleDepartmentsClick}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardIcon}>
          <FontAwesomeIcon icon={faSitemap} className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>Management Hub</h2>
          <p className={styles.cardDescription}>
            {/* View and manage departments. */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
