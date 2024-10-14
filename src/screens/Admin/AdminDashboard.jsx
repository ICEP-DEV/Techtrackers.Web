import Dashboard from './AdminWelcome';
//import LogIssue from './logissueform';
//import Notification from './IssueTracker';
import SideBar from './Navigation/Sidebar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './AdminStyle/admindashboard.css';
import AdminHeader from './Navigation/AdminHeader';
import AddTech from './AddTechnicianPage';
//import IssueDisplay from './IssueDisplay';


const AdminDashboard = () => {
    return (  
       <Router >
        <div className="admin-dashboard">
         <AdminHeader /> 
         <SideBar>
            <Routes>
                {/*<Route path="WelcomeStaff" element={<Dashboard />} /> 
                <Route path="logissueform" element={<LogIssue />}/>*/}
                <Route path="/AddTechnician" element={<AddTech/>}/>
                <Route path="/AdminWelcome" element={<Dashboard />}/>
            </Routes>
        </SideBar>
        </div> 
        </Router> 
    );
};

export default AdminDashboard;