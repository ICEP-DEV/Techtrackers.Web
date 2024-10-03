import React, { useState } from 'react';
import '../AssignTechnician.css'; // Ensure the CSS file is properly linked
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications
import logo from '../images/admin.png'; // Path to the logo or placeholder
import UserIcon from '../images/user-icon.png';
// Import icons for technician details (update paths as necessary)
import clockLogo from '../images/clock.png';
import mailLogo from '../images/mail.png';
import phoneLogo from '../images/phone.png';
import toolLogo from '../images/tool.png';

const AssignTech = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

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
    { name: "Lunga Ntshingila", role: "Computer Repair Technician", cell: "0731234555", email: "lunga@gmail.com", time: "09H00AM - 16H00PM" },
    { name: "Colin Radebe", role: "System Analyst", cell: "0712345678", email: "colin@gmail.com", time: "08H00AM - 17H00PM" },
    { name: "Faith Mnisi", role: "Web Support Technician", cell: "0791234567", email: "faith@gmail.com", time: "09H00AM - 16H00PM" },
    { name: "Natasha Smith", role: "Telecommunications Technician", cell: "0781234567", email: "natasha@gmail.com", time: "08H00AM - 17H00PM" },
  ];

  const handleAssignClick = () => {
    const selectedCheckbox = document.querySelector('input[type="checkbox"]:checked');
    if (selectedCheckbox) {
      const technicianIndex = Array.from(document.querySelectorAll('.technician-checkbox')).indexOf(selectedCheckbox);
      const assignedTech = technicians[technicianIndex];

      toast.success(`You have assigned ${assignedTech.name} to a task!`);
    } else {
      toast.error("Please select a technician to assign.");
    }
  };

  const handleChevronClick = (tech) => {
    setSelectedTech(tech);
  };

  const handleCloseTechDetails = () => {
    setSelectedTech(null); // Close the technician details modal by setting the selectedTech to null
  };

  return (
    <div className="container">
      <h2 className="heading">
        <img src={logo} alt="Logo" className="logo" />
        ASSIGN TECHNICIAN
      </h2>
      <table className="table table-striped">
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
                <button className="btn-assign" onClick={() => setShowModal(true)}>
                  ASSIGN
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>SELECT TECHNICIAN</h3>
            {technicians.map((tech, index) => (
              <div key={index} className="technician-container">
                <input type="checkbox" className="technician-checkbox" />
                <img src={UserIcon} alt="User Icon" className="user-icon" />
                <div className="technician-info">
                  <p>{tech.name}</p>
                  <p>{tech.role}</p>
                </div>
                <div className="chevron-right" onClick={() => handleChevronClick(tech)}>
                  &#8250;
                </div>
              </div>
            ))}

            <div className="button-container">
              <button className="btn-close1" onClick={() => setShowModal(false)}>CLOSE</button>
              <button className="btn-assign1" onClick={handleAssignClick}>
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTech && (
        <div className="modal-overlay tech-details-modal-overlay">
          <div className="modal-content tech-details-modal">
            <img src={UserIcon} alt="User Icon" className="user-icon" />
            <h3>{selectedTech.name}</h3>

            <div className="technician-details">
              <div className="detail-item">
                <img src={toolLogo} alt="Tool Logo" className="detail-logo" />
                <p>{selectedTech.role}</p>
              </div>
              <div className="detail-item">
                <img src={phoneLogo} alt="Phone Logo" className="detail-logo" />
                <p>{selectedTech.cell}</p>
              </div>
              <div className="detail-item">
                <img src={mailLogo} alt="Mail Logo" className="detail-logo" />
                <p>{selectedTech.email}</p>
              </div>
              <div className="detail-item">
                <img src={clockLogo} alt="Clock Logo" className="detail-logo" />
                <p>{selectedTech.time}</p>
              </div>
            </div>

            <button className="btn-close1" onClick={handleCloseTechDetails}>CLOSE</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AssignTech;
