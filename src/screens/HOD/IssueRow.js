import React, { useState } from "react";
import styles from './ManageLogs.module.css'; // Import the same module

const IssueRow = ({ log }) => {
  const [action, setAction] = useState("Action"); // Initial button text
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleActionSelect = (newAction) => {
    setAction(newAction);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <tr>
      <td>{log.id}</td>
      <td>{log.title}</td>
      <td>{log.priority}</td>
      <td>{log.assignedTo}</td>
      <td>{log.loggedDate}</td>
      <td>
        <button className={styles["view-button"]}>View</button>

        {/* Action Button with Dropdown */}
        <div className={styles["action-dropdown"]}>
          <button
            className={styles["action-button"]}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            {action} ▼
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className={styles["dropdown-menu"]}>
              <button onClick={() => handleActionSelect("Open")}>
                Re-open
              </button>
              <button onClick={() => handleActionSelect("Closed")}>
                Closed
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default IssueRow;
