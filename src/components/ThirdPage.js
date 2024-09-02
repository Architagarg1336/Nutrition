// src/components/ThirdPage.js
import React from 'react';
import './ThirdPage.css'; // Import the CSS file specific to this component

function ThirdPage() {
  return (
    <div className="third-page">
      <h1 className="heading-thirdPage">Summary Drinks Fresh Drinks</h1>
      <div className="content-thirdPage">
        <div className="box-drinks">
          <img src="/images/drink1.svg" alt="Drink 1" className="box-image" />
          <p className="box-text">Healthy Grape Juice</p>
          <p className="box-description">A refreshing grape juice packed with antioxidants.</p>
          <button className="box-button">Learn More</button>
        </div>
        <div className="box-drinks">
          <img src="/images/drink2.svg" alt="Drink 2" className="box-image" />
          <p className="box-text">Orange Breeze</p>
          <p className="box-description">A zesty orange drink that invigorates and refreshes.</p>
          <button className="box-button">Learn More</button>
        </div>
        <div className="box-drinks">
          <img src="/images/drink3.svg" alt="Drink 3" className="box-image" />
          <p className="box-text">Fruity Frenzy Smoothie</p>
          <p className="box-description">A delicious smoothie combining various fruits for a burst of flavor.</p>
          <button className="box-button">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default ThirdPage;
