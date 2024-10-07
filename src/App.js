import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { useState } from "react";
import Sidebar from "./components/Sidebar.js"; // Import the Sidebar component
import Header from "./components/Header"; // Import the Header component

import "./App.css"; // Import global styles, optional
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {/* Pass the toggleSidebar function and the state to Sidebar */}
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header />
      
      
      {/* Main content area, adjusted with conditional margin for the sidebar */}
      <div className={`main-content ${isSidebarOpen ? "shifted" : "full"}`}>
        <header>
          <h1>Welcome, HOD!</h1>
        </header>

       {/* <section className="dashboard-section">
          <div className="dashboard-cards">
           
            <div className="card">All Issues: 48</div>
            <div className="card">Open Issues: 16</div>
            <div className="card">Closed Issues: 48</div>
            <div className="card">Human Resources Department</div>
          </div>

          <div className="charts-section">
            
            <div className="chart">Average Resolution Time Chart</div>
            <div className="chart">Issue Summary Chart</div>
          </div>
        </section>*/}
      </div> 
    </div>
  );
}

export default App;
