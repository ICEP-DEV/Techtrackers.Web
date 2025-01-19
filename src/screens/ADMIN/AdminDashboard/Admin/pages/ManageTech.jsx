import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/Table.module.css";
import TechnicianDetailView from "./TechnicianDetailView";
import axios from "axios";  // If you’re using axios for API calls

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
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);  // Start with an empty array
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get("https://localhost:44328/api/Users/GetTechniciansByRole/GetTechniciansByRole/3");  // Use your API endpoint
        //const response = await axios.get("https://localhost:44328/api/Technician/GetAll");
        const technicianData = response.data.map((technician) => ({
          ...technician,
          name: `${technician.surname} ${technician.initials}`,  // Combine surname and initials
        }));
        setTechnicians(technicianData);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchTechnicians();
  }, []);

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
    navigate("/admindashboard/dashboard");
  };

  if (selectedTechnician) {
    return (
      <TechnicianDetailView
        technician={selectedTechnician}
        onBack={() => setSelectedTechnician(null)}
        onRemove={handleRemoveTechnician}
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
              <td>{technician.name}</td>  {/* Using the combined name here */}
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
