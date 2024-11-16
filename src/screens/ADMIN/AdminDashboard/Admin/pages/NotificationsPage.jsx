import React, { useState, useEffect, useRef } from "react";
import styles from "../SidebarCSS/NotificationPage.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
import NotifiIcon from "../adminIcons/notifMainIcon.png";
import FiltIcon from "../adminIcons/FiltIcon.png";
import SortIcon from "../adminIcons/SortIcon.png";
import AvatarIcon from "../adminIcons/avatarIcon.png";
import SearchIcon from "../adminIcons/searchIcon.png";

// Notification Data
const initialData = [
  {
    user: "Lunga Ntshingila",
    issueId: "HR-P2-1132",
    status: "RESOLVED",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
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
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
  {
    user: "Hamilton Masipa",
    issueId: "HR-P2-1132",
    status: "IN PROGRESS",
    time: "12:09",
  },
];

// Status class helper
const statusClass = (status) => {
  if (status === "RESOLVED") return styles.statusResolved;
  if (status === "IN PROGRESS") return styles.statusInProgress;
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
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.notificationIcon}>
          <span role="img" aria-label="bell">
            <img
              src={NotifiIcon}
              width="30"
              height="30"
              alt="Notification Icon"
            />
          </span>
        </div>
        <h2>NOTIFICATIONS</h2>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="search"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)} // Update search in real-time
          />
          <img
            src={SearchIcon}
            width="10"
            height="10"
            alt="Search Icon"
            className={styles.searchIcon}
          />
        </div>
        <button className={styles.archivedBtn}>
          <h2>Archived</h2>
        </button>

        {/* Filter Button with Dropdown */}
        <div className={styles.filterContainer}>
          <button className={styles.filterBtn} onClick={toggleFilterDropdown}>
            <span role="img" aria-label="filter">
              <img src={FiltIcon} width="15" height="15" alt="Filter Icon" />
            </span>{" "}
            Filter
          </button>
          {filterDropdownOpen && (
            <ul className={styles.filterDropdown}>
              <li onClick={() => onFilterChange("All")}>All</li>
              <li onClick={() => onFilterChange("RESOLVED")}>Resolved</li>
              <li onClick={() => onFilterChange("IN PROGRESS")}>In Progress</li>
            </ul>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className={styles.sortContainer}>
          <button className={styles.sortBtn} onClick={toggleSortDropdown}>
            <span role="img" aria-label="sort">
              <img src={SortIcon} width="15" height="15" alt="Sort Icon" />
            </span>{" "}
            Sort
          </button>
          {sortDropdownOpen && (
            <ul className={styles.sortDropdown}>
              <li onClick={() => onSortChange("user")}>Name</li>
              <li onClick={() => onSortChange("issueId")}>Issue ID</li>
              <li onClick={() => onSortChange("time")}>Time</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Notification component
const Notification = () => {
  const [data, setData] = useState(initialData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Sorting function
  const handleSortChange = (sortBy) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortBy === "user") return a.user.localeCompare(b.user);
      if (sortBy === "issueId") return a.issueId.localeCompare(b.issueId);
      if (sortBy === "time") return a.time.localeCompare(b.time);
      return 0;
    });
    setData(sortedData);
    setSortDropdownOpen(false); // Close dropdown after sorting
  };

  const navigate = useNavigate();

  // Filtering function
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilterDropdownOpen(false); // Close the dropdown after selecting
  };

  // Handle search in real-time
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Filter the data based on selected filter status and search query
  const filteredData = data.filter((item) => {
    if (filterStatus !== "All" && item.status !== filterStatus) return false;
    if (!searchQuery) return true; // Show all if no search query
    return (
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issueId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterDropdownOpen(false);
        setSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSortDropdown = () => {
    setSortDropdownOpen((prev) => !prev);
    setFilterDropdownOpen(false); // Close filter dropdown if sort is opened
  };

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen((prev) => !prev);
    setSortDropdownOpen(false); // Close sort dropdown if filter is opened
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <Header
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        filterDropdownOpen={filterDropdownOpen}
        sortDropdownOpen={sortDropdownOpen}
        toggleSortDropdown={toggleSortDropdown}
        toggleFilterDropdown={toggleFilterDropdown}
      />
      {filteredData.map((row, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.userInfo}>
            <div className={styles.userIcon}>
              <span role="img" aria-label="user">
                <img src={AvatarIcon} width="44" height="44" alt="User Icon" />
              </span>
            </div>
            <div className={styles.userText}>
              <strong>{row.user}</strong> has marked issue{" "}
              <strong>{row.issueId}</strong> as{" "}
              <span className={statusClass(row.status)}>{row.status}</span>
            </div>
          </div>
          <div className={styles.rowFooter}>
            <span className={styles.time}>{row.time}</span>
            <button
              className={styles.viewBtn}
              onClick={() =>
                navigate("/admindashboard/notif-view", { state: row })
              }
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
