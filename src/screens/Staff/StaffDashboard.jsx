import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./WelcomeStaff";
import LogIssue from "./logissueform";
import AllIssue from "./IssueDisplay";
import Notification from "./IssueTracker";
import SideBar from "./Navigation/Sidebar";
import StaffHeader from "./Navigation/StaffHeader";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user_info");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Pass toggleSidebar to both Header and Sidebar */}
      <StaffHeader onLogout={handleLogout} toggleSidebar={toggleSidebar} />
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <Routes>
          <Route path="WelcomeStaff" element={<Dashboard />} />
          <Route path="logissueform" element={<LogIssue />} />
          <Route path="IssueDisplay" element={<AllIssue />} />
          <Route path="issueTracker" element={<Notification />} />
        </Routes>
      </SideBar>
    </div>
  );
};

export default StaffDashboard;
