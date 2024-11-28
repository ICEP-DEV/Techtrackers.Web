import React, { useState, useEffect } from "react";
import { Search, Filter, List, ArrowLeft, Clock } from "lucide-react";
import FilterModal from "./FilterModal";
import SortModal from "./SortModal";
import DetailView from "./DetailView";
import styles from "../SidebarCSS/ViewAllLog.module.css";

function ViewAllLogs() {
  const [logs, setLogs] = useState([]); // Original logs from API
  const [filteredLogs, setFilteredLogs] = useState([]); // Filtered and searchable logs
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const formatStatus = (status) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };
  // Fetch logs from the API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("https://localhost:44328/api/AdminLog/GetLogs");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched logs:", data); // Debug: Log fetched data
          
          // Sort logs by `issuedAt` date in descending order
          const sortedLogs = data.sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));
  
          setLogs(sortedLogs); // Store sorted logs
          setFilteredLogs(sortedLogs); // Initialize `filteredLogs` with sorted data
        } else {
          console.error("Failed to fetch logs.");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
  
    fetchLogs();
  }, []);
  

  

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  
    // Filter logs based on the search term and update `filteredLogs`
    const filtered = logs.filter((log) =>
      Object.values(log)
        .join(" ")
        .toLowerCase()
        .includes(term.toLowerCase())
    );
    console.log("Filtered logs after search:", filtered); // Debug: Log filtered logs
    setFilteredLogs(filtered);
  };
  
  const handleFilter = (filters) => {
    // Apply filters to the logs
    const filtered = logs.filter((log) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Ignore empty filters
        return typeof log[key] === "string" && log[key].toLowerCase() === value.toLowerCase();
      });
    });
    
    console.log("Filtered logs after applying filters:", filtered); // Debug: Log filtered logs
    setFilteredLogs(filtered);
    setIsFilterModalOpen(false);
  };

  const handleSort = (key, direction) => {
    const sortedLogs = [...filteredLogs].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    console.log("Sorted logs:", sortedLogs); // Debug: Log sorted logs
    setFilteredLogs(sortedLogs);
    setIsSortModalOpen(false);
  };

  const handleViewLog = (log) => {
    console.log("Selected log ID:", log.logId);
    setSelectedLog(log);
  };

  const handleBackToList = () => {
    setSelectedLog(null);
  };

  if (selectedLog) {
    return <DetailView log={selectedLog} onBack={handleBackToList} />;
  }

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.logsHeader}>
        <h2 className={styles.logsTitle}>
          <Clock size={40} />
          All Logs
        </h2>
      </div>
      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.filterSort}>
        <button
          className={styles.filterButton}
          onClick={() => setIsFilterModalOpen(true)}
        >
          <Filter />
          Filter
        </button>
        <button
          className={styles.sortButton}
          onClick={() => setIsSortModalOpen(true)}
        >
          <List />
          Sort
        </button>
      </div>
      <table className={styles.logsTable}>
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Issue Title</th>
            <th>Date Reported</th>
            <th>Priority Level</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredLogs.map((log) => (
            <tr key={log.logId}>
              <td>{log.issueId}</td>
              <td>{log.issueTitle}</td>
              <td>{new Date(log.issuedAt).toLocaleDateString()}</td>
              <td>{log.priority}</td>
              <td>{log.assignedTo}</td>
              <td>
              <span
                className={`${styles.status} ${styles[`status${formatStatus(log.status)}`]}`}
              >
                {formatStatus(log.status)} {/* Display formatted status */}
             </span>
              </td>
              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewLog(log)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button className={styles.active}>1</button>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <button>7</button>
        <button>8</button>
      </div>
      {isFilterModalOpen && (
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
        />
      )}
      {isSortModalOpen && (
        <SortModal
          onClose={() => setIsSortModalOpen(false)}
          onSort={handleSort}
        />
      )}
      <div className={styles.backButton}>
        <button className={styles.iconButton}>
          <ArrowLeft />
          <span>BACK</span>
        </button>
      </div>
    </main>
  );
}

export default ViewAllLogs;
