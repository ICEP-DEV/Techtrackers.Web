import Dashboard from './screens/Staff/WelcomeStaff';
import LogIssue from './screens/Staff/logissueform';
import AllIssue from './screens/Staff/IssueDisplay';
import Notification from './screens/Staff/IssueTracker';
import SideBar from './screens/Navigation/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
    return (
        <BrowserRouter>
        <SideBar>
   
        <Routes>
            <Route path="/WelcomeStaff" element={<Dashboard />} /> 
            <Route path="/logissueform" element={<LogIssue />}/>
            <Route path="/IssueDisplay" element={<AllIssue />}/>
            <Route path="/issueTracker" element={<Notification />}/>
       </Routes>
       </SideBar>
       </BrowserRouter>
    );
};

export default App;