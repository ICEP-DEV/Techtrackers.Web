import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../SidebarCSS/AssignTechnician.module.css";
import logo from "../adminIcons/addCircle.png";

const AssignTech = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  // Fetch technicians from the backend
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await fetch(
          "https://localhost:44328/api/Technician/GetAll"
        );
        if (response.ok) {
          const data = await response.json();
          setTechnicians(data);
        } else {
          console.error("Failed to fetch technicians.");
        }
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    const fetchIssues = async () => {
      try {
        const response = await fetch(
          "https://localhost:44328/api/AdminLog/GetLogs"
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched issues:", data);
          setIssues(data);
        } else {
          console.error("Failed to fetch issues.");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchTechnicians();
    fetchIssues();
  }, []);

  // Function to format logId for display purposes
  const formatLogId = (id) => `HR-${id}`;

  const handleAssignClick = async () => {
    if (selectedCheckbox !== null && selectedIssueId !== null) {
      const assignedTech = technicians[selectedCheckbox];

      const payload = {
        logId: parseInt(selectedIssueId, 10), // Use integer logId for backend API
        technicianId: assignedTech.userId,
      };

      try {
        const response = await fetch(
          "https://localhost:44328/api/Log/AssignTechnician",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          toast.success(`You have assigned ${assignedTech.name} to the task!`);
          setShowModal(false);
        } else {
          toast.error(responseData.title || "Failed to assign technician.");
        }
      } catch (error) {
        console.error("Error assigning technician:", error);
        toast.error("An error occurred while assigning the technician.");
      }
    } else {
      toast.error("Please select a technician and a log to assign.");
    }
  };

  const handleChevronClick = (index) => {
    if (selectedTech === technicians[index]) {
      setSelectedTech(null);
    } else {
      setSelectedTech(technicians[index]);
    }
    setSelectedCheckbox(index);
  };

  const handleCloseTechDetails = () => {
    setSelectedTech(null);
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>
        <img src={logo} alt="Logo" className={styles.logo} />
        ASSIGN TECHNICIAN
      </h2>
      <table className={`${styles.table} table table-striped`}>
        <thead>
          <tr>
            <th>Log By</th>
            <th>Issue Description</th>
            <th>Due Date</th>
            <th>Department</th>
            <th>Priority Level</th>
            <th>Log ID</th> {/* Display the formatted log ID */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.logId}>
              <td>{issue.logBy}</td>
              <td>{issue.description}</td>
              <td>{issue.dueDate}</td>
              <td>{issue.department}</td>
              <td>{issue.priority}</td>
              <td>{issue.issueId}</td> {/* Format logId for display */}
              <td>
                <button
                  className={styles.btnAssign}
                  onClick={() => {
                    console.log("Issue object:", issue);
                    console.log("Setting selectedIssueId with:", issue.issueId); // Debug log
                    setShowModal(true);
                    setSelectedIssueId(issue.logId); // Store integer logId for backend use
                  }}
                >
                  ASSIGN
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>SELECT TECHNICIAN</h3>
            {technicians.map((tech, index) => (
              <div
                key={tech.technicianId}
                className={styles.technicianContainer}
              >
                <input
                  type="checkbox"
                  className={styles.technicianCheckbox}
                  checked={selectedCheckbox === index}
                  onChange={() => setSelectedCheckbox(index)}
                />
                <img src={logo} alt="User Icon" className={styles.userIcon} />
                <div className={styles.technicianInfo}>
                  <p>{tech.name}</p>
                  <p>{tech.role}</p>
                </div>
                <div
                  className={styles.chevronRight}
                  onClick={() => handleChevronClick(index)}
                >
                  &#8250;
                </div>
              </div>
            ))}

            <div className={styles.buttonContainer}>
              <button
                className={styles.btnClose}
                onClick={() => setShowModal(false)}
              >
                CLOSE
              </button>
              <button className={styles.btnAssign} onClick={handleAssignClick}>
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTech && (
        <div
          className={`${styles.modalOverlay} ${styles.techDetailsModalOverlay}`}
        >
          <div className={`${styles.modalContent} ${styles.techDetailsModal}`}>
            <img src={logo} alt="User Icon" className={styles.userIcon} />
            <h3>{selectedTech.name}</h3>

            <div className={styles.technicianDetails}>
              <div className={styles.detailItem}>
                <p>{selectedTech.role}</p>
              </div>
              <div className={styles.detailItem}>
                <p>{selectedTech.cell}</p>
              </div>
              <div className={styles.detailItem}>
                <p>{selectedTech.email}</p>
              </div>
              <div className={styles.detailItem}>
                <p>{selectedTech.time}</p>
              </div>
            </div>

            <button
              className={styles.btnClose1}
              onClick={handleCloseTechDetails}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AssignTech;
