import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../SidebarCSS/LogIssue.module.css"; // Import the CSS Module

const Logissueform = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    department: "Human Resource (HR)", // default value
    priority: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
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
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation (excluding department and date)
    const newErrors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key] && key !== "department" && key !== "date") {
        newErrors[key] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate form submission success
    setSubmitted(true);
    // Optionally, reset form after submission
    setFormValues({
      title: "",
      category: "",
      department: "Human Resource (HR)",
      priority: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      location: "",
    });
  };

  const handleCancel = () => {
    navigate("/adminDashboard/WelcomeAdmin"); // Changed to AdminDashboard
  };

  const handleView = () => {
    navigate("/adminDashboard/myIssues"); // Navigate to myIssues page
  };

  return (
    <div className={styles.dashboardContainer}>
      {submitted && (
        <div className={styles.successMessage}>
          Thank you for reporting this issue. Your log has been submitted
          successfully. You can{" "}
          <a href="#" onClick={handleView}>
            View
          </a>{" "}
          it in your logged issues.
        </div>
      )}
      <form className={styles.logIssueForm} onSubmit={handleSubmit}>
        <h2>
          <FaPlusCircle /> LOG ISSUE
        </h2>

        <div className={styles.formRow}>
          <div className={styles.box}>
            <label>
              Issue title<span className={styles.required}>*</span>
            </label>
            <input
              id="issue-title"
              type="text"
              name="title"
              placeholder="Internal Issue"
              value={formValues.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className={styles.errorMessage}>{errors.title}</p>
            )}
          </div>

          <div className={styles.box}>
            <label>
              Category<span className={styles.required}>*</span>
            </label>
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
            {errors.category && (
              <p className={styles.errorMessage}>{errors.category}</p>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.box}>
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formValues.department}
              readOnly
            />
          </div>

          <div className={styles.box}>
            <label>
              Priority level<span className={styles.required}>*</span>
            </label>
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
            {errors.priority && (
              <p className={styles.errorMessage}>{errors.priority}</p>
            )}
          </div>
        </div>

        <label>
          Description<span className={styles.required}>*</span>
        </label>
        <textarea
          name="description"
          placeholder="Describe the issue here..."
          rows="4"
          value={formValues.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && (
          <p className={styles.errorMessage}>{errors.description}</p>
        )}

        <div className={styles.formRow}>
          <div className={styles.box}>
            <label>Date</label>
            <input type="date" name="date" readOnly value={formValues.date} />
          </div>

          <div className={styles.box}>
            <label>
              Location<span className={styles.required}>*</span>
            </label>
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
            {errors.location && (
              <p className={styles.errorMessage}>{errors.location}</p>
            )}
          </div>
        </div>

        <div className={styles.fileInputWrapper}>
          <label>
            Attachments (include screenshots, photos of faulty
            equipment/documents):
          </label>
          <div>
            <input type="file" />
            <p className={styles.fileFormatHint}>(JPEG, PNG, PDF)</p>
          </div>
        </div>

        <div className={styles.formButtons}>
          <button type="submit">Submit</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Logissueform;
