import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './screens/Logins/SignIn';
import HomePage from './screens/Logins/HomePage';
import ForgotPassword from './screens/Logins/ForgotPassword';
import Login from './screens/Logins/Login'; // Keep one of the Login imports
import About from './screens/Logins/About';
import Service from './screens/Logins/Service';
import Contact from './screens/Logins/Contact';
import 'bootstrap/dist/css/bootstrap.min.css'; // Use this instead of '../node_modules'
import StaffPageDisplay from './screens/StaffPageDisplay';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/service" element={<Service />} />
        <Route path='/about' element={<About />} />
        <Route  path='/' element={<HomePage />} />
        <Route  path='/forgotPassword' element={<ForgotPassword />} />
        <Route  path='/signIn' element={<SignIn />} />
        <Route  path='/login' element={<Login />} />
        <Route  path='/contact' element={<Contact />} />
        <Route path="/staffpagedisplay" element={<StaffPageDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
