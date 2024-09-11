//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Login from './screens/Login';
import React from 'react';
// import TechDashboard from './components/TechDashboard';
import './App.css';
import StaffHeader from './components/StaffHeader';
import IssueTracker from './components/IssueTracker'; // Adjust the path as needed



function App() {
  
  return (
        <div className="App">
          <StaffHeader />
          <IssueTracker/>
       {/* <TechDashboard />  */}
     
        </div>
 
       
    //<Router>
      //<Routes>
      //<Route exact path='/' element={<Login />} />
      /* <Route exact path='/StaffHeader' element={<StaffHeader/>} /> */
     // </Routes>
    //</Router>
  );
}
export default App;