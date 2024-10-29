import React, { useState } from "react";
import "./LogIssueForm.css"; // Importing the CSS file

function LogIssueForm() {
  const [date] = useState(new Date().toLocaleDateString("en-GB")); // Automatically set today's date in DD/MM/YYYY format

  return (
    <div className="form-container">
      <h2 className="form-header">
        <span className="form-icon">+</span> LOG ISSUE
      </h2>
      <form className="log-issue-form">
        <div className="form-row">
          <div className="form-field">
            <label>
              Issue title <span className="required">*</span>
            </label>
            <input type="text"  />
          </div>
          <div className="form-field">
            <label>
              Category <span className="required">*</span>
            </label>
            <select>
              <option value="Network Issue">Network Issue</option>
              <option value="Hardware Issue">Hardware Issue</option>
              <option value="Software Issue">Software Issue</option>
              <option value="Infrastructure Issue">Infrastructure Issue</option>
              <option value="Security Issue">Security Issue</option>
              <option value="Facilities Management">Facilities Management</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Department</label>
            <input type="text" value="Human Resources (HR)" readOnly />
          </div>
          <div className="form-field">
            <label>
              Priority level <span className="required">*</span>
            </label>
            <select>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label>
            Description <span className="required">*</span>
          </label>
          <textarea rows="4" placeholder="Describe the issue in detail" />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>
              Date <span className="required">*</span>
            </label>
            <input type="text" value={date} readOnly />
          </div>
          <div className="form-field">
            <label>
              Location <span className="required">*</span>
            </label>
            <select>
              <option value="Main Building">Main Building</option>
              <option value="Building 18-112">Building 18-112</option>
              <option value="Building 10-G42">Building 10-G42</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label>Attachments (include screenshots, photos of faulty equipment/documents)</label>
          <input type="file" accept=".jpeg, .png, .pdf" />
          <small className="attachment-note">(JPEG, PNG, PDF)</small>
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LogIssueForm;
