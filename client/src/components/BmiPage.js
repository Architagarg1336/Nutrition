import React, { useState } from 'react';
import './css/BmiPage.css';

function BmiPage() {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [bmiResult, setBmiResult] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');
    const [bmiMessageColor, setBmiMessageColor] = useState('');

    const calculateBmi = () => {
        let heightInMeters;
        let weightInKg;

        if (heightUnit === 'cm') {
            heightInMeters = parseFloat(height) / 100;
        } else {
            heightInMeters = (parseFloat(feet) * 30.48 + parseFloat(inches) * 2.54) / 100;
        }

        if (weightUnit === 'kg') {
            weightInKg = parseFloat(weight);
        } else {
            weightInKg = parseFloat(weight) * 0.453592;
        }

        if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
            alert('Please enter valid height and weight!');
            return;
        }

        const bmi = weightInKg / (heightInMeters * heightInMeters);
        const bmiValue = bmi.toFixed(2);
        setBmiResult(bmiValue);

        let message = '';
        let color = '';

        if (bmi < 18.5) {
            message = 'Underweight';
            color = '#64B5F6';  // Light Blue
        } else if (bmi >= 18.5 && bmi < 25) {
            message = 'Healthy weight';
            color = '#81C784';  // Light Green
        } else if (bmi >= 25 && bmi < 30) {
            message = 'Overweight';
            color = '#FFD54F';  // Light Amber
        } else if (bmi >= 30 && bmi < 40) {
            message = 'Obese';
            color = '#FF8A65';  // Light Orange
        } else {
            message = 'Severely obese';
            color = '#E57373';  // Light Red
        }

        setBmiMessage(message);
        setBmiMessageColor(color);
    };

    return (
        <div className="bmi-checklist-container">
            <div className="bmi-input-form">
                <h2 className="bmi-title">BMI Calculator</h2>
                <div className="bmi-input-field">
                    <label htmlFor="age" className="bmi-label">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        className="bmi-input"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="bmi-input-field">
                    <label className="bmi-label">Gender</label>
                    <div className="bmi-gender-options">
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
                    <label htmlFor="height" className="bmi-label">Height</label>
                    <div className="bmi-unit-toggle">
                        <button 
                            className={`bmi-unit-button ${heightUnit === 'cm' ? 'active' : ''}`}
                            onClick={() => setHeightUnit('cm')}
                        >
                            cm
                        </button>
                        <button 
                            className={`bmi-unit-button ${heightUnit === 'ft' ? 'active' : ''}`}
                            onClick={() => setHeightUnit('ft')}
                        >
                            ft/in
                        </button>
                    </div>
                    {heightUnit === 'cm' ? (
                        <input
                            type="number"
                            id="height"
                            name="height"
                            className="bmi-input"
                            placeholder="Enter your height in cm"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    ) : (
                        <div className="bmi-input-group">
                            <input
                                type="number"
                                id="feet"
                                name="feet"
                                className="bmi-input"
                                placeholder="Feet"
                                value={feet}
                                onChange={(e) => setFeet(e.target.value)}
                            />
                            <input
                                type="number"
                                id="inches"
                                name="inches"
                                className="bmi-input"
                                placeholder="Inches"
                                value={inches}
                                onChange={(e) => setInches(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                <div className="bmi-input-field">
                    <label htmlFor="weight" className="bmi-label">Weight</label>
                    <div className="bmi-unit-toggle">
                        <button 
                            className={`bmi-unit-button ${weightUnit === 'kg' ? 'active' : ''}`}
                            onClick={() => setWeightUnit('kg')}
                        >
                            kg
                        </button>
                        <button 
                            className={`bmi-unit-button ${weightUnit === 'lbs' ? 'active' : ''}`}
                            onClick={() => setWeightUnit('lbs')}
                        >
                            lbs
                        </button>
                    </div>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        className="bmi-input"
                        placeholder={`Enter your weight in ${weightUnit}`}
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
                    <div className="bmi-result" style={{ backgroundColor: bmiMessageColor }}>
                        <p>Your BMI is: <strong>{bmiResult}</strong></p>
                        <p>Category: <strong>{bmiMessage}</strong></p>
                    </div>
                )}
            </div>
            <div className="bmi-checklist">
                <img src="./images/newBmiRange 1.svg" alt="BMI Range" />
            </div>
        </div>
    );
}

export default BmiPage;