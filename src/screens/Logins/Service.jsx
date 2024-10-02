import React from 'react';
import { Link } from 'react-router-dom'; 
import Header from './Header'; 
import "../Logins/LoginsStyle/service.css";


const Service = () => {
  return (
    
    <div>
       <Header />
       <div className="service-container">
        <h1 className="under">SERVICES</h1>
      <p className="centered-text">FixFlow offers a comprehensive suite of services designed to streamline technical support across your</p>
      <p className="centered-text">organization. From issue logging to resolution tracking, our platform ensures that every technical challage</p>
      <p className="centered-text">is handled efficiently.</p>

      <div className="images-container">
      <div className="image-item">
          <img src={require('../../Images/service1.jpg')} alt="Service 1" className="service-image" />
          <p className="image-caption">Issue Logging and Reporting</p>
          <p className="centered-caption">Easily log and report technical issues</p>
          <p className="centered-caption">through a user-friendly form.</p>
         
        </div>
        <div className="image-item">
          <img src={require('../../Images/service2.jpg')} alt="Service 2" className="service-image" />
          <p className="image-caption">Technician Assignment</p>
          <p className="centered-caption">Get the right technicians based on their</p>
          <p className="centered-caption">expertise.</p>
          
        </div>
        <div className="image-item">
          <img src={require('../../Images/service3.jpg')} alt="Service 3" className="service-image" />
          <p className="image-caption">Real-Time Issue Tracking</p>
          <p className="centered-caption">Track the status of reported</p>
          <p className="centered-caption">issue in real-time, with updates</p>
          <p className="centered-caption">provided at every stage of the</p>
          <p className="centered-caption">resolution process.</p>
        </div>
        <div className="image-item">
          <img src={require('../../Images/service4.jpg')} alt="Service 4" className="service-image" />
          <p className="image-caption">Collaborations</p>
          <p className="centered-caption">collaborate in real-time, sharing insights and</p>
          <p className="centered-caption">working together to resolve issues more</p>
          <p className="centered-caption">efficiently.</p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Service;