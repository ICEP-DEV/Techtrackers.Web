import Dashboard from './WelcomeStaff';
import LogIssue from './logissueform';
import AllIssue from './IssueDisplay';
import Notification from './IssueTracker';
import SideBar from './Navigation/Sidebar';
import {BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styles from './StaffStyle/staffdashboard.module.css';
import StaffHeader from './Navigation/StaffHeader';

const StaffDashboard = () => {
    const navigate =useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user_info');
        navigate('/login');
    }
    return (  
        <div>
         <StaffHeader onLogout={handleLogout}/> 
         <SideBar className >
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