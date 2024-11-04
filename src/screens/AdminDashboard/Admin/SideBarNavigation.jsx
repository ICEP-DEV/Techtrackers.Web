// MainContent.jsx
import React from "react";
import {BrowserRouter, Routes, Route , useNavigate} from "react-router-dom";
import Sidebar from "./AdminSidebar";
import DashboardPage from "./pages/DashboardPage";
import AddTechPage from "./pages/AddTechPage";
import NotificationsPage from "./pages/NotificationsPage";
import ViewAllLogs from "./pages/ViewAllLogs";
import ReportPage from "./pages/ReportPage";
import LogIssue from "./pages/LogIssue";
import AssignTech from "./pages/AssignTech";
import MyIssues from "./pages/MyIssues";
import AdminHeader from './AdminHeader';
import useIssues from "./pages/useIssues";
import IssueDetails from "./pages/IssueDetails";
import ManageTech from "./pages/ManageTech";
import TechnicianAdded from "./pages/TechnicianAdded";
import "./SidebarCSS/SidebarNavStyle.css"

const AdminDashboard = () => {
  const navigate =useNavigate();
  const { issues, setIssues } = useIssues();
  const handleLogout = ()=> {
      localStorage.removeItem('user_info');
      navigate('/login');
  }
  return (
    <div className="admin-dashboard">
      <AdminHeader onLogout={handleLogout}/>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/viewAllLogs" element={<ViewAllLogs />} />
          <Route path="/logIssue" element={<LogIssue />} />
          <Route path="/assignTech" element={<AssignTech />} />
          <Route path="/myIssues" element={<MyIssues issues={issues} setIssues={setIssues}/>} />
          <Route path="/add-tech" element={<AddTechPage />} />
          <Route path="/report-page" element={<ReportPage />} />
          <Route path="/TechnicianAdded" element={<TechnicianAdded />}/>
          <Route path="/issue-details/:issueId" element={<IssueDetails issues={useIssues} />} />
          <Route path="/ManageTech" element={<ManageTech />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
