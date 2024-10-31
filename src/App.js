import React from 'react';
import './App.css';
import HeadDepartment from './components/HeadDepartment';  // Import the routing component
import HODDashboard from './components/HODDashboard';
import LogIssueForm from './components/LogIssueForm';
import AllIssues from './components/allIssues/AllIssues';

function App() {
  return (
    <div className="App">
      < AllIssues />
    </div>
  );
}

export default App;
