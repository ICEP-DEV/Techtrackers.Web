import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './logissue.css';

const Logissueform = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleCancel = () => {
    navigate('/dashboard'); // Navigate to DashboardPage when cancel is clicked
  };

  const handleView = () => {
    navigate('/all-issues'); // Navigate to AllIssuePage when View is clicked
  };

  return (
    <div className="main-content">
      {submitted && (
        <div className="success-message">
          Thank you for reporting this issue. Your log has been submitted successfully. You can <a href="#" onClick={handleView}>View</a> it in your logged issues.
        </div>
      )}
      <form className="log-issue-form" onSubmit={handleSubmit}>
        <h2><FaPlusCircle /> LOG ISSUE</h2>
        <div className="form-row">
          <div className='box'>
            <label>Issue title<span className="required">*</span></label>
            <input type="text" placeholder="Internal Issue" />
          </div>

          <div className='box'>
            <label>Category<span className="required">*</span></label>
            <select>
              <option>Network Issue</option>
              <option>Software Issue</option>
              <option>Hardware Issue</option>
              <option>Infrastructure Issue</option>
              <option>Security Issue</option>
              <option>Facilities Management</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className='box'>
            <label>Department<span className="required">*</span></label>
            <input type="text" name="department" placeholder="Human Resource (HR)" />
          </div>

          <div className='box'>
            <label>Priority level<span className="required">*</span></label>
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <label>Description<span className="required">*</span></label>
        <textarea placeholder="Describe the issue here..." rows="4"></textarea>

        <div className="form-row">
          <div className='box'>
            <label>Date<span className="required">*</span></label>
            <input type="date" name="date" />
          </div>
          
          <div className='box'>
            <label>Location<span className="required">*</span></label>
            <select>
              <option>TUT Building 18</option>
              <option>Main Office</option>
              <option>Remote Site</option>
            </select>
          </div>
        </div>

        <div className="file-input-wrapper">
          <label>Attachments (include screenshots, photos of faulty equipment/documents):</label>
          <div>
            <input type="file" />
            <p className="file-format-hint">(JPEG,PNG,PDF)</p> 
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Logissueform;
