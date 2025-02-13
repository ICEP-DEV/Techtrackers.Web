import React from "react";
import { useNavigate } from "react-router-dom";
import IssueRow from "./IssueRow";
import styles from './ManageLogs.module.css'; // Import as module

const ManageLogs = ({ isSidebarOpen }) => {
  const logs = [
    { id: "HR-P3-1250", title: "Unable to login", priority: "High", assignedTo: "Themba Zwane", loggedDate: "25-08-2024" },
    { id: "HR-P1-1252", title: "Replace faulty network switch in Data Center", priority: "High", assignedTo: "Lunga Ntshingila", loggedDate: "25-08-2024" },
    { id: "HR-P2-1254", title: "Printer not working", priority: "Medium", assignedTo: "Phindile Mabaso", loggedDate: "25-08-2024" },
    { id: "HR-P1-1256", title: "Broken computer Keyboard", priority: "High", assignedTo: "Lebo Setopo", loggedDate: "25-08-2024" },
  ];
  const navigate = useNavigate(); 

  return (
    <div className={`${styles["manage-logs-container"]} ${isSidebarOpen ? styles["sidebar-open"] : styles["sidebar-closed"]}`}>
      <h1>Manage Logs</h1>

      <table className={styles["logs-table"]}>
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Issue Title</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Logged Date</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <IssueRow key={index} log={log} />
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageLogs;
