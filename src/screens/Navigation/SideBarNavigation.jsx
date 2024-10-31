// MainContent.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./TechnicianSidebar";
import TechnicianHeader from './TechnicianHeader';

import Techdashboard from "./pages/Techdashboard";
import NotificationsPage from "./pages/TechNotification";
import TechCollaboration from "./pages/TechCollaboration";
import TechReviews from "./pages/TechReviews";
import MyIssues from "./pages/TechAllIssues";




import "./SidebarCSS/SidebarNavStyle.css"

const TechnicianDashboard = () => {
  
  const handleLogout = ()=> {
      localStorage.removeItem('user_info');
  }
  return (
    <div className="admin-dashboard">
      <TechnicianHeader />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Techdashboard/>} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/myIssues" element={<MyIssues />}/>
          <Route path="/collaboration" element={<TechCollaboration />} />
          <Route path="/reviews" element={<TechReviews />} />
       
          <Route path="/" element={<Techdashboard />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
