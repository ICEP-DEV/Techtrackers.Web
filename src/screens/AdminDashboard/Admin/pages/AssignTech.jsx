import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "../SidebarCSS/AssignTechnician.module.css"; // Import the CSS Module
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications
import logo from "../adminIcons/addCircle.png";

const AssignTech = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null); // Store the index of the selected checkbox

  const issues = [
    {
      Log_By: "John Doe",
      description: "Internal Issue",
      dueDate: "19/08/2024",
      department: "IT Support",
      priority: "Medium",
    },
    {
      Log_By: "Themba Zwane",
      description: "Network Issue",
      dueDate: "19/08/2024",
      department: "HR",
      priority: "High",
    },
    {
      Log_By: "Andile Zondo",
      description: "Printer not working",
      dueDate: "15/08/2024",
      department: "IT Support",
      priority: "Low",
    },
  ];

  const technicians = [
    {
      name: "Lunga Ntshingila",
      role: "Computer Repair Technician",
      cell: "0731234555",
      email: "lunga@gmail.com",
      time: "09H00AM - 16H00PM",
    },
    {
      name: "Colin Radebe",
      role: "System Analyst",
      cell: "0712345678",
      email: "colin@gmail.com",
      time: "08H00AM - 17H00PM",
    },
    {
      name: "Faith Mnisi",
      role: "Web Support Technician",
      cell: "0791234567",
      email: "faith@gmail.com",
      time: "09H00AM - 16H00PM",
    },
    {
      name: "Natasha Smith",
      role: "Telecommunications Technician",
      cell: "0781234567",
      email: "natasha@gmail.com",
      time: "08H00AM - 17H00PM",
    },
  ];

  const handleAssignClick = () => {
    if (selectedCheckbox !== null) {
      const assignedTech = technicians[selectedCheckbox];
      toast.success(`You have assigned ${assignedTech.name} to a task!`);
    } else {
      toast.error("Please select a technician to assign.");
    }
  };

  const handleChevronClick = (index) => {
    if (selectedTech === technicians[index]) {
      setSelectedTech(null); // Close if the same technician is clicked
    } else {
      setSelectedTech(technicians[index]); // Show details of the selected technician
    }
    setSelectedCheckbox(index); // Update selected checkbox index
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <tr key={index}>
              <td>{issue.Log_By}</td>
              <td>{issue.description}</td>
              <td>{issue.dueDate}</td>
              <td>{issue.department}</td>
              <td>{issue.priority}</td>
              <td>
                <button
                  className={styles.btnAssign}
                  onClick={() => setShowModal(true)}
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
              <div key={index} className={styles.technicianContainer}>
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
                className={styles.btnClose1}
                onClick={() => setShowModal(false)}
              >
                CLOSE
              </button>
              <button className={styles.btnAssign1} onClick={handleAssignClick}>
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
                <img src={logo} alt="Tool Logo" className={styles.detailLogo} />
                <p>{selectedTech.role}</p>
              </div>
              <div className={styles.detailItem}>
                <img
                  src={logo}
                  alt="Phone Logo"
                  className={styles.detailLogo}
                />
                <p>{selectedTech.cell}</p>
              </div>
              <div className={styles.detailItem}>
                <img src={logo} alt="Mail Logo" className={styles.detailLogo} />
                <p>{selectedTech.email}</p>
              </div>
              <div className={styles.detailItem}>
                <img
                  src={logo}
                  alt="Clock Logo"
                  className={styles.detailLogo}
                />
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
