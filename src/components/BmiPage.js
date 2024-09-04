import React, { useState } from 'react';
import './css/BmiPage.css'; // Assuming you have your CSS in this file

function BmiPage() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiResult, setBmiResult] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');
    const [bmiMessageColor, setBmiMessageColor] = useState(''); // State for message color

    const calculateBmi = () => {
        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);

        if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
            alert('Please enter valid height and weight!');
            return;
        }

        const bmi = weightInKg / (heightInMeters * heightInMeters);
        const bmiValue = bmi.toFixed(2);
        setBmiResult(bmiValue);

        // Determine BMI category, set the message, and set the color
        let message = '';
        let color = '';

        if (bmi < 18.5) {
            message = 'Underweight: Less than 18.5';
            color = 'light green';
        } else if (bmi >= 18.5 && bmi < 25) {
            message = 'Healthy weight: Between 18.5 and 24.9';
            color = 'green';
        } else if (bmi >= 25 && bmi < 30) {
            message = 'Overweight: Between 25 and 29.9';
            color = 'brown';
        } else if (bmi >= 30 && bmi < 40) {
            message = 'Obese: Between 30 and 39.9';
            color = 'orange';
        } else {
            message = 'Severely obese: 40 or more';
            color = 'red';
        }

        setBmiMessage(message);
        setBmiMessageColor(color); // Set the color state
    };

    return (
        <div className="bmi-checklist-container">
            <div className="bmi-input-form">
                <div className="bmi-input-field">
                    <label htmlFor="age" className="bmi-label">Age</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        className="bmi-input"
                        placeholder="enter Your Age" 

                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="bmi-input-field">
                    <label className="bmi-label">Gender</label>
                    <div className="bmi-gender-options" >
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="bmi-input-field">
                    <label htmlFor="height" className="bmi-label"   >Height (cm)</label>
                    <input
                        type="text"
                        id="height"
                        name="height"
                        className="bmi-input"
                        placeholder="enter Your height" 
                      
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div className="bmi-input-field">
                    <label htmlFor="weight" className="bmi-label">Weight (kg)</label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        className="bmi-input"
                        placeholder="enter Your weight" 

                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <button
                    id="calculate-bmi"
                    className="bmi-button"
                    onClick={calculateBmi}
                >
                    Calculate BMI
                </button>
                {bmiResult && (
                    <p id="bmi-result" className="bmi-result" style={{ color: bmiMessageColor }}>
                        Your BMI is: {bmiResult} - {bmiMessage}
                    </p>
                )}
            </div>
            <div className="bmi-checklist">
                <img src="./images/newBmiRange 1.svg" alt="BMI Range" />
            </div>
        </div>
    );
}

export default BmiPage;
