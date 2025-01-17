import React from 'react';
import './Home.css';  // Import the CSS file
import homeImage from './images/img2.jpg'; // Make sure this path is correct

function Home() {
  return (
    <div className="home-container">
      <div className="home-image">
        <img src={homeImage} alt="Financial illustration" />
      </div>
      <div className="home-text">
        <h1>Welcome to FundVerse!!</h1>
        <p>Your trusted platform for investment schemes and financial growth.
         Join us to explore various financial schemes tailored to your needs.</p>
      </div>
    </div>
  );
}

export default Home;
 