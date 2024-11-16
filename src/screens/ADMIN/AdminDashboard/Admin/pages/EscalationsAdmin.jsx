import React, { useState, useEffect } from "react";
import "../SidebarCSS/escalations.css";
import checkedIcon from "../adminIcons/images/checkedIcon.png";
import incompleteIcon from "../adminIcons/images/incompleteIcon.png";

const Escalations = ({ logId }) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [countdown, setCountdown] = useState({ response: 0, resolution: 0 });
  const [escalationLevel, setEscalationLevel] = useState(0);
  const [progressStep, setProgressStep] = useState(2);

  console.log("EscalationsAdmin - Received Log ID:", logId);

  useEffect(() => {
    if (!logId) {
      console.error("Log ID is missing.");
      return;
    }

    const fetchEscalationData = async () => {
      try {
        const response = await fetch(`https://localhost:44328/api/Log/GetEscalationResults?logId=${logId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Escalation Data:", data);

        setCountdown({
          response: data.responseDueInSeconds,
          resolution: data.resolutionDueInSeconds,
        });
        const handleEscalationChange = () => {
          
          setEscalationLevel(prevLevel => prevLevel + 1);
        };
        setEscalationLevel(data.escalationLevel);
      } catch (error) {
        console.error("Error fetching escalation data:", error);
      }
    };

    fetchEscalationData();

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => ({
        response: Math.max(prevCountdown.response - 1, 0),
        resolution: Math.max(prevCountdown.resolution - 1, 0),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [logId]);

  const formatTime = (seconds) => {
    if (seconds < 0) {
      return "Deadline Missed";
    }
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}H ${m}M ${s}S`;
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleProgressClick = (step) => {
    setProgressStep(step);
  };

  return (
    <div className="container-fluid bg-light p-3">
      {/* Header Section */}
      <div className="header">
        <div className="issue-info">
          <p>Issue ID: {logId}</p>
          <p>Created On: 20/09/2024 08:57 AM</p>
          <p>Created By: A Ntia</p>
        </div>
      </div>

      {/* Status Section */}
      <div className="status-section">
        <h2 className="status-label">Issue Status:</h2>
        <div className="status-steps">
          <div className="step" onClick={() => handleProgressClick(1)}>
            <img
              src={progressStep >= 1 ? checkedIcon : incompleteIcon}
              alt="Completed"
            />
            <h5>Get Case Details</h5>
          </div>

          {/* Additional Progress Steps Here */}

          {/* SLA Countdown and Escalation Level */}
          <div>
            <h4>Escalation Level: {escalationLevel}</h4>
            <div>Response Due In: {formatTime(countdown.response)}</div>
            <div>Resolution Due In: {formatTime(countdown.resolution)}</div>
          </div>
          {/* Progress Bar Between Steps */}
          <div className="progress-bar-between">
            <div
              className="progress"
              style={{ width: `${progressStep >= 2 ? 100 : 0}%` }}
            ></div>
          </div>

          <div className="step" onClick={() => handleProgressClick(2)}>
            <img
              src={progressStep >= 2 ? checkedIcon : incompleteIcon}
              alt="Completed"
            />
            <h5>Check Issue</h5>
          </div>

          {/* Progress Bar Between Steps */}
          <div className="progress-bar-between">
            <div
              className="progress"
              style={{ width: `${progressStep >= 3 ? 100 : 0}%` }}
            ></div>
          </div>

          <div className="step" onClick={() => handleProgressClick(3)}>
            <img
              src={progressStep >= 3 ? checkedIcon : incompleteIcon}
              alt="Completed"
            />
            <h5>Fix the Issue</h5>
          </div>

          {/* Progress Bar Between Steps */}
          <div className="progress-bar-between">
            <div
              className="progress"
              style={{ width: `${progressStep >= 4 ? 100 : 0}%` }}
            ></div>
          </div>

          <div className="step" onClick={() => handleProgressClick(4)}>
            <img
              src={progressStep >= 4 ? checkedIcon : incompleteIcon}
              alt="Completed"
            />
            <h5>Complete the Issue</h5>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => handleTabClick("summary")}
        >
          Summary
        </button>
        <button
          className={`tab ${activeTab === "details" ? "active" : ""}`}
          onClick={() => handleTabClick("details")}
        >
          Details
        </button>
        <button
          className={`tab ${activeTab === "related" ? "active" : ""}`}
          onClick={() => handleTabClick("related")}
        >
          Related
        </button>
      </div>

      {/* Case Details Section */}
      {activeTab === "summary" && (
        <div className="case-details">
          <div className="card">
            <h4>Additional Case Details</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td>Main Issue</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Raised</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Escalated At</td>
                  <td>---</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* First Response In Section */}
          <div className="card">
            <h4>First Response In:</h4>
            <div className="response-time">
              <img src={checkedIcon} alt="Completed" />
              <h2>{formatTime(countdown.response)}</h2>
            </div>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div className="case-details">
          <div className="card">
            <h4>Additional Case Details</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td>Main Issue</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Raised</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Escalated At</td>
                  <td>---</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Escalations Section */}
          <div className="card">
            <h4>Escalations</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td>First Reply Given</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td>Follow-Up Action</td>
                  <td>----</td>
                </tr>
                <tr>
                  <td>First Reply Due</td>
                  <td>----</td>
                </tr>
                <tr>
                  <td>Resolved By</td>
                  <td>----</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* First Response In Section */}
          <div className="card">
            <h4>First Response In:</h4>
            <div className="response-time">
              <h2>{formatTime(countdown.response)}</h2>
            </div>
          </div>
        </div>
      )}

      {activeTab === "related" && (
        <div className="case-details">
          <div className="card empty-card">
            <h4>Associated Similar Cases</h4>
            <p>No data available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Escalations;
