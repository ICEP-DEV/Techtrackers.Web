import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Staff/StaffStyle/logissue.css';

const Logissueform = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    department: '',
    priority: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error message on change
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validation
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        newErrors[key] = 'This field is required.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent submission if there are errors
    }

    setSubmitted(true);
  };

  const handleCancel = () => {
    navigate('/staffdashboard/WelcomeStaff'); // Navigate to DashboardPage when cancel is clicked
  };

  const handleView = () => {
    navigate('/staffdashboard/IssueDisplay'); // Navigate to AllIssuePage when View is clicked
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
            <input
              id='issue-title'
              type="text"
              name="title"
              placeholder="Internal Issue"
              value={formValues.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          <div className='box'>
            <label>Category<span className="required">*</span></label>
            <select
              name="category"
              value={formValues.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Network Issue</option>
              <option>Software Issue</option>
              <option>Hardware Issue</option>
              <option>Infrastructure Issue</option>
              <option>Security Issue</option>
              <option>Facilities Management</option>
            </select>
            {errors.category && <p className="error-message">{errors.category}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className='box'>
            <label>Department<span className="required">*</span></label>
            <input
              type="text"
              name="department"
              placeholder="Human Resource (HR)"
              value={formValues.department}
              onChange={handleChange}
              readOnly
            />
            {/* {errors.department && <p className="error-message">{errors.department}</p>} */}
          </div>

          <div className='box'>
            <label>Priority level<span className="required">*</span></label>
            <select
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
            >
              <option value="">Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            {errors.priority && <p className="error-message">{errors.priority}</p>}
          </div>
        </div>

        <label>Description<span className="required">*</span></label>
        <textarea
          name="description"
          placeholder="Describe the issue here..."
          rows="4"
          value={formValues.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <p className="error-message">{errors.description}</p>}

        <div className="form-row">
          <div className='box'>
            <label>Date<span className="required">*</span></label>
            <input
              type="date"
              name="date"
              readOnly
              value={formValues.date}
              onChange={handleChange}
            />
            {/* {errors.date && <p className="error-message">{errors.date}</p>} */}
          </div>
          
          <div className='box'>
            <label>Location<span className="required">*</span></label>
            <select
              name="location"
              value={formValues.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option>TUT Building 18</option>
              <option>Main Office</option>
              <option>Remote Site</option>
            </select>
            {errors.location && <p className="error-message">{errors.location}</p>}
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
