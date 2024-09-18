import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from './Header'; // Import the Header component

const Contact = () => {
  return (
    <div className="header-container">
      <Header />
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-content">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Enter your name" id="name" name="name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Enter your valid email address" id="email" name="email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Enter your message" id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="contact-button">Submit</button>
          </form>
          <div className="contact-details">
            <div className="contact-item">
              <img src={require('./message.jpg')} alt="Logo 1" className="contact-image" />
              <div className="contact-message">
                <p>Chat to us</p>
                <p>Our friendly team is here to help</p>
                <p className="color-email">hi@techtrackers.com</p>
              </div>
            </div>

            <div className="contact-item">
              <img src={require('./location.jpg')} alt="Logo 2" className="contact-image" />
              <div className="contact-message">
                <p>Office location</p>
                <p>Soshanguve Campus, Building 10</p>
              </div>
            </div>

            <div className="contact-item">
              <img src={require('./phone.jpg')} alt="Logo 3" className="contact-image" />
              <div className="contact-message">
                <p>Call us</p>
                <p>012 985 9636</p>
                <p>Mon-Fri from 8am-4pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;