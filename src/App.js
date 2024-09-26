import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import AllIssuePage from './pages/AllIssuePage';
import NotificationsPage from './pages/NotificationsPage';
import LogIssuePage from './pages/LogIssuePage';
import InternalIssuePage from './pages/InternalIssuePage';
import NetworkIssue from './pages/NetworkIssue'; // Import Network Issue Page
import PrinterNotWorking from './pages/PrinterNotWorking'; // Import Printer Not Working Page
import './style/style.css'; // Main app styling
import StaffHeader from './components/StaffHeader';

const AppContent = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelect = (page) => {
        navigate(`/${page}`);
    };

    const handleViewClick = () => {
        navigate('/issue-details'); // For InternalIssuePage
    };

    const handleView1Click = () => {
        navigate('/network-issue'); // For NetworkIssuePage
    };

    const handleView2Click = () => {
        navigate('/printer-not-working'); // For PrinterNotWorkingPage
    };

    const handleClose = () => {
        navigate('/all-issues');
    };

    return (
        <div className="app-layout">
            {/* Sidebar stays fixed, merged with the header visually */}
            <Sidebar onSelect={handleSelect} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="main-content">
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/log-issue" element={<LogIssuePage />} />
                    <Route
                        path="/all-issues"
                        element={
                            <AllIssuePage
                                onViewClick={handleViewClick}
                                onView1Click={handleView1Click}
                                onView2Click={handleView2Click}
                            />
                        }
                    />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/internal-issue" element={<InternalIssuePage onClose={handleClose} />} />
                    <Route path="/network-issue" element={<NetworkIssue />} /> {/* Network Issue Route */}
                    <Route path="/printer-not-working" element={<PrinterNotWorking />} /> {/* Printer Not Working Route */}
                    <Route path="/" element={<DashboardPage />} />
                </Routes>
            </div>
        </div>
    );
};

const App = () => (
    <Router>
        <div className="app-wrapper">
            {/* Header stays fixed at the top */}
            <StaffHeader />
            {/* Main content with the sidebar */}
            <AppContent />
        </div>
    </Router>
);

export default App;






































/*import GenerateReport from './screens/adminGenerateReport';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
    <div className="container">
     <GenerateReport/>
    </div>
 </div>
  );
}
export default App;*/
