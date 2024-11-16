import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/Table.module.css";
import TechnicianDetailView from "./TechnicianDetailView";

// Sample technician data for testing
const sampleTechnicians = [
  {
    technicianId: "T001",
    name: "John Doe",
    email: "john.doe@example.com",
    specialization: "Electrical",
    contact: "123-456-7890",
    fromTime: "08:00 AM",
    toTime: "04:00 PM",
    activeIssues: 2,
  },
  {
    technicianId: "T002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    specialization: "HVAC",
    contact: "987-654-3210",
    fromTime: "09:00 AM",
    toTime: "05:00 PM",
    activeIssues: 1,
  },
  {
    technicianId: "T003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    specialization: "Plumbing",
    contact: "456-789-1234",
    fromTime: "10:00 AM",
    toTime: "06:00 PM",
    activeIssues: 3,
  },
];

const ManageTechniciansHeader = () => {
  const navigate = useNavigate();

  const handleAddTechnicianClick = () => {
    navigate("/admindashboard/add-tech"); // Navigate to Add Technician page
  };

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <i className="fa-regular fa-users" aria-hidden="true"></i>
          <div className={styles.headerText}>
            <h2>Manage Technicians</h2>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.addTechnicianButton}
            onClick={handleAddTechnicianClick}
          >
            ADD TECHNICIAN
          </button>
        </div>
      </header>
    </div>
  );
};

const ManageTechniciansTable = () => {
  const navigate = useNavigate(); // Add useNavigate hook for navigation
  const [technicians, setTechnicians] = useState(sampleTechnicians); // Manage technician state
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  const handleViewClick = (technician) => {
    setSelectedTechnician(technician);
  };

  const handleRemoveTechnician = (technicianId) => {
    setTechnicians((prevTechs) =>
      prevTechs.filter((tech) => tech.technicianId !== technicianId)
    );
    console.log(`Technician with ID: ${technicianId} has been removed.`);
  };

  const handleBackToList = () => {
    navigate("/admindashboard/dashboard"); // Navigate back to the dashboard
  };

  if (selectedTechnician) {
    return (
      <TechnicianDetailView
        technician={selectedTechnician}
        onBack={() => setSelectedTechnician(null)}
        onRemove={handleRemoveTechnician} // Pass the remove function
      />
    );
  }

  return (
    <div className={styles.tableContainer}>
      <ManageTechniciansHeader />
      <table className={styles.issueTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Contact</th>
            <th>Availability</th>
            <th>Active Issues</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.technicianId}>
              <td>{technician.name}</td>
              <td>{technician.email}</td>
              <td>{technician.specialization}</td>
              <td>{technician.contact}</td>
              <td>{`${technician.fromTime} - ${technician.toTime}`}</td>
              <td>{technician.activeIssues}</td>
              <td>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(technician)}
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBackToList} className={styles.backButton}>
        Back
      </button>
    </div>
  );
};

export default ManageTechniciansTable;
