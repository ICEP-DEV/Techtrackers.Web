import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import styles from '../Staff/StaffStyle/logissue.module.css';

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
    attachmentFile: null,
  });
  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState(null); // State for storing file URL
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));

    if (userInfo && userInfo.department) {
      setFormValues((prevValues) => ({
        ...prevValues,
        department: userInfo.department, // Set the department
      }));
    } else {
      console.warn("No department found in user_info.");
      setFormValues((prevValues) => ({
        ...prevValues,
        department: "Unknown Department", // Fallback if department is missing
      }));
    }
  }, []);

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
    const file = event.target.files[0];
    setFormValues((prevValues) => ({
      ...prevValues,
      attachmentFile: file,
    }));

    // Generate file URL for the selected file
    if (file) {
      setFilePreview(URL.createObjectURL(file)); // Store the URL for the file
    } else {
      setFilePreview(null); // Reset preview if no file
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const staffId = userInfo?.userId;

    if (!staffId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

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

    if (formValues.attachmentFile) {
      formData.append("AttachmentFile", formValues.attachmentFile);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
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
          attachmentFile: null,
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
    <div className={styles.mainContent}>
      <ToastContainer />
      {submitted && (
        <div className={styles.successMessage}>
          Thank you for reporting this issue. Your log has been submitted successfully. You can <a href="#" onClick={handleView}>View</a> it in your logged issues.
        </div>
      )}
      <form className={styles.logIssueForm} onSubmit={handleSubmit}>
        <h2><FaPlusCircle /> LOG ISSUE</h2>
        
        <div className={styles.formRow}>
          <div className={styles.Box}>
            <label>Issue title<span className={styles.Required}>*</span></label>
            <input
              id='issue-title'
              type="text"
              name="title"
              placeholder="Internal Issue"
              value={formValues.title}
              onChange={handleChange}
            />
            {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
          </div>

          <div className='box'>
            <label>Category<span className={styles.Required}>*</span></label>
            <select
              name="category"
              value={formValues.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {/* <option value={1}>Network Issue</option>
              <option value={2}>Software Issue</option>
              <option value={4}>Infrastructure Issue</option>
              <option value={5}>Security Issue</option>
              <option value={6}>Facilities Management</option> */}
              <option value={1}>Hardware Issue</option>
              <option value={2}>Software Issue</option>
              <option value={3}>Network Issue</option>
              <option value={4}>Account Management Issue</option>
              <option value={5}>General Inquiry</option>
            </select>
            {errors.category && <p className={styles.errorMessage}>{errors.category}</p>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.Box}>
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formValues.department}
              onChange={handleChange}
            />
          </div>

          <div className={styles.Box}>
            <label>Priority level<span className={styles.Required}>*</span></label>
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
            {errors.priority && <p className={styles.errorMessage}>{errors.priority}</p>}
          </div>
        </div>

        <label>Description<span className={styles.Required}>*</span></label>
        <textarea
          name="description"
          placeholder="Describe the issue here..."
          rows="4"
          value={formValues.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}

        <div className={styles.formRow}>
          <div className={styles.Box}>
            <label>Date</label>
            <input
              type="date"
              name="date"
              readOnly
              value={formValues.date}
            />
          </div>
          
          <div className={styles.Box}>
            <label>Location<span className={styles.Required}>*</span></label>
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
            {errors.location && <p className={styles.errorMessage}>{errors.location}</p>}
          </div>
          <div className={styles.Box}>
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
            </select>
          </div>
        </div>

        <div className={styles.fileInputWrapper}>
          <label>Attachments (include screenshots, photos of faulty equipment/documents):</label>
          <div>
            <input 
              type="file" 
              name="attachmentUrl" 
              onChange={handleFileChange} 
            />
            <p className={styles.fileFormatHint}>(JPEG, PNG, PDF)</p> 

            {/* Display file name as a clickable link */}
            {formValues.attachmentFile && (
              <div>
                {/* Use the filePreview URL or fallback to the uploaded file name */}
                {filePreview ? (
                  <a 
                    href={filePreview} 
                    target="_blank" 
                    rel="noopener noreferrer">
                    {formValues.attachmentFile.name}
                  </a>
                ) : (
                  <span>{formValues.attachmentFile.name}</span> // Fallback to file name when no preview is available
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.FformButons}>
          <button type="submit">Submit</button>
          <button type="button" className={styles.CcancelButton} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Logissueform;
