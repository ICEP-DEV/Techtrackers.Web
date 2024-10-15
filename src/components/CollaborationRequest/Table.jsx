import React, { useState, useEffect, useRef } from "react";
import "./Table.css";
import CollaIcon from "../CollaborationRequest/assets/icons/callabIcon.png";
import FiltIcon from "../CollaborationRequest/assets/icons/FiltIcon.png";
import AvatarIcon from "../CollaborationRequest/assets/icons/avatarIcon.png";
import SortIcon from "../CollaborationRequest/assets/icons/SortIcon.png";
import { sortUsers } from "./sortUsers"; // Import the sort function

const Table = () => {
  // Initial user data
  const usersData = [
    {
      name: "MIKE MDLULI",
      title: "Cloud Technician",
      issueTitle: "Issue Title",
      issueDetails: "Some details about the issue will go on here...",
      time: "14:18",
      date: "2023/08/01",
    },
    {
      name: "COLIN RADEBE",
      title: "System Analyst",
      issueTitle: "Issue Title",
      issueDetails: "Some details about the issue will go on here...",
      time: "14:18",
      date: "2023/08/02",
    },
    {
      name: "FAITH MNISI",
      title: "Web Support Technician",
      issueTitle: "Issue Title",
      issueDetails: "Some details about the issue will go on here...",
      time: "14:18",
      date: "2023/07/29",
    },
    {
      name: "NATASHA SMITH",
      title: "Telecommunications Technician",
      issueTitle: "Issue Title",
      issueDetails: "Some details about the issue will go on here...",
      time: "14:18",
      date: "2023/08/05",
    },
  ];

  // State to manage users, sorting, and filter configuration
  const [users, setUsers] = useState(usersData);
  const [sortType, setSortType] = useState("");
  const [filterName, setFilterName] = useState(""); // Track input value for name filter
  const [filterTime, setFilterTime] = useState(""); // Track input value for time filter
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Track dropdown visibility
  const [isSortOpen, setIsSortOpen] = useState(false); // Track sort dropdown visibility

  const filterRef = useRef(null); // Ref for filter dropdown
  const sortRef = useRef(null); // Ref for sort dropdown

  // Function to handle sorting
  const handleSort = (type) => {
    const sortedUsers = sortUsers(users, type); // Use the imported sort function
    setUsers(sortedUsers);
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

  // Filter users based on filter criteria
  const filteredUsers = usersData.filter(user => {
    const matchesName = user.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesTime = user.time.includes(filterTime);
    return matchesName && matchesTime; // Return users matching both criteria
  });

  // Sorted filtered users
  const displayedUsers = sortType ? sortUsers(filteredUsers, sortType) : filteredUsers;

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
    <div className="table-containerer">
      {/* Header */}
      <div className="Table-header">
        <div className="header-title">
          <img src={CollaIcon} width="30" height="30" alt="Collaboration Icon" /> COLLABORATION REQUESTS
        </div>
        <div className="header-actions">
        <button className="archived">
          <h2>Archived</h2>
        </button>
          <div className="filter-container" ref={filterRef}>
            <button className="header-btn" onClick={() => setIsFilterOpen((prev) => !prev)}>
              <img src={FiltIcon} width="15" height="15" alt="Filter Icon" /> Filter
            </button>
            {isFilterOpen && (
              <div className="filter-dropdown">
                <div className="filter-inputs">
                  <input
                    type="text"
                    placeholder="Filter by Name..."
                    value={filterName}
                    onChange={handleNameChange}
                    className="filter-input"
                  />
                  <input
                    type="text"
                    placeholder="Filter by Time..."
                    value={filterTime}
                    onChange={handleTimeChange}
                    className="filter-input"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-container" ref={sortRef}>
            <button className="sort-button" onClick={() => setIsSortOpen((prev) => !prev)}>
              <img src={SortIcon} width="15" height="15" alt="Sort Icon" /> Sort
            </button>
            {isSortOpen && (
              <div className="sort-options">
                <div className="sort-option" onClick={() => handleSort("alphabetically-name")}>
                  By name
                </div>
                <div className="sort-option" onClick={() => handleSort("alphabetically-title")}>
                  By title 
                </div>
                <div className="sort-option" onClick={() => handleSort("time-old-new")}>
                  By time (old - new)
                </div>
                <div className="sort-option" onClick={() => handleSort("time-new-old")}>
                  By time (new - old)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="table-container">
        {displayedUsers.map((user, index) => (
          <div className="table-row" key={index}>
            <div className="profile">
              <div className="profile-icon">
                <img src={AvatarIcon} width="50" height="50" alt="Avatar Icon" />
              </div>
              <div className="details-info">
                <div className="name">
                  {user.name} <p className="title">{user.title}</p>
                </div>
                <div className="vertical-line"></div>
                <div className="issue-title">{user.issueTitle}</div>
                <div className="issue-details">{user.issueDetails}</div>
              </div>
            </div>
            <div className="time">{user.time}</div>
            <div className="buttons">
              <button className="btn btn-decline">Decline</button>
              <button className="btn btn-accept">Accept</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
