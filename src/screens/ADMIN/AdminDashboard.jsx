import Dashboard from './AdminWelcome';
//import LogIssue from './logissueform';
//import Notification from './IssueTracker';
import AdminSidebar from '../ADMIN/Navigation/AdminSidebar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './AdminStyle/admindashboard.css';
import AdminHeader from './Navigation/AdminHeader';
import AddTech from './AddTechnicianPage';


import NotificationsPage from './NotificationsPage';
import AddTechnicianPage from './AddTechnicianPage';
import ReportPage from './ReportPage';
import MainContent from './MainContent';
import LogIssue from './LogIssue';
import AssignTech from './AssignTech';
import MyIssues from './MyIssues';
import TechnicianAdded from './TechnicianAdded';




const AdminDashboard = () => {
    const handleLogout = ()=> {
        localStorage.removeItem('user_info');
    }
    return (  
        <div className="admin-dashboard">
         <AdminHeader onLogout={handleLogout} /> 
         <AdminSidebar>
            <Routes>
                {/*<Route path="WelcomeStaff" element={<Dashboard />} /> 
                <Route path="logissueform" element={<LogIssue />}/>*/}
                <Route path="/AddTechnician" element={<AddTech/>}/>
                <Route path="/ReportPage" element={<ReportPage />}/>

                {/* added routes */}
                <Route path="/NotificationsPage" element={<NotificationsPage />}/>
                <Route path="/AddTechnicianPage" element={<AddTechnicianPage />}/>
                <Route path="/WelcomeAdmin" element={<Dashboard />}/>
                <Route path="/MainContent" element={<MainContent />}/>
                <Route path="/LogIssue" element={<LogIssue />}/>
                <Route path="/AssignTech" element={<AssignTech />}/>
                <Route path="/MyIssues" element={<MyIssues />}/>
                <Route path="/TechnicianAdded" element={<TechnicianAdded />}/>

            </Routes>
        </AdminSidebar>
        </div> 
    );
};

export default AdminDashboard;