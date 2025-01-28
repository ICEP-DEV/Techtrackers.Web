import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailView from './DetailView'; // Ensure you have the correct path
import styles from './HOD styles/Table.module.css';
import './HOD styles/AllIssues.module.css';
import { Clock } from "lucide-react";
import FiltIcon from './HODIcons/FiltIcon.png';
import SortIcon from './HODIcons/SortIcon.png';

const Table = ({ isSidebarOpen }) => {
  const issuesData = [
    {
      issueId: "HR-P2-1234",
      name: "Excellent Nambane",
      title: "Internal Issue",
      description: "System error affecting multiple internal applications.",
      date: "19/08/2024",
      department: "Human Resources (HR)",
      priority: "Medium",
      assigned: "None",
      status: "Pending",
      attachments: [{ filename: "error_screenshot.png", imageUrl: "/path/to/error_screenshot.png" }],
    },
    {
      issueId: "HR-P3-1235",
      name: "Themba Zwane",
      title: "Network Issue",
      description: "Connectivity issues impacting access to shared resources.",
      date: "15/08/2024",
      department: "Human Resources (HR)",
      priority: "High",
      assigned: "Abel Makamu",
      status: "Ongoing",
      attachments: [{ filename: "network_diagram.jpg", imageUrl: "/path/to/network_diagram.jpg" }],
    },
    {
      issueId: "HR-P1-1236",
      name: "Sara Smith",
      title: "Printer Not Working",
      description: "Office printer unable to print, likely due to a hardware issue.",
      date: "22/07/2024",
      department: "Human Resources (HR)",
      priority: "Low",
      assigned: "Matete Sekgotodi",
      status: "On Hold",
      attachments: [{ filename: "printer_issue.jpg", imageUrl: "/path/to/printer_issue.jpg" }],
    },
    {
      issueId: "HR-P1-1237",
      name: "John Doe",
      title: "Forgot Password",
      description: "User locked out of account due to forgotten password.",
      date: "15/07/2024",
      department: "Human Resources (HR)",
      priority: "High",
      assigned: "Hamilton Masipa",
      status: "Done",
      attachments: [{ filename: "password_reset_email.png", imageUrl: "/path/to/password_reset_email.png" }],
    },
  ];

  const [filteredIssues, setFilteredIssues] = useState(issuesData);
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilterDropdownOpen(false);
    applyFiltersAndSorting(status, searchQuery);
  };

  const handleSortChange = (sortBy) => {
    const sortedData = [...filteredIssues].sort((a, b) => {
      if (sortBy === "user") return a.name.localeCompare(b.name);
      if (sortBy === "issueId") return a.issueId.localeCompare(b.issueId);
      if (sortBy === "time") return a.date.localeCompare(b.date);
      return 0;
    });
    setFilteredIssues(sortedData);
    setSortDropdownOpen(false);
  };

  const applyFiltersAndSorting = (status, search) => {
    const filteredData = issuesData.filter((issue) => {
      if (status !== "All" && issue.status !== status) return false;
      if (search && !issue.name.toLowerCase().includes(search.toLowerCase()) &&
          !issue.issueId.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
    setFilteredIssues(filteredData);
  };

  const toggleFilterDropdown = () => setFilterDropdownOpen(!filterDropdownOpen);
  const toggleSortDropdown = () => setSortDropdownOpen(!sortDropdownOpen);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'rgb(174, 0, 0)';
      case 'Ongoing':
        return '#bfa829';
      case 'Done':
        return 'green';
      case 'On Hold':
        return '#0a4d4d';
      default:
        return 'transparent';
    }
  };

  const handleViewClick = (issue) => {
    setSelectedLog(issue); // Set the selected issue when "View" is clicked
  };

  const handleBackToList = () => {
    setSelectedLog(null); // Reset selected issue when going back to list
  };

  if (selectedLog) {
    return <DetailView log={selectedLog} onBack={handleBackToList} />;
  }

  return (
    <div className={`HOD-main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <h2><Clock size={40} />ALL ISSUES</h2>

      <div className={styles.filterSortContainer}>
        <div className={styles.filterContainer}>
          <button className={styles.filterBtn} onClick={toggleFilterDropdown}>
            <img src={FiltIcon} width="15" height="15" alt="Filter Icon" /> Filter
          </button>
          {filterDropdownOpen && (
            <ul className={styles.filterDropdown}>
              <li onClick={() => handleFilterChange("All")}>All</li>
              <li onClick={() => handleFilterChange("Done")}>Resolved</li>
              <li onClick={() => handleFilterChange("Ongoing")}>Ongoing</li>
              <li onClick={() => handleFilterChange("On Hold")}>On Hold</li>
            </ul>
          )}
        </div>

        <div className={styles.sortContainer}>
          <button className={styles.sortBtn} onClick={toggleSortDropdown}>
            <img src={SortIcon} width="15" height="15" alt="Sort Icon" /> Sort
          </button>
          {sortDropdownOpen && (
            <ul className={styles.sortDropdown}>
              <li onClick={() => handleSortChange("user")}>Name</li>
              <li onClick={() => handleSortChange("issueId")}>Issue ID</li>
              <li onClick={() => handleSortChange("time")}>Time</li>
            </ul>
          )}
        </div>

        <input
          type="text"
          placeholder="Search by User or Issue ID"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            applyFiltersAndSorting(filterStatus, e.target.value);
          }}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.issueTable} aria-label="Issues Table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Title</th>
              <th>Assigned to</th>
              <th>Date Reported</th>
              <th>Priority Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <tr key={issue.issueId}>
                  <td>{issue.issueId}</td>
                  <td>{issue.title}</td>
                  <td>{issue.assigned}</td>
                  <td>{issue.date}</td>
                  <td>{issue.priority}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: getStatusColor(issue.status),
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td><button className={styles.viewButton} onClick={() => handleViewClick(issue)}>View</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No issues available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      issueId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      assigned: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      attachments: PropTypes.arrayOf(
        PropTypes.shape({
          filename: PropTypes.string.isRequired,
          imageUrl: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Table;
