import React, { useEffect, useMemo, useState } from "react";
import Header from "./TableHeader";
import { sortAndFilterData } from "./Sort";
import { useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/TableAllIssues.module.css";

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    department: "",
    priority: "",
  });


  // Fetch issues on component mount
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        if (!userInfo || !userInfo.userId) {
          alert("User is not logged in or userId is missing.");
          return;
        }

        const userId = userInfo.userId;
        const response = await fetch(
          `https://localhost:44328/api/Log/GetLogsTechnician?userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Issues:", data);
          setIssues(data);
        } else {
          alert("Failed to fetch issues. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
        alert("An error occurred while fetching issues.");
      }
    };

    fetchIssues();
  }, []);

  // Sort handler
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSortOption = (sortOption) => {
    const options = {
      "date-old-new": { key: "issuedAt", direction: "ascending" },
      "date-new-old": { key: "issuedAt", direction: "descending" },
    };

    if (options[sortOption]) {
      setSortConfig(options[sortOption]);
    }
  };

  // Filter handler
  const handleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter.key]: filter.value,
    }));
  };

  // Search handler
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Show all issues handler
  const handleShowAllIssues = () => {
    setSearchTerm("");
    setFilters({
      date: "",
      status: "",
      department: "",
      priority: "",
    });
    setSortConfig({
      key: null,
      direction: null,
    });
  };

  // Memoized filtered and sorted issues
  const filteredAndSortedIssues = useMemo(() => {
    const filteredIssues = issues.filter((issue) => {
      const issueId = issue.issueId ? issue.issueId.toString() : "";
      const issueTitle = issue.issueTitle || "";
      const department = issue.department || "";
      const priority = issue.priority || "";
      const status = issue.status || "";

      const matchesSearchTerm =
        issueId.includes(searchTerm) ||
        issueTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
        status.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.department || department === filters.department) &&
        (!filters.priority || priority === filters.priority) &&
        (!filters.status || status === filters.status);

      return matchesSearchTerm && matchesFilters;
    });

    return sortAndFilterData(filteredIssues, sortConfig, filters);
  }, [issues, sortConfig, filters, searchTerm]);

  // Status color handler
  const getStatusColor = (status) => {
    switch (status) {
      case "ESCALATED":
        return "#f70000";
      case "INPROGRESS":
        return "#14788f";
      case "RESOLVED":
        return "#28a745";
      case "ONHOLD":
        return "#0a4d4d";
      case "PENDING":
        return "#ffa007";
      default:
        return "black";
    }
  };

  const handleViewClick =(issueId) =>{
    localStorage.setItem("selected_issue_id", issueId);
    navigate(`/techniciandashboard/issues/${issueId}`);
  };

  // Function to close the table
  const handleClose = () => {
    navigate("/techniciandashboard/dashboard");
  };

  return (
    <>
      {isTableVisible && (
        <div className={styles.tableContainer}>
          <Header
            handleSort={handleSortOption}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
          />

          <div className={styles.controls}>
            <button
              className={styles.showAllButton}
              onClick={handleShowAllIssues}
            >
              Show All Issues
            </button>
          </div>

          <table className={styles.issueTable}>
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Issue Title</th>
                <th
                  onClick={() => handleSortOption("date-new-old")}
                  style={{ cursor: "pointer" }}
                >
                  Date Reported
                </th>
                <th>Department</th>
                <th>Priority Level</th>
                <th>Status</th>
                <th>Action</th>
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
