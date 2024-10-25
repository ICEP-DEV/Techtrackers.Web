
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import HODDashboard from './HODDashboard';
// import LogIssue from './components/LogIssue';
// import ManageLogs from './components/ManageLogs';
// import GenerateReport from './components/GenerateReport';
// import Notifications from './components/Notifications';

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
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
          <div className="content">
            <Routes>
              <Route path="/" element={<HODDashboard isSidebarOpen={isSidebarOpen} />} />
              {/* <Route path="/log-issue" element={<LogIssue />} />
              <Route path="/manage-logs" element={<ManageLogs />} />
              <Route path="/generate-report" element={<GenerateReport />} />
              <Route path="/notifications" element={<Notifications />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default HeadDepartment;
