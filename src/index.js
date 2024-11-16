import React from 'react';

import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
 //import App from './App';


//import TechnicianNotifications from './components/Notifications/TechnicianNotifications';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TechRatings.css';
//import WelcomeTechnician from './screens/TechDashBoard1/WelcomeTechnician';
import RoutesComponent from "./components/All Issue and View Page/RoutesComponent";
//import CollabMain from './components/CollaborationRequest/CollabMain';

import "@fortawesome/fontawesome-free/css/all.min.css";

import SideBarNavigation from './screens/Navigation/SideBarNavigation';
import TechnicianNotifications from './components/CollaborationRequest/IssueDetailsCollaburationRequest.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <SideBarNavigation/>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
