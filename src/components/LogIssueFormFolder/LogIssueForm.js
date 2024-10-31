import React, { useState } from "react";
import "./LogIssueForm.css"; // Importing the CSS file

function LogIssueForm() {
  const [formData, setFormData] = useState({
    issueTitle: "",
    category: "",
    department: "Human Resources (HR)", // Default department
    priority: "",
    description: "",
    date: new Date().toLocaleDateString("en-GB"), // Automatically set today's date
    location: "",
    attachment: null,
  });

  const [errors, setErrors] = useState({});

  // Handle input change to update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Remove error message as the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle cancel button click to reset form
  const handleCancel = () => {
    setFormData({
      issueTitle: "",
      category: "",
      department: "Human Resources (HR)",
      priority: "",
      description: "",
      date: new Date().toLocaleDateString("en-GB"),
      location: "",
      attachment: null,
    });
    setErrors({}); // Clear all errors
  };

  // Handle submit button click with validation for required fields
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    let newErrors = {};
    if (!formData.issueTitle) newErrors.issueTitle = "This field is required";
    if (!formData.category) newErrors.category = "Please select one";
    if (!formData.priority) newErrors.priority = "Please select one";
    if (!formData.description) newErrors.description = "This field is required";
    if (!formData.location) newErrors.location = "Please select one";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set error messages
    } else {
      // Form submission logic can be added here
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">
        <span className="form-icon">+</span> LOG ISSUE
      </h2>
      <form className="log-issue-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label>
              Issue title <span className="required">*</span>
            </label>
            <input
              type="text"
              name="issueTitle"
              value={formData.issueTitle}
              onChange={handleChange}
              className={errors.issueTitle ? "error-field" : ""}
            />
            {errors.issueTitle && <small className="error-message">{errors.issueTitle}</small>}
          </div>
          <div className="form-field">
            <label>
              Category <span className="required">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? "error-field" : ""}
            >
              <option value="">Select Category</option>
              <option value="Network Issue">Network Issue</option>
              <option value="Hardware Issue">Hardware Issue</option>
              <option value="Software Issue">Software Issue</option>
              <option value="Infrastructure Issue">Infrastructure Issue</option>
              <option value="Security Issue">Security Issue</option>
              <option value="Facilities Management">Facilities Management</option>
            </select>
            {errors.category && <small className="error-message">{errors.category}</small>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Department</label>
            <input type="text" value={formData.department} readOnly />
          </div>
          <div className="form-field">
            <label>
              Priority level <span className="required">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={errors.priority ? "error-field" : ""}
            >
              <option value="">Select priority level</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && <small className="error-message">{errors.priority}</small>}
          </div>
        </div>

        <div className="form-field">
          <label>
            Description <span className="required">*</span>
          </label>
          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            className={errors.description ? "error-field" : ""}
          />
          {errors.description && <small className="error-message">{errors.description}</small>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>
              Date <span className="required">*</span>
            </label>
            <input type="text" value={formData.date} readOnly />
          </div>
          <div className="form-field">
            <label>
              Location <span className="required">*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "error-field" : ""}
            >
              <option value="">Select Location</option>
              <option value="Main Building">Main Building</option>
              <option value="Building 18-112">Building 18-112</option>
              <option value="Building 10-G42">Building 10-G42</option>
            </select>
            {errors.location && <small className="error-message">{errors.location}</small>}
          </div>
        </div>

        <div className="form-field">
          <label>Attachments (include screenshots, photos of faulty equipment/documents)</label>
          <input
            type="file"
            accept=".jpeg, .png, .pdf"
            onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
          />
          <small className="attachment-note">(JPEG, PNG, PDF)</small>
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIssueForm;
