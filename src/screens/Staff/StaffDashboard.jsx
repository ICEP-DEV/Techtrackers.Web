import Dashboard from './WelcomeStaff';
import LogIssue from './logissueform';
import AllIssue from './IssueDisplay';
import Notification from './IssueTracker';
import SideBar from './Navigation/Sidebar';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './StaffStyle/staffdashboard.css';
import StaffHeader from './Navigation/StaffHeader';

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
            </Routes>
        </SideBar>
        </div> 
    );
};

export default StaffDashboard;