import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import HODDashboard from "./HODDashboard";
import ManageLogs from "./ManageLogsFolder/ManageLogs";
import GenerateReport from "../components/GenerateReport/Report";
import Notification from "../screens/Notification Page/Notification";
import IssueReport from "../components/GenerateReport/IssuesStatusReport";
import MonthlyReprt from "../components/GenerateReport/MonthlySummaryReport";
import TechnicianReport from "../components/GenerateReport/TechnicianPerformanceReport";

import MainContent from "./MainContent";
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
              <Route
                path="/"
                element={<HODDashboard isSidebarOpen={isSidebarOpen} />}
              />

              <Route
                path="/manage-logs"
                element={<ManageLogs isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/all-issues"
                element={<MainContent isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/generate-report"
                element={<GenerateReport isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/status-report"
                element={<IssueReport isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/monthly-summary-report"
                element={<MonthlyReprt isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/technician-performance-report"
                element={<TechnicianReport isSidebarOpen={isSidebarOpen} />}
              />
              <Route
                path="/notifications"
                element={<Notification isSidebarOpen={isSidebarOpen} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default HeadDepartment;
