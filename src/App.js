import React from 'react';
import './App.css';
import HeadDepartment from './components/HeadDepartment';  // Import the routing component
import HODDashboard from './components/HODDashboard';
import LogIssueForm from './components/LogIssueFormFolder/LogIssueForm';
import ManageLogs from './components/ManageLogsFolder/ManageLogs';
function App() {
  return (
      <div className="App">
        <ManageLogs />
      </div>
   
  );
}
export default App;
