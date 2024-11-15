import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paperclip, MessageCircle } from "lucide-react";
import LiveChat from "./LiveChat";
import styles from "./HOD styles/DetailView.module.css";

function DetailView({ log, onBack, isSidebarOpen }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseLiveChat = () => {
    setIsChatOpen(false);
  };

  const handleOpenPopup = (action) => {
    setActionType(action);
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    if (actionType === "close") {
      console.log("Log closed:", log.id);
      setStatusMessage("This log has been closed.");
    } else if (actionType === "reopen") {
      console.log("Log reopened:", log.id);
      setStatusMessage("This log has been reopened.");
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

  const renderActionButtons = () => {
    if (log.status.toLowerCase() === "done") {
      return (
        <button className={styles["back-button-d"]} onClick={onBack}>
          BACK
        </button>
      );
    }

    return (
      <div className={styles["action-buttons"]}>
        <button className={styles["back-button-d"]} onClick={onBack}>
          BACK
        </button>
      </div>
    );
  };

  return (
    <div
      className={`${styles["dashboard-container"]} ${
        isSidebarOpen ? styles["sidebar-open"] : styles["sidebar-closed"]
      }`}
    >
      <div className={styles["detail-header"]}>
        <h2>{log.title}</h2>
        <div className={styles["header-actions"]}>
          <button
            className={styles["live-chat-button"]}
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle size={20} />
            <span>Live Chat</span>
          </button>
        </div>
      </div>
      <div className={styles["detail-content"]}>
        {isConfirmed ? (
          <div
            className={styles["status-label"]}
            style={{ color: actionType === "close" ? "green" : "red" }}
          >
            <p>{statusMessage}</p>
            <h3>Issue Details:</h3>
            <div className={styles["issue-info"]}>
              <div className={styles["issue-logged-by"]}>
                <div>
                  <p>Issue Logged By:</p>
                  <p className={styles["user-name"]}>{log.assigned}</p>
                </div>
              </div>
              <div className={styles["issue-priority"]}>
                <p>
                  Priority:{" "}
                  <span
                    className={`${styles["priority"]} ${
                      styles[log.priority.toLowerCase()]
                    }`}
                  >
                    {log.priority}
                  </span>
                </p>
              </div>
              <div className={styles["issue-date"]}>
                <p>{log.date}</p>
              </div>
            </div>
            <div className={styles["issue-status"]}>
              <p>
                Status:{" "}
                <span
                  className={`${styles["status"]} ${
                    styles[log.status.toLowerCase()]
                  }`}
                >
                  {log.status}
                </span>
              </p>
            </div>
            <button className={styles["back-button-d"]} onClick={onBack}>
              BACK
            </button>
          </div>
        ) : (
          <>
            <div className={styles["issue-info"]}>
              <div className={styles["issue-logged-by"]}>
                <div>
                  <p>Issue Logged By:</p>
                  <p className={styles["user-name"]}>{log.assigned}</p>
                </div>
              </div>
              <div className={styles["issue-priority"]}>
                <p>
                  Priority:{" "}
                  <span
                    className={`${styles["priority"]} ${
                      styles[log.priority.toLowerCase()]
                    }`}
                  >
                    {log.priority}
                  </span>
                </p>
              </div>
              <div className={styles["issue-date"]}>
                <p>{log.date}</p>
              </div>
            </div>
            <div className={styles["issue-location"]}>
              <p>Department - {log.department}</p>
              <p>Building 18 - 2nd Floor</p>
            </div>
            <div className={styles["issue-status"]}>
              <p>
                Status:{" "}
                <span
                  className={`${styles["status"]} ${
                    styles[log.status.toLowerCase()]
                  }`}
                >
                  {log.status}
                </span>
              </p>
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
              {log.attachments.length > 0 ? (
                log.attachments.map((attachment) => (
                  <div
                    className={styles["attachment"]}
                    key={attachment.filename}
                    onClick={() => handleOpenImageViewer(attachment.imageUrl)}
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
            {renderActionButtons()}
          </>
        )}
      </div>
      {isChatOpen && <LiveChat onClose={handleCloseLiveChat} />}

      {isPopupVisible && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-content"]}>
            <p>
              {actionType === "close"
                ? "Are you sure you want to close this log?"
                : "Are you sure you want to reopen this log?"}
            </p>
            <div className={styles["popup-buttons"]}>
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer Popup */}
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
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    assigned: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DetailView;
