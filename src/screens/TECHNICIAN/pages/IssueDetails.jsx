import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../SidebarCSS/IssueDetails.module.css";
import desc from "../images/desc.png";
import attachme from "../images/attachme.png";
import image from "../images/image.png";
import chat from "../images/chat.png";
import profile from "../images/profileAllIssue.png";
import tickIcon from "../images/tickIcon.png";
import CollabArrow from "../images/CollabArrow.png";

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



  const handleUpdateStatus = async (status) => {
    if (issue.status === "RESOLVED") {
        toast.error("Cannot update status. The issue is already resolved.");
        return;
    }

    try {
        if (!issueId || issueId.trim() === "") {
            toast.error("Invalid issue ID. Cannot update status.");
            return;
        }

        console.log("Issue Id to be updated: ", issueId);       
       

        console.log("Updating status to:", status);
        const response = await fetch(
            `https://localhost:44328/api/ManageLogs/ChangeLogStatus/${issueId}/${status}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        

        const data = await response.json();

        console.log("Response: ", data);
        

        if (response.ok) {
            // Update local issue status only if the backend update was successful
            issue.status = status;
            toast.success(`Status updated to ${status}!`);
        } else {
            // Handle different error responses
            console.error("API Error:", data);
            toast.error(data.message || "Failed to update status.");
        }
    } catch (error) {
        console.error("Request Error:", error);
        toast.error("An error occurred while updating the status.");
    }
};



  const handleAddNoteClick = () => {
    setShowAddNoteModal(true);
  };

  const handleNoteSubmit = () => {
    if (issue.status === "RESOLVED") {
      toast.error("Cannot update status. The issue is already RESOLVED.");
      return;
    }

    if (!note.trim()) {
      toast.error("Please enter a note before submitting.");
      return;
    }

    // Update the issue status immutably
    const updatedIssues = issues.map((item, index) =>
      index === issueIndex ? { ...item, status: "ONHOLD" } : item
    );

    setNote("");
    setShowAddNoteModal(false);
    setShowUpdateModal(false);
    toast.success("Note successfully added and status updated to 'ONHOLD'!");
  };


  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/techniciandashboard/tbl");
    }
  };

  const handleCollabArrowClick = () => {
    if (selectedTechnician) {
      setShowModal(false);
      setShowSuccess(true);
      toast.success(`Invitation sent to ${selectedTechnician}`);
    } else {
      toast.error("Please select a technician to invite.");
    }
  };

  const handleChat = () => {
    navigate("/techniciandashboard/staffChat");
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
    setShowUpdateModal(true);
  };

  return (
    <div className={styles.issueDetailsContainer}>
      <div className={styles.issue}>
        <h2>Issue title: {issue.issueTitle}</h2>
        <a href="#">
          <img src={chat} width="40" height="40" alt="Chat Icon" onClick={handleChat} />
        </a>
      </div>
      {/* Header Section */}
      <div className={styles.issueHeader}>
        {/* Requestor Info */}
        <div className={styles.issueRequestor}>
          <p>Logged By:</p>
          <div className={styles.profile}>
            <img src={profile} width="50" height="50" alt="Profile Icon" />
            <p className={styles.name}>{issue.name}</p>
          </div>
          <p className={styles.issueId}>{issue.issueId}</p>
        </div>

        {/* Issue Priority and Date */}
        <div className={styles.issueInfo}>
          <div className={styles.prio1}>
            <p>
              Priority:{" "}
              <span
                className={`${styles['priorityText']} ${issue.priority === "High"
                  ? styles['priorityHigh']
                  : issue.priority === "Medium"
                    ? styles['priorityMedium']
                    : styles['priorityLow']
                  }`}
              >
                {issue.priority.toUpperCase()}
              </span>
            </p>
            <div className={styles.dateIssue}>
              <p className={styles.issueDate}>Date Created: {issue.issuedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Issue Description */}
      <div className={styles.issueDetails}>
        <h3><img src={desc} width="25" height="30" alt="Description Icon" /> Description</h3>
        <p className={styles.descriptionText}>
          {issue.description}
        </p>
      </div>

      {/* Attachments Section */}
      <div className={styles.attachments}>
        <h3>
          <img src={attachme} width="15" height="25" alt="Attachment Icon" />
          <h4>Attachments</h4>
          <p>{issue.attachment}</p>
        </h3>
        <div className={styles.attachment}>
          <img src={issue.attachment} width="30" height="25" alt="Image Attachment" />{" "}
        </div>
      </div>

      {/* Additional Information */}
      <div className={styles.additionalInfo}>
        <p>Department - {issue.department}</p>
        <p>Location - {issue.location}</p>
      </div>

      <div className={styles.statuses}>
        <h3>Status:</h3>
        <p>
          <span
            className={`${styles.statusText} ${styles[issue.status.toLowerCase()] || ''
              }`}
          >
            {issue.status}
          </span>
        </p>
      </div>

      <div className={styles.actions1}>
        <button className={styles.inviteButton} onClick={() => setShowModal(true)}>Invite</button>
        <div className={styles.rightActions}>
          <div className={styles.buttonContainer}>
            <button className={styles.updateButton} onClick={() => setShowUpdateModal(true)}>Update</button>
            <button className={styles.closeButton1} onClick={handleBack}>Close</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>
              &times;
            </button>
            <div className={styles.collabHeader}>
              <h5 style={{ margin: 0 }}>Collaborate with:</h5>
              <input
                type="text"
                placeholder="Search for a technician..."
                className={styles.searchBar}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.technicianList}>
              {filteredTechnicians.map((tech, index) => (
                <div
                  key={index}
                  className={`${styles.technicianContainer} ${selectedTechnician === tech.name ? "selected" : ""
                    }`}
                >
                  <div className={styles.technicianInfo}>
                    <input
                      type="checkbox"
                      className={styles.technicianCheckbox}
                      checked={selectedTechnician === tech.name}
                      onChange={() => handleCheckboxChange(tech)}
                    />
                    <img src={profile} alt="User Icon" className="userIcon" />
                    <div className={styles.technicianCetails}>
                      <p>{tech.name}</p>
                      <p>{tech.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.tickIconContainer} onClick={handleCollabArrowClick} style={{ cursor: "pointer", marginTop: "15px" }}>
              <img src={CollabArrow} alt="Collab Arrow Icon" className={styles.tickIcon} />
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setShowUpdateModal(false)}>&times;</button>
            <h4>Update Issue Status</h4>
            <div className={styles.statusButtons}>
              <button
                style={{ backgroundColor: "#0C4643" }}
                onClick={() => handleAddNoteClick()}
              >
                ON HOLD
              </button>
              <button
                style={{ backgroundColor: "#B08D0F" }}
                onClick={() => handleUpdateStatus("INPROGRESS")}
              >
                IN PROGRESS
              </button>
              <button
                style={{ backgroundColor: "#2FB00F", color: "white" }}
                onClick={() => handleUpdateStatus("RESOLVED")}
              >
                RESOLVED
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddNoteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalClose} onClick={() => setShowAddNoteModal(false)}>&times;</button>
            <h3>Add Note:</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Type a message..."
              rows="4"
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setShowAddNoteModal(false)}>Cancel</button>
              <button className={styles.updateButton} onClick={handleNoteSubmit}>Update</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default IssueDetails;
