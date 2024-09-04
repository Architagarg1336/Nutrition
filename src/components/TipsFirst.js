import React from 'react';
import './css/TipsFirst.css';

const TipsFirst = () => {
  return (
    <div className="wellness-tips-container">
      <h1 className="wellness-title">4 Essential Wellness Tips</h1>
      
      <div className="wellness-tip-block wellness-nutrition">
        <div className="wellness-tip-text">
          <h2 className="wellness-tip-title">BALANCED <span className="wellness-highlight">NUTRITION</span></h2>
          <p className="wellness-tip-detail"><strong>Fruits & Vegetables:</strong> Aim for half your plate to be fruits and veggies.</p>
          <p className="wellness-tip-detail"><strong>Whole Grains:</strong> Choose whole grains over refined grains.</p>
        </div>
        <div className="wellness-tip-image">
          <img src="./images/Tip1.svg" alt="Balanced Nutrition" className="wellness-image" />
        </div>


      </div>

      <div className="wellness-tip-block wellness-exercise">
        <div className="wellness-tip-text">
          <h2 className="wellness-tip-title">REGULAR <span className="wellness-highlight">EXERCISE</span></h2>
          <p className="wellness-tip-detail"><strong>Cardio:</strong> Aim for 150 minutes of moderate aerobic activity per week.</p>
          <p className="wellness-tip-detail"><strong>Strength Training:</strong> Include muscle-strengthening activities on 2 or more days a week.</p>
        </div>
        <div className="wellness-tip-image">
          <img src="./images/Tip2.svg" alt="Regular Exercise" className="wellness-image" />
        </div>
      </div>

      <div className="wellness-tip-block wellness-mental-wellbeing">
        <div className="wellness-tip-text">
          <h2 className="wellness-tip-title">MENTAL <span className="wellness-highlight">WELL-BEING</span></h2>
          <p className="wellness-tip-detail"><strong>Mindfulness:</strong> Schedule annual physical exams.</p>
          <p className="wellness-tip-detail"><strong>Vaccinations:</strong> Stay up to date with recommended vaccines.</p>
        </div>
        <div className="wellness-tip-image">
          <img src="./images/Tip3.svg" alt="Mental Well-being" className="wellness-image" />
        </div>
      </div>

      <div className="wellness-tip-block wellness-healthy-habits">
        <div className="wellness-tip-text">
          <h2 className="wellness-tip-title">HEALTHY <span className="wellness-highlight">HABITS</span></h2>
          <p className="wellness-tip-detail"><strong>Regular Body Checkups: </strong>Schedule regular health checkups to proactively monitor and maintain your well-being.</p>
          <p className="wellness-tip-detail"><strong>Healthy Weight:</strong> Maintain a BMI within the healthy range.</p>
        </div>
        <div className="wellness-tip-image">
          <img src="./images/Tip4.svg" alt="Healthy Habits" className="wellness-image" />
        </div>
      </div>

    </div>
  );
}

export default TipsFirst;
