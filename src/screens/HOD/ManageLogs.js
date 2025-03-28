import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueRow from "./IssueRow";
import styles from "./ManageLogs.module.css"; // Import as module

const ManageLogs = ({ isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [filterPriority, setFilterPriority] = useState("");

  const logs = [
    { id: "HR-P3-1250", title: "Unable to login", priority: "High", assignedTo: "Themba Zwane", loggedDate: "25-08-2024" },
    { id: "HR-P1-1252", title: "Replace faulty network switch in Data Center", priority: "High", assignedTo: "Lunga Ntshingila", loggedDate: "25-08-2024" },
    { id: "HR-P2-1254", title: "Printer not working", priority: "Medium", assignedTo: "Phindile Mabaso", loggedDate: "25-08-2024" },
    { id: "HR-P1-1256", title: "Broken computer Keyboard", priority: "High", assignedTo: "Lebo Setopo", loggedDate: "25-08-2024" },
  ];

  const navigate = useNavigate();

  // 🔍 Search and filter logs based on title, priority, assignedTo, and ID
  const filteredLogs = logs
    .filter((log) =>
      searchQuery
        ? log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.id.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((log) => (filterPriority ? log.priority === filterPriority : true));

  // Sort logs by priority
  const sortedLogs = [...filteredLogs].sort((a, b) =>
    sortAscending ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority)
  );

  return (
    <div className={`${styles["manage-logs-container"]} ${isSidebarOpen ? styles["sidebar-open"] : styles["sidebar-closed"]}`}>
      <h1>Manage Logs</h1>

      {/* Search, Sort & Filter Container */}
      <div className={styles.controlsContainer}>
        <input
          type="text"
          placeholder="Search issues..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={styles.buttonsContainer}>
          <button className={styles.sortButton} onClick={() => setSortAscending(!sortAscending)}>
            Sort by Priority {sortAscending ? "▲" : "▼"}
          </button>

          <select
            className={styles.filterDropdown}
            onChange={(e) => setFilterPriority(e.target.value)}
            value={filterPriority}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

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
          {sortedLogs.map((log, index) => (
            <IssueRow key={index} log={log} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLogs;
