import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Staff/StaffStyle/logissue.css';

const Logissueform = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    issueTitle: '',
    category: '',
    department: '',
    priorityLevel: '',
    description: '',
    date: '',
    location: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.issueTitle ||
      !formData.category ||
      !formData.department ||
      !formData.priorityLevel ||
      !formData.description ||
      !formData.date ||
      !formData.location
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Proceed with submission if all fields are filled
    setSubmitted(true);
  };

  const handleCancel = () => {
    navigate('/staffdashboard/WelcomeStaff'); // Navigate to welcome page when cancel is clicked
  };

  const handleView = () => {
    navigate('/staffdashboard/mainContent'); // Navigate to AllIssuePage when View is clicked
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            <input type="text" name="issueTitle" placeholder="Internal Issue" value={formData.issueTitle} onChange={handleChange} />
          </div>

          <div className='box'>
            <label>Category<span className="required">*</span></label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option> {/* Placeholder option */}
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
            <input type="text" name="department" placeholder="Human Resource (HR)" value={formData.department} onChange={handleChange} />
          </div>

          <div className='box'>
            <label>Priority level<span className="required">*</span></label>
            <select name="priorityLevel" value={formData.priorityLevel} onChange={handleChange}>
              <option value="">Select priority level</option> {/* Placeholder option */}
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <label>Description<span className="required">*</span></label>
        <textarea name="description" placeholder="Describe the issue here..." rows="4" value={formData.description} onChange={handleChange}></textarea>

        <div className="form-row">
          <div className='box'>
            <label>Date<span className="required">*</span></label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className='box'>
            <label>Location<span className="required">*</span></label>
            <select name="location" value={formData.location} onChange={handleChange}>
              <option value="">Select a location</option> {/* Placeholder option */}
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
