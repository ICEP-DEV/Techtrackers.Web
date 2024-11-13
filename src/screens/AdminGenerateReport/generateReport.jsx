import React, { useState } from 'react';
import { AiFillEye, AiOutlineRight } from 'react-icons/ai'; // Import eye and chevron icon
import './report.css'; // CSS file for styling

const GenerateReport = () => {
  const [selectedReport, setSelectedReport] = useState('');

  const handleReportClick = (reportType) => {
    setSelectedReport(reportType);
  };

  return (
    <div className="report-container">
      <div className="report-content">
        <h2><i className="icon"></i>GENERATE REPORT</h2>

        <div className="report-section">
          {/* Report Type Buttons */}
          <div className="report-types">
            <button
              className={`report-btn ${selectedReport === 'status' ? 'active' : ''}`}
              onClick={() => handleReportClick('status')}
            >
              Issues By Status Report <AiOutlineRight className="chevron-icon" />
            </button>
            <button
              className={`report-btn ${selectedReport === 'monthly' ? 'active' : ''}`}
              onClick={() => handleReportClick('monthly')}
            >
              Monthly Summary Report <AiOutlineRight className="chevron-icon" />
            </button>
            <button
              className={`report-btn ${selectedReport === 'performance' ? 'active' : ''}`}
              onClick={() => handleReportClick('performance')}
            >
              Technician Performance Report <AiOutlineRight className="chevron-icon" />
            </button>
          </div>

          {/* Report Preview Section */}
          <div className="report-preview">
            <div className="preview-header">
              <AiFillEye className="preview-icon" /> <span>Preview:</span>
            </div>
            <div className="preview-box"></div>
          </div>
        </div>

        {/* Date Range Section */}
        <div className="date-range">
          <div className="date-field">
            <label>Start Date:</label>
            <input type="date" />
          </div>
          <div className="date-field">
            <label>End Date:</label>
            <input type="date" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="report-actions">
          <button className="cancel-btn">CANCEL</button>
          <button className="generate-btn">GENERATE REPORT</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
