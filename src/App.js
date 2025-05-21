import React from "react";
import "./App.css";

import HeadDepartment from "./components/HeadDepartment"; // Import the routing component
import HODDashboard from "./components/HODDashboard";
import ManageLogs from "./components/ManageLogsFolder/ManageLogs";

import Notification from "./screens/Notification Page/Notification";

function App() {
  return (
    <div className="App">
      <HeadDepartment />
    </div>
  );
}
export default App;
