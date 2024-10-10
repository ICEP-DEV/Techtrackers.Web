import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Staff/StaffStyle/logissue.css';

const Logissueform = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    department: 'Human Resource (HR)', // default value
    priority: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Submit the form data to the API
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation (excluding department, date, and attachments)
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key] && key !== 'department' && key !== 'date') {
        newErrors[key] = 'This field is required.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send data to the API
    try {
      const response = await fetch('https://localhost:44328/api/Log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        setSubmitted(true);
        // Optionally, reset form after submission
        setFormValues({
          title: '',
          category: '',
          department: '',
          priority: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          location: '',
        });
      } else {
        const errorData = await response.json();
        console.error("Error submitting log:", errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCancel = () => {
    navigate('/staffdashboard/WelcomeStaff');
  };

  const handleView = () => {
    navigate('/staffdashboard/IssueDisplay');
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
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formValues.department}
              readOnly
            />
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
            <label>Date</label>
            <input
              type="date"
              name="date"
              readOnly
              value={formValues.date}
            />
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
