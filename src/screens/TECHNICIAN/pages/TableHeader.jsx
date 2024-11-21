import React, { useState, useEffect, useRef } from "react";
import styles from "../SidebarCSS/TableHeader.module.css";

const Header = ({ handleSort, handleFilter, handleSearch }) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
    setShowSortDropdown(false);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowFilterDropdown(false);
  };

  const applyFilter = () => {
    handleFilter({ key: filterType, value: filterValue });
    setShowFilterDropdown(false);
  };

  const handleOptionClick = (sortType) => {
    handleSort(sortType);
    setShowSortDropdown(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside both the filter and sort dropdowns
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target) &&
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
        <i className={`fa-regular fa-clock ${styles.faClock}`} aria-hidden="true"></i>
          <div className={styles.headerText}>
            <h2>ALL ISSUES</h2>
          </div>
        </div>
        <div className={styles.headerRight}>
          <input
            type="text"
            id="searchInput"
            className={styles.searchInput}
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <i className={`fa fa-search ${styles.search}`} aria-hidden="true"></i>

          <div className={styles.filterSortContainer}>
            {/* Filter Dropdown */}
            <div className={styles.filterDropdownContainer} ref={filterDropdownRef}>
              <button className={styles.filterButton1} onClick={toggleFilterDropdown}>
              <i className={`fa-solid fa-filter ${styles.filter}`} aria-hidden="true">Filter</i>
              </button>
              {showFilterDropdown && (
                <div className={styles.filterOptions}>
                  <div>
                    <label>Date:</label>
                    <input
                      type="text"
                      placeholder="Enter date"
                      onChange={(e) => setFilterValue(e.target.value)}
                    />
                    <button onClick={() => setFilterType("date")}>Apply</button>
                  </div>
                  <div>
                    <label>Status:</label>
                    <select onChange={(e) => setFilterValue(e.target.value)}>
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="InProgress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button onClick={() => setFilterType("status")}>
                      Apply
                    </button>
                  </div>
                  <div>
                    <label>Department:</label>
                    <input
                      type="text"
                      placeholder="Enter department"
                      onChange={(e) => setFilterValue(e.target.value)}
                    />
                    <button onClick={() => setFilterType("department")}>
                      Apply
                    </button>
                  </div>
                  <div>
                    <label>Priority Level:</label>
                    <select onChange={(e) => setFilterValue(e.target.value)}>
                      <option value="">Select Urgency</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button onClick={() => setFilterType("urgency")}>
                      Apply
                    </button>
                  </div>
                  <div>
                    <button onClick={applyFilter}>Apply Filter</button>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className={styles.sortDropdownContainer} ref={sortDropdownRef}>
              <button className={styles.sortButton1} onClick={toggleSortDropdown}>
              <i className={`fa-solid fa-list ${styles.listIcon}`} aria-hidden="true"></i> Sort
              </button>
              {showSortDropdown && (
                <div className={styles.sortOptions}>
                  <div
                    className={styles.sortOption}
                    onClick={() => handleOptionClick("date-old-new")}
                  >
                    By date (old - new)
                  </div>
                  <div
                    className={styles.sortOption}
                    onClick={() => handleOptionClick("date-new-old")}
                  >
                    By date (new - old)
                  </div>
                  <div
                    className={styles.sortOption}
                    onClick={() => handleOptionClick("alphabetically")}
                  >
                    Alphabetically
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
