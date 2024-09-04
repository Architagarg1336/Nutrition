// // src/components/SecondPage.js
// import React from 'react';
// import './SecondPage.css'; // Import the CSS file specific to this component

// function SecondPage() {
//   return (
//     <div className="second-page">
//       <div className="image-container">
//         <img src="/images/Peach1.svg" alt="Left Side" className="left-image" />
//       </div>
//       <div className="text-container">
//         <h1>Care about Nutrition <br/>
//           For Your health
//         </h1>
//         <p>A healthy diet is essential for maintaining overall well-being, providing the body with the nutrients it needs to function optimally. It includes a balanced mix of fruits, vegetables, whole grains, lean proteins, and healthy fats, which help support energy levels, strengthen the immune system, and reduce the risk of chronic diseases. .</p>

//         <div className ="facts-design">
//           <div className='facts-design-inside' style={{ backgroundColor: '#ffbd59' }}>Include a variety of colorful fruits and vegies.</div>
//           <div  className='facts-design-inside' style={{ backgroundColor: '#a7cb52' }}>Drink plenty of water throughout the day</div>
//           <div  className='facts-design-inside' style={{ backgroundColor: '#9c7adf' }}> Opt for brown rice or whole wheat bread.</div>

//         </div>
       
//       </div>
//     </div>
//   );
// }

// export default SecondPage;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
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
          For Your health
        </h1>
        <p>
          A healthy diet is essential for maintaining overall well-being,
          providing the body with the nutrients it needs to function optimally.
          It includes a balanced mix of fruits, vegetables, whole grains, lean
          proteins, and healthy fats, which help support energy levels,
          strengthen the immune system, and reduce the risk of chronic diseases.
        </p>

        <div className="facts-design">
          <div
            className="facts-design-inside"
            style={{ backgroundColor: '#ffbd59' }}
            onClick={handleClick} // Add onClick event handler
          >
            Include a variety of colorful fruits and veggies.
          </div>
          <div
            className="facts-design-inside"
            style={{ backgroundColor: '#a7cb52' }}
            onClick={handleClick} // Add onClick event handler
          >
            Drink plenty of water throughout the day
          </div>
          <div
            className="facts-design-inside"
            style={{ backgroundColor: '#9c7adf' }}
            onClick={handleClick} // Add onClick event handler
          >
            Opt for brown rice or whole wheat bread.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondPage;
