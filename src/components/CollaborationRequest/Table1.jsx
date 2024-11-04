import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";
import CollaIcon from "./assets/icons/callabIcon.png";
import FiltIcon from "./assets/icons/FiltIcon.png";
import AvatarIcon from "./assets/icons/avatarIcon.png";
import SortIcon from "./assets/icons/SortIcon.png";
import { sortUsers } from "./sortUsers"; // Import the sort function
import useIssues from "./useIssues"; // Import the useIssues hook

const Table = () => {
  const { issues } = useIssues(); // Access issues from useIssues
  const navigate = useNavigate();

  // State to manage sorting, filtering, and dropdown visibility
  const [sortType, setSortType] = useState("");
  const [filterName, setFilterName] = useState(""); // Track input value for name filter
  const [filterTime, setFilterTime] = useState(""); // Track input value for time filter
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Track dropdown visibility
  const [isSortOpen, setIsSortOpen] = useState(false); // Track sort dropdown visibility

  const filterRef = useRef(null); // Ref for filter dropdown
  const sortRef = useRef(null); // Ref for sort dropdown

  // Function to handle sorting
  const handleSort = (type) => {
    const sortedIssues = sortUsers(issues, type); // Use the imported sort function
    setSortType(type); // Update current sort type
    setIsSortOpen(false); // Close sort dropdown after selection
  };

  // Function to handle filter input changes
  const handleNameChange = (e) => {
    setFilterName(e.target.value); // Update name filter value
  };

  const handleTimeChange = (e) => {
    setFilterTime(e.target.value); // Update time filter value
  };

  const handleIssueClick = (issue) => {
    navigate(`/issue/${issue.id}`, { state: issue }); // Pass the issue data
  };
  // Filter issues based on filter criteria
  const filteredIssues = issues.filter((issue) => {
    const matchesName = issue.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesTime = issue.time.includes(filterTime);
    return matchesName && matchesTime; // Return issues matching both criteria
  });

  // Sorted filtered issues
  const displayedIssues = sortType
    ? sortUsers(filteredIssues, sortType)
    : filteredIssues;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef, sortRef]);

  return (
    <div className="collab-table-container">
  {/* Header */}
  <div className="collab-header">
    <div className="collab-header-title">
      <img src={CollaIcon} width="30" height="30" alt="Collaboration Icon" /> COLLABORATION REQUESTS
    </div>
    <div className="collab-header-actions">
      <button className="collab-archived">
        <h2>Archived</h2>
      </button>
      <div className="collab-filter-container" ref={filterRef}>
        <button
          className="collab-header-btn"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <img src={FiltIcon} width="15" height="15" alt="Filter Icon" /> Filter
        </button>
        {isFilterOpen && (
          <div className="collab-filter-dropdown">
            <div className="collab-filter-inputs">
              <input
                type="text"
                placeholder="Filter by Name..."
                value={filterName}
                onChange={handleNameChange}
                className="collab-filter-input"
              />
              <input
                type="text"
                placeholder="Filter by Time..."
                value={filterTime}
                onChange={handleTimeChange}
                className="collab-filter-input"
              />
            </div>
          </div>
        )}
      </div>
      <div className="collab-sort-dropdown-container" ref={sortRef}>
        <button
          className="collab-sort-button"
          onClick={() => setIsSortOpen((prev) => !prev)}
        >
          <img src={SortIcon} width="15" height="15" alt="Sort Icon" /> Sort
        </button>
        {isSortOpen && (
          <div className="collab-sort-options">
            <div className="collab-sort-option" onClick={() => handleSort("alphabetically-name")}>
              By name
            </div>
            <div className="collab-sort-option" onClick={() => handleSort("alphabetically-title")}>
              By title
            </div>
            <div className="collab-sort-option" onClick={() => handleSort("time-old-new")}>
              By time (old - new)
            </div>
            <div className="collab-sort-option" onClick={() => handleSort("time-new-old")}>
              By time (new - old)
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Table Content */}
  <div className="collab-table">
    {displayedIssues.map((issue, index) => (
      <div className="collab-row" key={index}>
        <div className="collab-profile-info">
          <div className="collab-profile-icon">
            <img src={AvatarIcon} width="50" height="50" alt="Avatar Icon" />
          </div>
          <div className="collab-details"  onClick={() => handleIssueClick(issue)}>
            <div className="collab-name">
              {issue.name} <span className="collab-title">{issue.title}</span>
            </div>
            <div className="collab-vertical-line">
              <button className="collab-issue-title">
                <div className="collab-issue-na">{issue.issueTitle}</div>
                <div className="collab-issue-details">{issue.issueDetails}</div>
              </button>
            </div>
          </div>
        </div>

        <div className="collab-buttons">
          <div className="collab-time">{issue.time}</div>
          <button className="collab-btn collab-btn-decline">Decline</button>
          <button className="collab-btn collab-btn-accept">Accept</button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Table;
