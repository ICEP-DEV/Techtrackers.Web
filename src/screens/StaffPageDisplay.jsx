import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainContent from '../screens/MainContent';
import IssueDetails from '../screens/IssueDetails';
import LiveChat from '../screens/LiveChat';
import Sidebar from '../components/Sidebar';
import DashboardPage from '../pages/DashboardPage';
//import AllIssuePage from './pages/AllIssuePage';
import NotificationsPage from '../pages/NotificationsPage';
import LogIssuePage from '../pages/LogIssuePage';
import InternalIssuePage from '../pages/InternalIssuePage';
import NetworkIssue from '../pages/NetworkIssue';
import PrinterNotWorking from '../pages/PrinterNotWorking';
import StaffHeader from '../components/StaffHeader';
import '../style/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppContent = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current path
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Handlers for navigation
    const handleSelect = (page) => {
        navigate(`/${page}`);
    };

    const handleViewClick = () => {
        navigate('/issue-details');
    };

    const handleView1Click = () => {
        navigate('/network-issue');
    };

    const handleView2Click = () => {
        navigate('/printer-not-working');
    };

    const handleClose = () => {
        navigate('/all-issues');
    };

    // Open and close chat functions
    const handleOpenChat = () => {
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };

    const handleSelectIssue = (issue) => {
        setSelectedIssue(issue);
    };

    return (
        <div className="app-layout">
            {/* Sidebar stays fixed, merged with the header visually */}
            <Sidebar onSelect={handleSelect} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <div className="main-content">
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/log-issue" element={<LogIssuePage />} />
                    <Route/>
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/internal-issue" element={<InternalIssuePage onClose={handleClose} />} />
                    <Route path="/network-issue" element={<NetworkIssue />} />
                    <Route path="/printer-not-working" element={<PrinterNotWorking />} />
                    <Route path="/" element={<DashboardPage />} />
                </Routes>

                {/* Conditional rendering for MainContent and IssueDetails */}
                <div className="main-container">
                    {/* Only show MainContent if we are on the /all-issues route */}
                    {location.pathname === '/all-issues' && !selectedIssue && (
                        <MainContent onSelectIssue={handleSelectIssue} onOpenChat={handleOpenChat} />
                    )}

                    {/* Show IssueDetails when an issue is selected */}
                    {selectedIssue && (
                        <IssueDetails
                            issue={selectedIssue}
                            onClose={() => setSelectedIssue(null)}
                            onOpenChat={handleOpenChat}
                        />
                    )}
                </div>
            </div>

            {/* Render LiveChat if chat is open */}
            {isChatOpen && <LiveChat onClose={handleCloseChat} />}
        </div>
    );
};

const SideBarDisplay = () => (
    <Router>
        <div className="app-wrapper">
            {/* Header stays fixed at the top */}
            <StaffHeader />
            {/* Main content with the sidebar */}
            <AppContent />
        </div>
    </Router>
);

export default SideBarDisplay;



