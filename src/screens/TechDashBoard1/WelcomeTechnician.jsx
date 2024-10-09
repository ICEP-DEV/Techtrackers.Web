import React from 'react';
import './WelcomeTechnician.css'; // Assuming the styles are in this CSS file
import Arrow from '../TechDashBoard1/Arrow.png';
import Check from '../TechDashBoard1/Check.png';

const WelcomeTechnician = () => {
    return (
        <div className="mains-content">
            <h1 className="titles">WELCOME, TECHNICIAN!</h1>

            <div className="main-cards-wrapper"> {/* Main wrapper to hold both containers */}
                <div className="cards-container">
                    <div className="cards log-issue">
                        <div className="cards-content">
                            <h2>25 COMPLETED</h2>
                        </div>
                    </div>

                    <div className="cards">
                        <div className="cards-content">
                            <h2>12 IN PROGRESS</h2>
                        </div>
                    </div>

                    <div className="cards">
                        <div className="cards-content">
                            <h2>2 ON HOLD</h2>
                        </div>
                    </div>

                    <div className="cards">
                        <div className="cards-content">
                            <h2>2 PENDING</h2>
                        </div>
                    </div>
                </div>

                <div className="cards-container2"> {/* Right container with two cards */}
                    <div className="cards" id='card-priority'>
                        <div className="cards-content">
                            <h2 style={{ display: 'inline-block', marginRight: '10px' }}>
                                <img src={Arrow} alt="Arrow right" className="card-image" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                UPCOMING TASKS
                            </h2>
                            <p>You have 2 new issues assigned to you.</p>
                        </div>
                    </div>

                    <div className="cards" id='card-urgent'>
                        <div className="cards-content">
                            <h2 style={{ display: 'inline-block', marginRight: '10px' }}>
                                <img src={Check} alt="Update Status" className="card-image" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                UPDATE STATUS
                            </h2>
                            <p>Update the issue status of pending,</p>
                            <p>ongoing or resolved cases.</p> 
                        </div>
                    </div>
                </div>
            </div>

            {/* New container below the main-cards-wrapper for additional cards */}
            <div className="new-cards-wrapper"> {/* New wrapper for additional cards */}
                <div className="cards-container3"> {/* Container for four new cards */}
                    <h2 className="subtitle">TASK OVERVIEW</h2> {/* Title for the cards container */}
                    <div className="cards-row"> {/* Row for the first two cards */}
                        <div className="cards">
                            <div className="cards-content">
                                <h2>TASK 1</h2>
                                <p>Description of task 1.</p>
                            </div>
                        </div>

                        <div className="cards">
                            <div className="cards-content">
                                <h2>TASK 2</h2>
                                <p>Description of task 2.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="cards-row"> {/* Row for the second two cards */}
                        <div className="cards">
                            <div className="cards-content">
                                <h2>TASK 3</h2>
                                <p>Description of task 3.</p>
                            </div>
                        </div>

                        <div className="cards">
                            <div className="cards-content">
                                <h2>TASK 4</h2>
                                <p>Description of task 4.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeTechnician;





