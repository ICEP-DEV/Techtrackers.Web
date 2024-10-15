import React, { useState, useEffect, useRef } from "react";
import "../All Issue and View Page/TableHeader.css";

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
    <div className="header-container">
      <header className="header">
        <div className="header-left">
          <i className="fa-regular fa-clock" aria-hidden="true"></i>
          <div className="header-text">
            <h2>ALL ISSUES</h2>
          </div>
        </div>
        <div className="header-right">
          <input
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <i className="fa fa-search search" aria-hidden="true"></i>

          <div className="filter-sort-container">
            {/* Filter Dropdown */}
            <div className="filter-dropdown-container" ref={filterDropdownRef}>
              <button className="filter-button" onClick={toggleFilterDropdown}>
                <i className="fa-solid fa-filter" aria-hidden="true"></i> Filter
              </button>
              {showFilterDropdown && (
                <div className="filter-options">
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
                      <option value="Ongoing">Ongoing</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Done">Done</option>
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
            <div className="sort-dropdown-container" ref={sortDropdownRef}>
              <button className="sort-button" onClick={toggleSortDropdown}>
                <i className="fa-solid fa-list" aria-hidden="true"></i> Sort
              </button>
              {showSortDropdown && (
                <div className="sort-options">
                  <div
                    className="sort-option"
                    onClick={() => handleOptionClick("date-old-new")}
                  >
                    By date (old - new)
                  </div>
                  <div
                    className="sort-option"
                    onClick={() => handleOptionClick("date-new-old")}
                  >
                    By date (new - old)
                  </div>
                  <div
                    className="sort-option"
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
