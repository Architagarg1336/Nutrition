// src/components/LandingPage.js
import React from 'react';
import './css/LandingPage.css'; // Import component-specific CSS
// import '../../public/images'

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="content">
        <div className="text-section">
          <h1>Healthy Inside,<br/> Happy Outside. 

          </h1>
          
          {/* <p>Your description goes here. Add more text as needed to explain your content.</p> */}
          <div className='button-group'>
          <button className='main-button'>Get started</button>
          <button className='main-button'>Explore More</button>
          </div>
          <div className = 'lemon-glass'>
            <img src = '/images/lemonGlass.svg' classname = 'lemon-glass-image-left'/>
          </div>
        </div>
        <div className="image-section">
          {/* You can add an image here */}
          <img src="/images/FinalPlate.svg" alt="Right Side" className="right-image" />
          
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
