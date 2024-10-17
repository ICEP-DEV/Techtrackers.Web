import React, { useState, useEffect } from 'react';
import '../ADMIN/styles/escalations.css';
import checkedIcon from '../ADMIN/images/checkedIcon.png';
import incompleteIcon from '../ADMIN/images/incompleteIcon.png'; // Add an icon for incomplete steps

const Escalations = () => {
    const [activeTab, setActiveTab] = useState('summary');
    const [countdown, setCountdown] = useState(1 * 3600); // Countdown starts from 1 hour in seconds
    const [progressStep, setProgressStep] = useState(2); // Tracks the current progress step (default to step 2)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
        }, 1000);

        return () => clearInterval(timer); // Cleanup the timer on component unmount
    }, []);

    const formatTime = (seconds) => {
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
                <h1>Network Issue</h1>
                <div className="issue-info">
                    <p>Issue ID: IT-P1-1220</p>
                    <p>Created On: 20/09/2024 08:57 AM</p>
                    <p>Created By: A Ntia</p>
                </div>
            </div>

            {/* Status Section */}
            <div className="status-section">
                <h2 className="status-label">Issue Status:</h2>
                <div className="status-steps">
                    <div className="step" onClick={() => handleProgressClick(1)}>
                        <img src={progressStep >= 1 ? checkedIcon : incompleteIcon} alt="Completed" />
                        <h5>Get Case Details</h5>
                    </div>

                    {/* Progress Bar Between Steps */}
                    <div className="progress-bar-between">
                        <div
                            className="progress"
                            style={{ width: `${progressStep >= 2 ? 100 : 0}%` }}
                        ></div>
                    </div>

                    <div className="step" onClick={() => handleProgressClick(2)}>
                        <img src={progressStep >= 2 ? checkedIcon : incompleteIcon} alt="Completed" />
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
                        <img src={progressStep >= 3 ? checkedIcon : incompleteIcon} alt="Completed" />
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
                        <img src={progressStep >= 4 ? checkedIcon : incompleteIcon} alt="Completed" />
                        <h5>Complete the Issue</h5>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
                    onClick={() => handleTabClick('summary')}
                >
                    Summary
                </button>
                <button
                    className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                    onClick={() => handleTabClick('details')}
                >
                    Details
                </button>
                <button
                    className={`tab ${activeTab === 'related' ? 'active' : ''}`}
                    onClick={() => handleTabClick('related')}
                >
                    Related
                </button>
            </div>

            {/* Case Details Section */}
            {activeTab === 'summary' && (
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
                            <h2>{formatTime(countdown)}</h2>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'details' && (
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
                            <h2>{formatTime(countdown)}</h2>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'related' && (
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
