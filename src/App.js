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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/service" element={<Service />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/homePage' element={<HomePage />} />
        <Route exact path='/forgotPassword' element={<ForgotPassword />} />
        <Route exact path='/signIn' element={<SignIn />} />
        <Route exact path='/' element={<Login />} />
        <Route exact path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
