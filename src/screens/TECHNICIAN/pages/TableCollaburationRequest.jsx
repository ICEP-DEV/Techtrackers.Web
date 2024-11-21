import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/TableCollaburationRequest.module.css";
import CollaIcon from "../images/callabIcon.png";
import FiltIcon from "../images/FiltIcon.png";
import AvatarIcon from "../images/avatarIcon.png";
import SortIcon from "../images/SortIcon.png";
import { sortUsers } from "./sortUsersCollaburationRequest"; // Import the sort function
import useIssues from "./useIssuesCollaburationRequest"; // Import the useIssues hook
import DeclineIcon from "../images/declineIcon.png";
import AcceptIcon from "../images/acceptIcon.png";

const Table = () => {

  const { issues } = useIssues(); // Access issues from useIssues

  const navigate = useNavigate();

  // State to manage sorting, filtering, and dropdown visibility
  const [sortType, setSortType] = useState("");
  const [filterName, setFilterName] = useState(""); // Track input value for name filter
  const [filterTime, setFilterTime] = useState(""); // Track input value for time filter
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Track dropdown visibility
  const [isSortOpen, setIsSortOpen] = useState(false); // Track sort dropdown visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message visibility

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
    navigate(`/techniciandashboard/issue/${issue.id}`, { state: issue }); // Pass the issue data
  };

  // Handle Accept button click
  const handleAccept = () => {
    setPopupMessage("Accepts collaboration request");
  };

  // Handle Decline button click
  const handleDecline = () => {
    setPopupMessage("Declines collaboration request");
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


  // Popup component for displaying accept/decline messages with icons
  const Popup = ({ message, onClose }) => (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <p>
          {message.includes("Accept") ? (
            <>
              <img src={AcceptIcon} alt="Accept Icon" width="25" height="25" />
              {message}
            </>
          ) : (
            <>
              <img src={DeclineIcon} alt="Decline Icon" width="25" height="25" />
              {message}
            </>
          )}
        </p>
        <button className={styles.popupClose} onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div className={styles.collabTableContainer}>
  {/* Header */}
  <div className={styles.collabHeader}>
    <div className={styles.collabHeaderTitle}>
      <img src={CollaIcon} width="40" height="30" alt="Collaboration Icon" /> COLLABORATION REQUESTS
    </div>
    <div className={styles.collabHeaderActions}>
      <div className={styles.collabFilterContainer} ref={filterRef}>
        <button
          className={styles.collabHeaderBtn}
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          <img src={FiltIcon} width="15" height="15" alt="Filter Icon" /> Filter
        </button>
        {isFilterOpen && (
          <div className={styles.collabFilterDropdown}>
            <div className={styles.collabFilterInputs}>
              <input
                type="text"
                placeholder="Filter by Name..."
                value={filterName}
                onChange={handleNameChange}
                className={styles.collabFilterInput}
              />
              <input
                type="text"
                placeholder="Filter by Time..."
                value={filterTime}
                onChange={handleTimeChange}
                className={styles.collabFilterInput}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.collabSortDropdownContainer} ref={sortRef}>
        <button
          className={styles.collabSortButton}
          onClick={() => setIsSortOpen((prev) => !prev)}
        >
          <img src={SortIcon} width="15" height="15" alt="Sort Icon" /> Sort
        </button>
        {isSortOpen && (
          <div className={styles.collabSortOptions}>
            <div className={styles.collabSortOption} onClick={() => handleSort("alphabetically-name")}>
              By name
            </div>
            <div className={styles.collabSortOption} onClick={() => handleSort("alphabetically-title")}>
              By title
            </div>
            <div className={styles.collabSortOption} onClick={() => handleSort("time-old-new")}>
              By time (old - new)
            </div>
            <div className={styles.collabSortOption} onClick={() => handleSort("time-new-old")}>
              By time (new - old)
            </div>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Table Content */}
  <div className={styles.collabTable}>
    {displayedIssues.map((issue, index) => (
      <div className={styles.collabRow} key={index}>
        <div className={styles.collabProfileInfo}>
          <div className={styles.collabProfileIcon}>
            <img src={AvatarIcon} width="50" height="50" alt="Avatar Icon" />
          </div>
          <div className={styles.collabDetails}  onClick={() => handleIssueClick(issue)}>
            <div className={styles.collabName}>
              {issue.name} <span className={styles.collabTitle}>{issue.title}</span>
            </div>
            <div className={styles.collabVerticalLine}>
              <button className={styles.collabIssueTitle}>
                <div className={styles.collabIssueNa}>{issue.issueTitle}</div>
                <div className={styles.collabIssueDetails}>{issue.issueDetails}</div>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.collabButtons}>
          <div className={styles.collabTime}>{issue.time}</div>
          <button className={`${styles.collabBtn} ${styles.collabBtnDecline}`} onClick={handleDecline}>
                Decline
            </button>
            <button className={`${styles.collabBtn} ${styles.collabBtnAccept}`} onClick={handleAccept}>
                Accept
            </button>
        </div>

        {/* Popup for showing accept/decline messages */}
      {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage("")} />}

      </div>
    ))}
  </div>
</div>

  );
};

export default Table;
