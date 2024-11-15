import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; // Ensure this is imported
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import "../SidebarCSS/IssueDetails.css"; // Your CSS file
import desc from "../images/desc.png";
import attachme from "../images/attachme.png";
import image from "../images/image.png";
import chat from "../images/chat.png";
import profile from "../images/profileAllIssue.png"; 
import tickIcon from "../images/tickIcon.png";
import CollabArrow from "../images/CollabArrow.png";

const IssueDetails = ({ issues }) => {
  const { issueId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); 
  const [selectedTechnician, setSelectedTechnician] = useState(null); 
  const [note, setNote] = useState("");

  const issue = issues.find((i) => i.issueId === issueId);

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
  // Handle the Close button click
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // Go to the previous page in history
    } else {
      navigate("/tbl"); // Default to a specific route if no previous page
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

const handleAddNoteClick = () => {
    setShowAddNoteModal(true); // Show the add note modal
};

const handleUpdateStatus = (status) => {
    console.log(`Status updated to: ${status}`);
    
    // Show toast notification for specific statuses
    if (status === "In Progress" || status === "Resolved") {
        toast.success("Status successfully updated!");
    }

    setShowUpdateModal(false); // Close the modal after updating
};

const handleNoteSubmit = () => {
    if (!note.trim()) { // Check if the note is empty or just spaces
        toast.error("Please enter a note before submitting."); // Show error message
        return; // Exit the function early if the note is empty
    }

    console.log(`Note added: ${note}`);
    toast.success("Note successfully added!"); // Toast notification for note added
    setNote(""); // Clear the note input
    setShowAddNoteModal(false); // Close the add note modal
};

  return (
    <div className="issue-details-container">
      {/* Issue Title */}
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
  <button className="invite-button" onClick={handleInviteClick}>
    Invite
  </button>
  <div className="right-actions">
   
    <div className="button-container">
      <button className="update-button" onClick={handleUpdateClick}>
        Update
      </button>
      <button className="close-button1" onClick={handleBack}>
        Close
      </button>
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


          {/* Update Log Status Modal */}
{showUpdateModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            <button className="modal-close" onClick={() => setShowUpdateModal(false)}>
                &times;
            </button>
            <h3>Update Log Status</h3>
            <h4 className="select-header">SELECT:</h4> {/* Added a class for styling */}
            <div className="status-buttons">
                <button
                    style={{ backgroundColor: "#0C4643", color: "white" , fontsize: "5px"}}
                    onClick={() => {
                        handleUpdateStatus("On Hold"); // Update status
                        handleAddNoteClick(); // Open the note modal
                    }}
                >
                    On Hold
                </button>
                <button
                    style={{ backgroundColor: "#B08D0F", color: "white", fontsize: "5px" }}
                    onClick={() => {
                        handleUpdateStatus("In Progress"); // Update status
                    }}
                >
                    In Progress
                </button>
                <button
                    style={{ backgroundColor: "#2FB00F", color: "white", fontsize: "5px" }}
                    onClick={() => {
                        handleUpdateStatus("Resolved"); // Update status
                    }}
                >
                    Resolved
                </button>
            </div>
        </div>
    </div>
)}


            {/* Add Note Modal */}
            {showAddNoteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowAddNoteModal(false)}>
                            &times;
                        </button>
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

            {/* Success Message Popup */}
            {showSuccess && (
                <div className="success-message-overlay">
                    <div className="success-message-content">
                        <div className="success-message-wrapper">
                            <img src={tickIcon} alt="Tick Icon" className="tick-icon" />
                            <h3 style={{ margin: 0 }}>INVITATION WAS SUCCESSFULLY SENT</h3>
                        </div>
                        <button className="ok-button" onClick={handleSuccessOk}>
                            OK
                        </button>
                    </div>
                </div>
            )}
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    );
};

export default IssueDetails;
