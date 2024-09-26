import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllIssuePage = () => {
    const navigate = useNavigate();

    const handleViewClick = () => {
        navigate('/internal-issue'); // Navigate to InternalIssuePage.jsx
    };

    const handleView1Click = () => {
        navigate('/network-issue'); // Navigate to NetworkIssue.jsx
    };

    const handleView2Click = () => {
        navigate('/printer-not-working'); // Navigate to PrinterNotWorking.jsx
    };

    return (
        <div className='main-content'>
        <div className='buttons'>
            <h1>STATUS</h1>
            <button onClick={handleViewClick}>internal issues</button>
            <p></p>
            <button onClick={handleView1Click}>Network Issue</button>
            <p></p>
            <button onClick={handleView2Click}>Printer issues</button>
        </div>
        </div>
    );
};

export default AllIssuePage;
