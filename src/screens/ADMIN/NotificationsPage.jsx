import React, { useState, useEffect, useRef } from "react";
import '../ADMIN/Adminstyles/NotificationPage.css'; // Import your existing CSS file
import NotifiIcon from "./adminIcons/notifMainIcon.png";
import FiltIcon from "./adminIcons/FiltIcon.png";
import SortIcon from "./adminIcons/SortIcon.png";
import AvatarIcon from "./adminIcons/avatarIcon.png";
import SearchIcon from "./adminIcons/searchIcon.png";

// Notification Data
const initialData = [
  {
    user: "Lunga Ntshingila",
    issueId: "HR-P2-1132",
    status: "RESOLVED",
    time: "12:09",
  },
  {
    user: "Lunga Ntshingila",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "John Doe",
    issueId: "HR-P3-1133",
    status: "RESOLVED",
    time: "10:45",
  },
];

// Status class helper
const statusClass = (status) => {
  if (status === "RESOLVED") return "statusResolved";
  if (status === "IN PROGRESS") return "statusInProgress";
  return "";
};

// Header component
const Header = ({
  onSortChange,
  onFilterChange,
  filterDropdownOpen,
  sortDropdownOpen,
  toggleSortDropdown,
  toggleFilterDropdown,
  searchQuery,
  onSearchChange,
}) => (
  <div className="header">
    <div className="headerLeft">
      <img src={NotifiIcon} width="30" height="30" alt="Notification Icon" />
      <h2>NOTIFICATIONS</h2>
    </div>
    <div className="headerRight">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="search"
          className="searchInput"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <img src={SearchIcon} width="10" height="10" alt="Search Icon" className="searchIcon" />
      </div>
      <button className="archivedBtn"><h2>Archived</h2></button>
      <div className="filterContainer">
        <button className="filterBtn" onClick={toggleFilterDropdown}>
          <img src={FiltIcon} width="15" height="15" alt="Filter Icon" /> Filter
        </button>
        {filterDropdownOpen && (
          <ul className="filterDropdown">
            <li onClick={() => onFilterChange("All")}>All</li>
            <li onClick={() => onFilterChange("RESOLVED")}>Resolved</li>
            <li onClick={() => onFilterChange("IN PROGRESS")}>In Progress</li>
          </ul>
        )}
      </div>
      <div className="sortContainer">
        <button className="sortBtn" onClick={toggleSortDropdown}>
          <img src={SortIcon} width="15" height="15" alt="Sort Icon" /> Sort
        </button>
        {sortDropdownOpen && (
          <ul className="sortDropdown">
            <li onClick={() => onSortChange("user")}>Name</li>
            <li onClick={() => onSortChange("issueId")}>Issue ID</li>
            <li onClick={() => onSortChange("time")}>Time</li>
          </ul>
        )}
      </div>
    </div>
  </div>
);

// Notification Row component
const NotificationRow = ({ row }) => (
  <div className="row">
    <div className="userInfo">
      <img src={AvatarIcon} width="44" height="44" alt="User Icon" />
      <div className="userText">
        <strong>{row.user}</strong> has marked issue{" "}
        <strong>{row.issueId}</strong> as{" "}
        <span className={statusClass(row.status)}>{row.status}</span>
      </div>
    </div>
    <div className="rowFooter">
      <span className="time">{row.time}</span>
      <button className="viewBtn">View</button>
    </div>
  </div>
);

// Main Notification component
const Notification = () => {
  const [data, setData] = useState(initialData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const handleSortChange = (sortBy) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortBy === "user") return a.user.localeCompare(b.user);
      if (sortBy === "issueId") return a.issueId.localeCompare(b.issueId);
      if (sortBy === "time") return a.time.localeCompare(b.time);
      return 0;
    });
    setData(sortedData);
    setSortDropdownOpen(false);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilterDropdownOpen(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredData = data.filter((item) => {
    if (filterStatus !== "All" && item.status !== filterStatus) return false;
    return !searchQuery || item.user.toLowerCase().includes(searchQuery.toLowerCase()) || item.issueId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterDropdownOpen(false);
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container" ref={dropdownRef}>
      <Header
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        filterDropdownOpen={filterDropdownOpen}
        sortDropdownOpen={sortDropdownOpen}
        toggleSortDropdown={() => setSortDropdownOpen((prev) => !prev)}
        toggleFilterDropdown={() => setFilterDropdownOpen((prev) => !prev)}
      />
      {filteredData.map((row, index) => (
        <NotificationRow key={index} row={row} />
      ))}
    </div>
  );
};

export default Notification;
