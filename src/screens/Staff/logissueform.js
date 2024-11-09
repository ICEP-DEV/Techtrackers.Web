import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    attachmentUrl: null,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "category" ? parseInt(value) : value, // Convert category to integer
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFileChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      attachmentUrl: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const staffId = userInfo?.userId;

    if(!staffId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    // Constraction of LogDto
    /*const logDto = {
      Issue_Title: formValues.title,
      Category_ID: formValues.category,
      Department: formValues.department,
      Description: formValues.description,
      Priority: formValues.priority,
      Created_at: formValues.date,
      Location: formValues.location,
      AttachmentUrl: formValues.attachmentUrl ? formValues.attachmentUrl.name : null,
      Staff_ID: staffId, // I'll be passing staff ID from logged-in user(Staff)
    };*/
    const fullLocation = formValues.location 
    ? formValues.buildingNumber 
      ? `${formValues.location}-${formValues.buildingNumber}`
      : formValues.location
    : "Location not specified";

    const formData = new FormData();
      formData.append("Issue_Title", formValues.title);
      formData.append("Category_ID", formValues.category);
      formData.append("Department", formValues.department);
      formData.append("Description", formValues.description);
      formData.append("Priority", formValues.priority);
      formData.append("Created_at", formValues.date);
      formData.append("Location", fullLocation);
      formData.append("Staff_ID", staffId);

      if (formValues.attachmentUrl) {
        formData.append("AttachmentUrl", formValues.attachmentUrl); // Add file directly
      }

    try {
      const response = await fetch('https://localhost:44328/api/Log/CreateLog', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        setFormValues({
          title: '',
          category: '',
          department: '',
          priority: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          location: '',
          buildingNumber: '',
          attachmentUrl: null,
        });
        toast.success("Log submitted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error details from server:", errorData);
        toast.error(`Failed to submit the log: ${errorData.title || "Validation error"}`);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error("An error occurred while submitting the log.");
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
      <ToastContainer />
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
              <option value={1}>Network Issue</option>
              <option value={2}>Software Issue</option>
              <option value={3}>Hardware Issue</option>
              <option value={4}>Infrastructure Issue</option>
              <option value={5}>Security Issue</option>
              <option value={6}>Facilities Management</option>
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
              onChange={handleChange}
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
          <div className='box'>
            <label>Building Number</label>
            <select
              name="buildingNumber"
              value={formValues.buildingNumber}
              onChange={handleChange}
            >
              <option value="">Select Building Number</option>
              <option value="G45H">G45H</option>
              <option value="F23B">F23B</option>
              <option value="D12C">D12C</option>
              <option value="A1">A1</option>
              <option value="B2">B2</option>
              {/* Add more building numbers as needed */}
            </select>
          </div>
        </div>

        <div className="file-input-wrapper">
          <label>Attachments (include screenshots, photos of faulty equipment/documents):</label>
          <div>
            <input type="file" name="attachmentUrl" onChange={handleFileChange} />
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
