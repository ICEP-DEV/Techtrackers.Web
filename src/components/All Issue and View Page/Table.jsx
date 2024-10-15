import React, { useMemo } from "react";
import Header from "./TableHeader";
import { sortAndFilterData } from "./Sort";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Table.css";

// Include the list of issues and pass them from the parent component
const Table = ({ issues, setIssues }) => {
  // issues and setIssues passed as props

  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: null,
  });
  const [filters, setFilters] = React.useState({
    date: "",
    status: "",
    department: "",
    urgency: "",
  });
  const [searchTerm, setSearchTerm] = React.useState("");

  const navigate = useNavigate(); // Initialize useNavigate

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
    const searchFilteredIssues = issues.filter((issue) =>
      issue.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return sortAndFilterData(searchFilteredIssues, sortConfig, filters);
  }, [issues, sortConfig, filters, searchTerm]);

  // Get the color for the status
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "rgb(174, 0, 0)";
      case "Ongoing":
        return "#bfa829";
      case "Done":
        return "green";
      case "On Hold":
        return "#0a4d4d";
      default:
        return "transparent";
    }
  };

  return (
    <div className="table-container">
      <Header
        handleSort={handleSortOption}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
      />

      <table className="issue-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("issueId")}>Issue ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("title")}>Issue title</th>
            <th onClick={() => handleSort("date")}>Date reported</th>
            <th onClick={() => handleSort("department")}>Department</th>
            <th onClick={() => handleSort("priority")}>Priority level</th>
            <th onClick={() => handleSort("dueDate")}>Due Date</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedIssues.map((issue) => (
            <tr key={issue.issueId}>
              <td>{issue.issueId}</td>
              <td>{issue.name}</td>
              <td>{issue.title}</td>
              <td>{issue.date}</td>
              <td>{issue.department}</td>
              <td>{issue.priority}</td>
              <td>{issue.dueDate}</td>
              <td>
                {/* Add navigation to issue details when clicking the View button */}
                <button
                  className="view-button"
                  onClick={() => navigate(`/issues/${issue.issueId}`)} // Navigate to IssueDetails page
                >
                  View
                </button>
              </td>
              <td>
                <div
                  className="status"
                  style={{
                    color: getStatusColor(issue.status),
                    display: "inline",
                  }}
                >
                  {issue.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="end-message">
        <span>You have reached the end</span>
      </div>
      <button className="close-button">CLOSE</button>
    </div>
  );
};

export default Table;
