// SecondPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SecondPage.css'; // Import the CSS file specific to this component

function SecondPage() {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle click and navigate to TipsFirst
  const handleClick = () => {
    navigate('/tips'); // Navigate to the TipsFirst component
  };

  return (
    <div className="second-page">
      <div className="image-container">
        <img src="/images/Peach1.png" alt="Left Side" className="left-image" />
      </div>
      <div className="text-container">
        <h1>
          Care about Nutrition <br />
          For Your Health
        </h1>
        <p>
          A healthy diet is essential for maintaining overall well-being,
          providing the body with the nutrients it needs to function optimally.
          It includes a balanced mix of fruits, vegetables, whole grains, lean
          proteins, and healthy fats, which help support energy levels,
          strengthen the immune system, and reduce the risk of chronic diseases.
        </p>

        {/* Floating facts section */}
        <div className="facts-design">
          <div
            className="facts-design-inside"
            style={{ backgroundColor: '#ffbd59' }}
            onClick={() => handleClick("Include a variety of colorful fruits and veggies.")}
          >
            Include a variety of colorful fruits and veggies.
          </div>
          <div
            className="facts-design-inside"
            style={{ backgroundColor: '#a7cb52' }}
            onClick={() => handleClick("Drink plenty of water throughout the day.")}
          >
            Drink plenty of water throughout the day.
          </div>
          <div
            className="facts-design-inside"
            style={{ backgroundColor: '#9c7adf' }}
            onClick={() => handleClick("Opt for brown rice or whole wheat bread.")}
          >
            Opt for brown rice or whole wheat bread.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondPage;
