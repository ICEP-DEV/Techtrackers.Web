import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Ensure this is imported
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import "./IssueDetails.css"; // Your CSS file
import desc from "./assets/icons/desc.png";
import attachme from "./assets/icons/attachme.png";
import image from "./assets/icons/image.png";
import chat from "./assets/icons/chat.png";
import profile from "./assets/icons/profile.png"; 
import tickIcon from "./assets/icons/tickIcon.png"; 
import CollabArrow from "./assets/icons/CollabArrow.png";

const IssueDetails = ({ issues }) => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); 
  const [selectedTechnician, setSelectedTechnician] = useState(null); 
  const [note, setNote] = useState("");

  // Find the issue based on the ID
  const issueIndex = issues.findIndex((i) => i.issueId === issueId);
  const issue = issues[issueIndex];

  if (!issue) {
    return <div>Issue not found</div>;
  }

  const technicians = [
    { name: "MIKE MDLULI", role: "Cloud Technician" },
    { name: "COLIN RADEBE", role: "System Analyst" },
    { name: "FAITH MNISI", role: "Web Support Technician" },
    { name: "NATASHA SMITH", role: "Telecommunications Technician" },
];

  const handleInviteClick = () => {
    setShowModal(true);
  };

  const handleUpdateStatus = (status) => {
    issues[issueIndex].status = status; // Update the status in the array
    console.log(`Status updated to: ${status}`);

    // Show toast notification
    if (status === "InProgress" || status === "Resolved") {
      toast.success(`Status updated to ${status}!`);
    }

    setShowUpdateModal(false); // Close the modal
  };

  const handleAddNoteClick = () => {
    setShowAddNoteModal(true); // Show the add note modal
  };

  const handleNoteSubmit = () => {
    if (!note.trim()) { 
      toast.error("Please enter a note before submitting.");
      return;
    }

    issues[issueIndex].status = "On Hold"; // Update the status to "On Hold"
    console.log(`Note added: ${note}`);
    toast.success("Note successfully added and status updated to On Hold!");
    setNote("");
    setShowAddNoteModal(false);
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1); 
    } else {
      navigate("/tbl"); 
    }
  };

  const handleCollabArrowClick = () => {
    if (selectedTechnician) {
        setShowModal(false);
        setShowSuccess(true); 
        toast.success(`Invitation sent to ${selectedTechnician}`); // Toast notification for successful invite
    } else {
        toast.error("Please select a technician to invite."); // Updated to use toast
    }
}

  const handleChat = () => {
    navigate("/liveChat");
  };

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

const handleSuccessOk = () => {
  setShowSuccess(false); 
};

const filteredTechnicians = technicians.filter((tech) =>
  tech.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleCheckboxChange = (tech) => {
  setSelectedTechnician(tech.name === selectedTechnician ? null : tech.name);
};

const handleUpdateClick = () => {
  setShowUpdateModal(true); // Show the update log status modal
};


  return (
    <div className="issue-details-container">
      <div className="issue">
      <h2>Issue title: {issue.title}</h2>
        <a href="#">
          <img src={chat} width="40" height="40" alt="Chat Icon" onClick={handleChat}/>
        </a>
      </div>
      
      {/* Header Section */}
      <div className="issue-header">
            {/* Requestor Info */}
            <div className="issue-requestor">
            <p>Invite Requested By:</p>
            <div className="profile">
                <img src={profile} width="50" height="50" alt="Profile Icon" />
                <p className="name">{issue.name}</p>
            </div>
            <p className="issue-id">{issue.issueId}</p>
            </div>

        {/* Issue Priority and Date */}
        <div className="issue-info">
          <div className="prio1">
            <p>
              Priority:{" "}
              <span
                className={`priority-text ${
                  issue.priority === "High"
                    ? "priority-high"
                    : issue.priority === "Medium"
                    ? "priority-medium"
                    : "priority-low"
                }`}
              >
                {issue.priority.toUpperCase()}
              </span>
            </p>
            <div className="date-issue">
            <p className="issue-date">{issue.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Issue Description */}
      <div className="issue-details">
        <h3>
          <img src={desc} width="25" height="30" alt="Description Icon" />
          <h4>Description</h4>
        </h3>
        <p className="description-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* Attachments Section */}
      <div className="attachments">
        <h3>
          <img src={attachme} width="15" height="25" alt="Attachment Icon" />
          <h4>Attachments</h4>
        </h3>
        <div className="attachment">
          <img src={image} width="30" height="25" alt="Image Attachment" />{" "}
          <p>image.jpeg 12 KB</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="additional-info">
        <p>Department - {issue.department}</p>
        <p>Building 18 - 2nd Floor</p>
      </div>

      <div className="statuses">
        <h3>Status:</h3>
        <p>
          <span className={`status-text ${issue.status.toLowerCase()}`}>
            {issue.status}
          </span>
        </p>
      </div>

      <div className="actions1">
        <button className="invite-button" onClick={() => setShowModal(true)}>Invite</button>
        <div className="right-actions">
          <div className="button-container">
            <button className="update-button" onClick={() => setShowUpdateModal(true)}>Update</button>
            <button className="close-button1" onClick={handleBack}>Close</button>
          </div>
        </div>
      </div>

      {showModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
            </button>
            <div className="collab-header">
                <h5 style={{ margin: 0 }}>Collaborate with:</h5>
                <input
                    type="text"
                    placeholder="Search for a technician..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="technician-list">
                {filteredTechnicians.map((tech, index) => (
                    <div
                        key={index}
                        className={`technician-container ${
                            selectedTechnician === tech.name ? "selected" : ""
                        }`}
                    >
                        <div className="technician-info">
                            <input
                                type="checkbox"
                                className="technician-checkbox"
                                checked={selectedTechnician === tech.name}
                                onChange={() => handleCheckboxChange(tech)}
                            />
                            <img src={profile} alt="User Icon" className="user-icon" />
                            <div className="technician-details">
                                <p>{tech.name}</p>
                                <p>{tech.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="tick-icon-container" onClick={handleCollabArrowClick} style={{ cursor: "pointer", marginTop: "15px" }}>
                <img src={CollabArrow} alt="Collab Arrow Icon" className="tick-icon" />
            </div>
        </div>
    </div>
)}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowUpdateModal(false)}>&times;</button>
            <h3>Update Log Status</h3>
            <div className="status-buttons">
              <button
                style={{ backgroundColor: "#0C4643", color: "white" }}
                onClick={() => {
                  handleAddNoteClick();
                }}
              >
                On Hold
              </button>
              <button
                style={{ backgroundColor: "#B08D0F", color: "white" }}
                onClick={() => handleUpdateStatus("InProgress")}
              >
                In Progress
              </button>
              <button
                style={{ backgroundColor: "#2FB00F", color: "white" }}
                onClick={() => handleUpdateStatus("Resolved")}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddNoteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowAddNoteModal(false)}>&times;</button>
            <h3>Add Note:</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="I am putting this issue on hold because..."
              rows="4"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <div className="modal-actions">
              <button className="cancel-button" onClick={() => setShowAddNoteModal(false)}>Cancel</button>
              <button className="update-button" onClick={handleNoteSubmit}>Update</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default IssueDetails;
