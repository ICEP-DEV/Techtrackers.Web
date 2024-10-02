import Dashboard from './WelcomeStaff';
import LogIssue from './logissueform';
import AllIssue from './IssueDetails';
import Notification from './IssueTracker';
import SideBar from './Navigation/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../App.css';

const StaffDashboard = () => {
    return (
        <BrowserRouter>
        <SideBar />
   
        <Routes>
            <Route path="/WelcomeStaff" element={<Dashboard />} /> 
            <Route path="/logissueform" element={<LogIssue />}/>
            <Route path="/issueDetails" element={<AllIssue />}/>
            <Route path="/issueTracker" element={<Notification />}/>
       </Routes>
       </BrowserRouter>
    );
};

export default StaffDashboard;