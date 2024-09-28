import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './screens/HomePage';
import ForgotPassword from './screens/ForgotPassword';
import Login from './screens/Login';
import About from './screens/About';
import Service from './screens/Service';
import Contact from './screens/Contact';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Use this instead of '../node_modules'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/service" element={<Service />} />
      <Route exact path='/about' element={<About />} />
        <Route exact path='/homePage' element={<HomePage />} />
        <Route exact path='/forgotPassword' element={<ForgotPassword />} />
        <Route exact path='/' element={<Login />} />
        <Route exact path='/contact' element={<Contact />}  />
        
      </Routes>
    </Router>
  );
}

export default App;