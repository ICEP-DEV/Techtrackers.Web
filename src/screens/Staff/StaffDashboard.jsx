import Dashboard from './WelcomeStaff';
import LogIssue from './logissueform';
import AllIssue from './IssueDetails';
import Notification from './IssueTracker';
import SideBar from './Navigation/Sidebar';
import StaffHear from './Navigation/StaffHeader';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './StaffStyle/staffdashboard.css';
import StaffHeader from './Navigation/StaffHeader';
import MainContent from './MainContent';
import IssueDetails from './IssueDetails'; // Correct import for IssueDetails


const StaffDashboard = () => {
    return (  
        <div>
         <StaffHeader /> 
         <SideBar>
            <Routes>
                <Route path="WelcomeStaff" element={<Dashboard />} /> 
                <Route path="logissueform" element={<LogIssue />}/>
                <Route path="IssueDisplay" element={<AllIssue />}/>
                <Route path="issueTracker" element={<Notification />}/>
                <Route path="mainContent" element={<MainContent />}/>
                <Route path="issueDetails/:id" element={<IssueDetails />}/>
            </Routes>
        </SideBar>
        </div> 
    );
};

export default StaffDashboard;