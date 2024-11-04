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
import IssueDetails from '../../components/All Issue and View Page/IssueDetails';
import useIssues from "../../components/All Issue and View Page/useIssues";
import "./SidebarCSS/SidebarNavStyle.css";

const TechnicianDashboard = () => {
  // const { issues, setIssues } = useIssues();
  
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
          <Route path="/myIssues/*" element={<RoutesComponent />}/>
          <Route path="/collaboration" element={<CollabMain />} />
          <Route path="/reviews" element={<Ratings />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
