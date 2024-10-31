import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import HeadDepartment from './components/HeadDepartment';  // Import the routing component
import HODDashboard from './components/HODDashboard';
import LogIssueForm from './components/LogIssueFormFolder/LogIssueForm';

function App() {
  return (
    <BrowserRouter> {/* Wrap components with BrowserRouter */}
      <div className="App">
        <LogIssueForm />
      </div>
    </BrowserRouter>
  );
}

export default App;
