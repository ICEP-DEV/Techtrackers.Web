import React, { useState } from 'react';
import {AiFillEye, AiOutlineRight} from 'react-icons/ai';
import { TbFileReport } from "react-icons/tb";
import '../style/generateReport.css'; // CSS file for styling

const GenerateReport = () => {
  const [selectedReport, setSelectedReport] = useState('');

  const handleReportClick = (reportType) => {
    setSelectedReport(reportType);
  };

  return (
    <div className="report-container">
      <div className="report-content">
        <h2><TbFileReport className="icon" />GENERATE REPORT</h2>
      <div className="report-section">
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
            Technician performance Report <AiOutlineRight className="chevron-icon" />
          </button>
        </div>

        <div className="report-preview">
          <div className="preview-header">
            <AiFillEye className="preview-icon" /> <span>Preview:</span>
          </div>
          <div className="preview-box"></div>
        </div>
      </div>
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

        <div className="report-actions">
          <button className="cancel-btn">CANCEL</button>
          <button className="generate-btn">GENERATE REPORT</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
