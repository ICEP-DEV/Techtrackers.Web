import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../../LoginsStyle/about.css'; // Add a CSS file for styling

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-container">
      <div className="about-section">
        <div className="about-header">
          <h1>ABOUT US</h1>
          <div className="underline"></div>
        </div>

        <div className="about-content-wrapper">
          <div className="about-picture">
            <img
              src={require('../../Images/aboutPicture.jpg')}
              alt="Welcome"
              className="about-img"
            />
          </div>

          <div className="about-content">
            <h2>We Are All About Smarter And
              <br/>Faster Solutions.
            </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              It is a long established fact that a reader will be distracted. 
              Lorem ipsum dolor sit amet consectetur. 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              It is a long established fact that a reader will be distracted.
            </p>
            
            <Link to="/contact">
              <button className="contact-button">Contact us</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default About;
