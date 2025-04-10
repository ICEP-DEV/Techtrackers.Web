import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../Logins/LoginsStyle/contact.css";
import Header from './Header'; // Import the Header component

const Contact = () => {
  return (
    <div>
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="content">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your name" id="name" name="name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your valid email address" id="email" name="email" required />
            </div>
            <div className="form-group">
              <textarea className="textareas" placeholder="Message" id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" className="contact-button">Submit</button>
          </form>
        <div className="contact-details">
            <div className="contact-item">
              <img src={require('../../Images/message.jpg')} alt="Logo 1" className="contact-image" />
              <div className="contact-message">
                <p>Chat to us<br/>Our friendly team is here to help: <span className="color-email">help@fixflow.com</span></p>
              </div>
            </div>

            <div className="contact-item">
              <img src={require('../../Images/location.jpg')} alt="Logo 2" className="contact-image" />
              <div className="contact-message">
                <p>Office location<br/>Soshanguve Campus, Building 10</p>
              </div>
            </div>

            <div className="contact-item">
              <img src={require('../../Images/phone.jpg')} alt="Logo 3" className="contact-image" />
              <div className="contact-message">
                <p>Call us<br/>012 985 9636<br/>Mon-Fri from 8am-4pm</p>
              </div>
            </div>
          </div>
      </div>
      <div className="footer">
            <span>© Copyright FixFlow All Rights Reserved</span>
      </div>
    </div>
  </div>
  );
};

export default Contact;