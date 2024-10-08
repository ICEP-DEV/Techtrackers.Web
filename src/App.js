import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import HODDashboard from './components/HODDashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle function to open/close the sidebar
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Header always on top */}
      <Header />

      {/* Sidebar with toggle, passing sidebar state and toggle function */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      {/* Dashboard content that shifts based on sidebar state */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <HODDashboard />
      </div>
    </div>
  );
}

export default App;
