import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./IssueDetails.css";
import descIcon from "./assets/icons/desc.png"; // Adjust the path based on your folder structure
import attachIcon from "./assets/icons/attachme.png";
import profIcon from "./assets/icons/profile.png";
import image from "./assets/icons/image.png";
import chat from "./assets/icons/chat.png";

const IssueDetails = ({ issues }) => {
  const { issueId } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const issue = issues.find((i) => i.issueId === issueId);

  if (!issue) {
    return <div>Issue not found</div>;
  }

  // Handle the Close button click
  const handleClose = () => {
    navigate("/"); // Navigate to the table route
  };

  return (
    <div className="issue-details-container">
      {/* Issue Title */}
      <div className="issue">
        <h2>Internal Issue: {issue.title}</h2>
        <a href="">
          <img src={chat} width="40" height="40" alt="Chat Icon" />
        </a>
      </div>

      {/* Header Section */}
      <div className="issue-header">
        {/* Requestor Info */}
        <div className="issue-requestor">
          <p>Invite Requested By:</p>
          <div className="profile">
            <img src={profIcon} width="50" height="50" alt="Profile Icon" />
            <p className="name">{issue.name}</p>
          </div>
          <p className="issue-id">{issue.issueId}</p>
        </div>

        {/* Issue Priority and Date */}
        <div className="issue-info">
          <div className="prio">
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
          </div>

          <p className="issue-date">{issue.date}</p>
        </div>
      </div>

      {/* Issue Description */}
      <div className="issue-details">
        <h3>
          <img src={descIcon} width="25" height="30" alt="Description Icon" />
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
          <img src={attachIcon} width="15" height="25" alt="Attachment Icon" />
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

      {/* Issue Status */}
      <div className="status">
        <p>
          Status:{" "}
          <span className={`status-text ${issue.status.toLowerCase()}`}>
            {issue.status}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="accept-button">Accept</button>
        <button className="decline-button">Decline</button>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default IssueDetails;
