import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import HODDashboard from './HODDashboard';
import LogIssueForm from './LogIssueFormFolder/LogIssueForm';

function HeadDepartment() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="content">
            <Routes>
              <Route path="/" element={<HODDashboard isSidebarOpen={isSidebarOpen} />} />
              <Route path="/log-issue" element={<LogIssueForm isSidebarOpen={isSidebarOpen} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default HeadDepartment;
