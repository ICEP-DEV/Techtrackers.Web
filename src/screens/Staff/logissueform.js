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
    buildingNumber: '',
    attachmentFiles: [], // Updated to support multiple files
  });
  const [errors, setErrors] = useState({});
  const [filePreviews, setFilePreviews] = useState([]); // Previews for all files
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
    const files = Array.from(event.target.files); // Convert FileList to Array
    setFormValues((prevValues) => ({
      ...prevValues,
      attachmentFiles: [...prevValues.attachmentFiles, ...files], // Append new files
    }));

    // Generate previews for all files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
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

    // Append each file to the FormData
    formValues.attachmentFiles.forEach((file, index) => {
        formData.append(`AttachmentFile`, file); // Use "AttachmentFile" as the key
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
                attachmentFiles: [],
            });
            setFilePreviews([]); // Reset previews
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
              <option value={1}>CARPENTRY</option>
              <option value={2}>ELECTRICAL</option>
              <option value={3}>ENGRAVING</option>
              <option value={4}>GENERAL (Water Proofing, Blinds, and Glass Replacement).</option>
              <option value={5}>LIFTS</option>
              <option value={6}>AIR CONDITIONER</option>
              <option value={7}>BUILDING</option>
              <option value={8}>METALWORK </option>
              <option value={9}>PAINTING</option>

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
              readOnly
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
          <label>Attachments (include screenshots, photos, documents, etc.):</label>
          <div>
            <input
              type="file"
              name="attachmentFiles"
              multiple // Allow multiple file selection
              onChange={handleFileChange}
            />
            <p className={styles.fileFormatHint}>(JPEG, PNG, PDF, DOCX, etc.)</p>

            {/* Display file names as clickable links */}
            {formValues.attachmentFiles.length > 0 && (
              <div>
                {formValues.attachmentFiles.map((file, index) => (
                  <div key={index}>
                    {filePreviews[index] ? (
                      <a
                        href={filePreviews[index]}
                        target="_blank"
                        rel="noopener noreferrer">
                        {file.name}
                      </a>
                    ) : (
                      <span>{file.name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.FformButons}>
          <button type="submit" className={styles.submitBtn}>Submit</button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Logissueform;
