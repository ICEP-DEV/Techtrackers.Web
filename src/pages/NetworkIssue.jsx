import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import noNetwork from '../components/IconsForStaff/noNetwork.jpg';
import '../style/style.css'; // Import the main CSS file

const NetworkIssue = ({ onClose }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleClose = () => {
        navigate('/all-issues');
    };

    return (
    <div className="issue-details-container">
        <h1 className="issue-title">Network Issue</h1>

        {/* Department Info, Priority, and Issue Date Container */}
        <div className="details-header">
        <div className="department-info">
        <p className="department-info">Department - Human Resource(HR)</p>
        <p className="department-info">Building 18 - 2nd Floor</p>
        </div>
        <div className="priority-info">
            <strong>Priority: HIGH</strong>
        </div>
        <p className="issue-date">Date: 15/08/2024</p>
     </div>

        <strong>Description</strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        {/* Attachment Icon */}
        <div className="attachment-section">
                <FaPaperclip
                    size={24}
                    className="attachment-icon"
                    
                />
                <span className="attachment-text">Attachments</span>
                {/* Clickable box to open the attachment */}
                <div
                    className="attachment-box"
                    onClick={openModal} // Open modal on box click
                >
                    Click here to open the attachment
                </div>
                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <img
                            src={noNetwork}
                            alt="Issue Full"
                            className="modal-image"
                        />
                    </div>
                )}
         {/* Close Button */}
    <div className="close-button-container">
        <button className="close-button" onClick={handleClose}>
            Close
        </button>
    </div>
    </div>

    {/* Close Button */}
    
</div>

    );
};

export default NetworkIssue;
 