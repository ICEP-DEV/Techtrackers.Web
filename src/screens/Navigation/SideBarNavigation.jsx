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

import TechnicianNotifications from '../../components/Notifications/TechnicianNotifications';
import WelcomTechnician from '../TechDashBoard1/WelcomeTechnician';
import RoutesComponent from '../../components/All Issue and View Page/RoutesComponent';
import CollabMain from '../../components/CollaborationRequest/CollabMain';
import Ratings from '../../components/Ratings';
import "./SidebarCSS/SidebarNavStyle.css";
import TechnicianLiveChat from '../../components/TechnicianLiveChat/TechnicianLiveChat';
import Table from "../../components/All Issue and View Page/Table";
import IssueDetails from "../../components/All Issue and View Page/IssueDetails";
import useIssues from "../../components/All Issue and View Page/useIssues";
import IssueDetailsCollab from '../../components/CollaborationRequest/Table1';
import Table1 from '../../components/CollaborationRequest/Table1';
import IssueDetails1 from '../../components/CollaborationRequest/IssueDetails1';

const TechnicianDashboard = () => {
  const { issues, setIssues } = useIssues();
  
  const handleLogout = ()=> {
      localStorage.removeItem('user_info');
  }
  return (
    <div className="admin-dashboard">
      <TechnicianHeader />
      <Sidebar />
      <div className="main-content">
        <Routes>
        {/* <Route path="/issues/:issueId" element={<IssueDetails issues={issues} />} /> */}

          <Route path="/dashboard" element={<WelcomTechnician/>} />
          <Route path="/notifications" element={<TechnicianNotifications />} />
          <Route path="/tbl" element={<Table issues={issues} setIssues={setIssues} />} />
          <Route path="/issues/:issueId" element={<IssueDetails issues={issues} />} />
          <Route path="/liveChat" element={<TechnicianLiveChat/>} />
          {/* <Route path="/collaboration" element={<CollabMain />} /> */}
          <Route path="/issue1/:issueId" element={<IssueDetailsCollab />} />
          <Route path="/reviews" element={<Ratings />} />
          
          <Route path="/collab" element={<Table1 />} />
          <Route path="/issue/:issueId" element={<IssueDetails1 />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
