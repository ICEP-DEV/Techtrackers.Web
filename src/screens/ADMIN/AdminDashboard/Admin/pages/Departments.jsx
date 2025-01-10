import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../SidebarCSS/DashboardPage.module.css";


const DashboardPage = () => {
  const navigate = useNavigate();

  // Navigate to the "Create Department" page
  const handleCreateDepartmentClick = () => {
    navigate("/admindashboard/CreateDepartment");
  };

  // Navigate to the "Manage Departments" page
  const handleManageDepartmentsClick = () => {
    navigate("/admindashboard/ManageDepartments");
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeMessage}>DEPARTMENTS</h1>

      {/* Create Department Section */}
      <div
        className={styles.dashboardCard}
        onClick={handleCreateDepartmentClick}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardIcon}>
          <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>Create Department</h2>
          <p className={styles.cardDescription}>
            Add a new department to the system.
          </p>
        </div>
      </div>

      {/* Manage Departments Section */}
      <div
        className={styles.dashboardCard}
        onClick={handleManageDepartmentsClick}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.cardIcon}>
          <FontAwesomeIcon icon={faUsers} className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <h2 className={styles.cardTitle}>Manage Departments</h2>
          <p className={styles.cardDescription}>
            View and manage all departments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
