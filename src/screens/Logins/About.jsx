import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../Logins/LoginsStyle/about.css'; // Add a CSS file for styling

const About = () => {
  return (
    <div>
      <Header /> {/* Include Header component */}
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
                className="about-img animated-img"
              />
            </div>

            <div className="about-content">
              <h2>
                We Are All About Smarter And
                <br />
                Faster Solutions.
              </h2>
              <p>
                Welcome to TechTrackers Support, your dedicated partner in ensuring the smooth and efficient operation of your technology infrastructure. We specialize in providing expert technical assistance to businesses and institutions, addressing technical challenges swiftly and effectively.
                <br />
                <br />
                Our team consists of highly trained professionals, all working collaboratively to provide top-tier support. We understand the critical role that technology plays in your daily operations, and our mission is to deliver solutions that minimize downtime and maximize system performance.
                <br />
                <br />
                With a focus on reliability, responsiveness, and innovation, TechTrackers Support is here to keep your systems running seamlessly, so you can focus on what you do best.
                <br />
                <br />
                We are here to help you every step of the way.
              </p>

              <Link to="/contact">
                <button className="contact-Us">Contact us</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
