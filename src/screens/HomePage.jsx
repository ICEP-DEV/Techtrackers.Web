import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';



const HomePage = () => {
  return( 
    <div className="home-container">
      <Header />
      <div className="first-tittle">
      <p>Your First Step to </p>
      <p>Seamless Resolution.</p>
      </div>
      <div className="second-tittle">
      <p>ensure that every technical is handled effortlessy. Keep your</p>
      <p>work environment running smoothly.</p>
      </div>
      <div className="home-button">
      <Link to="/"> 
        <button className="start-button">Get Started</button>
      </Link>
      </div>
    </div>
  );
};

export default HomePage;

