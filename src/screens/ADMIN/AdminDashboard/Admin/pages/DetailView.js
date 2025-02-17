import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paperclip, MoreVertical, MessageCircle } from "lucide-react";
import EscalationPage from "./EscalationsAdmin"; // Import the EscalationPage component
import styles from "../SidebarCSS/DetailView.module.css";
import userAvatar from "../adminIcons/images/user.jpg";

function DetailView({ log, onBack }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEscalationVisible, setIsEscalationVisible] = useState(false); // State to control EscalationPage visibility

  const handleOpenPopup = (action) => {
    setActionType(action);
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    if (actionType === "close") {
      console.log("Log closed:", log.logId);
      setStatusMessage("This issue has been closed.");
    } else if (actionType === "reopen") {
      console.log("Log reopened:", log.logId);
      setStatusMessage("This issue has been reopened.");
      log.status = "INPROGRESS"; 
    }
    setIsPopupVisible(false);
    setActionType(null);
    setIsConfirmed(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
    setActionType(null);
  };

  const handleOpenImageViewer = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
    setSelectedImage(null);
  };

  const toggleEscalation = () => {
    setIsEscalationVisible((prevState) => !prevState); // Toggle the visibility of EscalationPage
  };
  console.log("DetailView - Log ID passed to EscalationPage:", log.logId);

  const renderActionButtons = () => {
    if (log.status && log.status.toLowerCase() != "resolved") {
      return (
        <div className="action-buttons">
        <button className={styles["back-button-d"]} onClick={onBack}>
          BACK
        </button>
        </div>
      );
    }
    else 
    return (
      <div className={styles["action-buttons"]}>
       
        <button className={styles["back-button-d"]} onClick={onBack}>
          BACK
        </button>
         <button
          className={styles["reopen-button"]}
          onClick={() => handleOpenPopup("reopen")}
        >
          RE-OPEN
        </button>
      </div>
    );
  };

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["detail-header"]}>
        <h2>{log.issueId}</h2>
        <div className={styles["header-actions"]}>
          <button className={styles["more-button"]} onClick={toggleEscalation}>
            <MoreVertical size={20} /> More
          </button>
        </div>
      </div>
      <div className={styles["detail-content"]}>
        {isEscalationVisible ? (
          <EscalationPage logId={log.logId} /> // Render EscalationPage when isEscalationVisible is true
        ) : (
          <>
            {isConfirmed ? (
              <div
                className={styles["status-label"]}
                style={{ color: actionType === "close" ? "green" : "red" }}
              >
                <p>{statusMessage}</p>
                <div className={styles["issue-info"]}>
                  <div className={styles["issue-logged-by"]}>
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      className={styles["avatar"]}
                    />
                    <div>
                      <p>Issue Logged By: {log.logBy}</p>
                    </div>
                  </div>
                  <div className={styles["issue-priority"]}>
                    <p>
                      Priority:{" "}
                      <span
                        className={`${styles["priority"]} ${
                          styles[log.priority ? log.priority.toLowerCase() : ""]
                        }`}
                      >
                        {log.priority}
                      </span>
                    </p>
                  </div>
                  <div className={styles["issue-date"]}>
                    <p>{new Intl.DateTimeFormat("en-US", { 
                      dateStyle: "long", 
                      timeStyle: "short" 
                    }).format(new Date(log.issuedAt))}</p>
                  </div>
                </div>
                
                <div className={styles["issue-location"]}>
                  <p>Department - {log.department}</p>
                  <p>Location - {log.location} </p>
                </div>

                <div className={styles["issue-status"]}>
                  <p>
                    Status:{" "}
                    <span
                      className={`${styles["status"]} ${
                        styles[log.status ? log.status.toLowerCase() : ""]
                      }`}
                    >
                      {log.status}
                    </span>
                  </p>
                </div>
                <div className= {styles["description"]}>
                    <h3>Description</h3>
                    <p>{log.description}</p>
                </div>
                <button className={styles["back-button-d"]} onClick={onBack}>
                  BACK
                </button>
              </div>
            ) : (
              <>
                <div className={styles["issue-info"]}>
                  <div className={styles["issue-logged-by"]}>
                    <img
                      src={userAvatar}
                      alt="User Avatar"
                      className={styles["avatar"]}
                    />
                    <div className={styles["logged-by"]}>
                      <p>Issue Logged By: {log.logBy}</p>
                    </div>
                  </div>
                  <div className={styles["issue-priority"]}>
                    <p>
                      Priority:{" "}
                      <span
                        className={`${styles["priority"]} ${
                          styles[log.priority ? log.priority.toLowerCase() : ""]
                        }`}
                      >
                        {log.priority}
                      </span>
                    </p>
                  </div>
                  <div className={styles["issue-date"]}>
                    <p>
                      {log?.issuedAt && !isNaN(new Date(log.issuedAt).getTime())
                        ? new Intl.DateTimeFormat("en-US", {
                            dateStyle: "long",
                            timeStyle: "short",
                          }).format(new Date(log.issuedAt))
                        : "Invalid Date"}
                    </p>
                  </div>


                </div>
                <div className={styles["issue-location"]}>
                  <p>Department - {log.department}</p>
                  <p>Location - {log.location} </p>
                </div>
                
                <div className={styles["issue-description"]}>
                  <h3>Description</h3>
                  <p>{log.description}</p>
                </div>
                <div className={styles["issue-attachments"]}>
                  <h3>
                    <Paperclip className={styles["icon"]} />
                     Attachments
                  </h3>
                  {log.attachments && log.attachments.length > 0 ? (
                    log.attachments.map((attachment) => (
                      <div
                        className={styles["attachment"]}
                        key={attachment.filename}
                        onClick={() =>
                          handleOpenImageViewer(attachment.imageUrl)
                        }
                      >
                        <img
                          src={attachment.imageUrl}
                          alt={attachment.filename}
                        />
                        <span>{attachment.filename}</span>
                        <span className={styles["file-size"]}>12 KB</span>
                      </div>
                    ))
                  ) : (
                    <p>No attachments available.</p>
                  )}
                </div>
                <div className={styles["issue-status"]}>
                  <p>
                    Status:{" "}
                    <span
                      className={`${styles["status"]} ${
                        styles[log.status ? log.status.toLowerCase() : ""]
                      }`}
                    >
                      {log.status}
                    </span>
                  </p>
                </div>
                {renderActionButtons()}
              </>
            )}
          </>
        )}
      </div>

      {isPopupVisible && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-content"]}>
            <p>
              {actionType === "close"
                ? "Are you sure you want to close this issue?"
                : "Are you sure you want to reopen this issue?"}
            </p>
            <div className={styles["popup-buttons"]}>
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}

      {isImageViewerOpen && (
        <div
          className={styles["image-viewer-overlay"]}
          onClick={handleCloseImageViewer}
        >
          <div
            className={styles["image-viewer-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Attachment"
              className={styles["viewed-image"]}
            />
            <button
              className={styles["close-image-button"]}
              onClick={handleCloseImageViewer}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

DetailView.propTypes = {
  log: PropTypes.shape({
    logId: PropTypes.number.isRequired, // Updated to match `log.logId`
    issueId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    department: PropTypes.string,
    assigned: PropTypes.string,
    date: PropTypes.string,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DetailView;
