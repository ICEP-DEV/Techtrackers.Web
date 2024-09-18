import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from './Header'; // Import the Header component

const About = () => {
  return (
    <div className="about-container">
      <Header />

      <div className='whole-about'>
      <div className="about-header">
      <h1 className="underline">ABOUT US</h1>
        </div>
        <div className="about-picture">
          <img src={require('./aboutPicture.jpg')} alt="welcome picture" height={400}/>
        </div>
        <div className="about-content">
        <div className="about-content1">
        <p>We Are All About Smarter And .</p>
        <p>Faster Solutions</p>
        </div>
        <div className="about-content2">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. It is</p>
        <p>long established fact that a reader will be distracted.Lorem</p>
        <p>ipsum dolor sit amet consectetur Lorem ipsum dolor sit.Lorem</p> 
        <p>ipsum dolor sit amet consectetur adipisicing elit. It is a long</p> 
        <p>established fact that.</p>
        </div>
        <Link to="/"> {/* Link to the Home page */}
          <button className="contact-button">Contact us</button> {/* Button to navigate back to the Home page */}
        </Link>
        </div>
        </div>
    </div>
  );
};
export default About;