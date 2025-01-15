import React, { useEffect, useMemo, useState } from "react";
import Header from "./TableHeader";
import { sortAndFilterData } from "./Sort";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "../SidebarCSS/TableAllIssues.module.css";

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const [issues, setIssues] = useState([]); // State to store issues fetched from the API
  const [isTableVisible, setIsTableVisible] = useState(true); // State to control table visibility
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    department: "",
    urgency: "",
  });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // Get logged-on user from local storage
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        if (!userInfo || !userInfo.userId) {
          console.error("User is not logged in or userId is missing.");
          return;
        }

        const userId = userInfo.userId; // Extract userId from local storage

        // Fetch technician-specific logs
        const response = await fetch(
          `https://localhost:44328/api/Log/GetLogsTechnician?userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Issues:", data); // Debug fetched data
          setIssues(data); // Set issues in state
        } else {
          console.error("Failed to fetch issues.");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  // Handle sorting of columns
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort based on selected sort option from Header
  const handleSortOption = (sortOption) => {
    const options = {
      "date-old-new": { key: "date", direction: "ascending" },
      "date-new-old": { key: "date", direction: "descending" },
      alphabetically: { key: "name", direction: "ascending" },
    };

    if (options[sortOption]) {
      setSortConfig(options[sortOption]);
    }
  };

  // Handle filtering of table based on user input
  const handleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter.key]: filter.value,
    }));
  };

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter and sort issues based on the current filters and sort configuration
  const filteredAndSortedIssues = useMemo(() => {
    // Filter issues based on the search term
    const searchFilteredIssues = issues.filter((issue) => {
      const title = issue.title || ""; // Default to empty string if `title` is undefined
      const name = issue.name || ""; // Default to empty string if `name` is undefined

      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Sort and filter based on the current configurations
    return sortAndFilterData(searchFilteredIssues, sortConfig, filters);
  }, [issues, sortConfig, filters, searchTerm]);

  // Get the color for the status
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#ffa007";
      case "INPROGRESS":
        return "#14788f";
      case "RESOLVED":
        return "#28a745";
      case "ON HOLD":
        return "#8f9396";
      case "ESCALATED":
        return "#f70000";
      default: 
        return "transparent";
    }
  };

  // Function to handle "View" button click
  const handleViewClick = (issueId) => {
    localStorage.setItem("selected_log_id", issueId); // Store the issueId in local storage
    navigate(`/techniciandashboard/issues/${issueId}`); // Navigate to IssueDetails page
  };

  // Function to close the table
  const handleClose = () => {
    navigate("/techniciandashboard/dashboard");
  };

  return (
    <>
      {isTableVisible && ( // Render the table only if isTableVisible is true
        <div className={styles.tableContainer}>
          <Header
            handleSort={handleSortOption}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
          />

          <table className={styles.issueTable}>
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Issue title</th>
                <th>Date reported</th>
                <th>Department</th>
                <th>Priority level</th>
                <th>Issue Status</th>

                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedIssues.map((issue) => (
                <tr key={issue.issueId}>
                  <td>{issue.issueId}</td>
                  <td>{issue.issueTitle}</td>
                  <td>{issue.issuedAt}</td>
                  <td>{issue.department}</td>
                  <td>{issue.priority}</td>
                  <td>
                    <div
                      className={styles.status}
                      style={{ color: getStatusColor(issue.status) }}
                    >
                      {issue.status}
                    </div>
                  </td>
                  <td>
                    {/* Add navigation to issue details when clicking the View button */}
                    <button
                      className={styles.viewButton}
                      onClick={() => handleViewClick(issue.issueId)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* End message with lines on either side */}
          <div className={styles.endMessage}>
            <div className={styles.line} />
            <span id={styles.tableSpan}>You have reached the end</span>
            <div className={styles.line} />
          </div>
          <button className={styles.closeButton} onClick={handleClose}>
            CLOSE
          </button>
        </div>
      )}
    </>
  );
};
export default Table;
