import React from 'react';
import './App.css';
import HeadDepartment from './components/HeadDepartment';  // Import the routing component
import HODDashboard from './components/HODDashboard';
import LogIssueForm from './components/LogIssueForm';
function App() {
  return (
    <div className="App">
      < LogIssueForm />
    </div>
  );
}

export default App;
