import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import "../../LoginsStyle/homepage.css";
//import './HomePage.css'; // Make sure to import the CSS file

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
      
      <div className="hero-content">
        <div className="first-title">
          <p>Your First Step to Seamless
            <br/>Resolutions.
          </p>
        </div>
        <div className="second-title">
          <p>Ensure that every technical problem is handled effortlessly. Keep your work
            <br/>environment running smoothly.
          </p>
        </div>
        <div className="home-button">
          <Link to="/login">
            <button className="start-button">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default HomePage;
