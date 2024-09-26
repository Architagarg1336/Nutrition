import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    deficiencies: '',
    bmi: '',
    gender: '',
    dietPreference: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const generateMealPlan = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/generate-meal-plan', formData);
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (mealPlan) {
      const cards = document.querySelectorAll('.meal-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  }, [mealPlan]);

  const dayGradients = [
    'linear-gradient(135deg, #43a047 0%, #1de9b6 100%)',
    'linear-gradient(135deg, #9c27b0 0%, #e1bee7 100%)',
    'linear-gradient(135deg, #ff9800 0%, #ffeb3b 100%)',
    'linear-gradient(135deg, #3f51b5 0%, #03a9f4 100%)'
  ];

  const renderMealContent = (dayPlan, mealType) => {
    if (!dayPlan) return 'No meal plan available';
    const mealContent = dayPlan.split(`${mealType}:`)[1];
    if (!mealContent) return `No ${mealType.toLowerCase()} plan available`;
    const nextMeal = mealContent.split(new RegExp(`(Lunch:|Dinner:|Day ${parseInt(dayPlan.split(' ')[1]) + 1}:)`))[0];
    return nextMeal.trim();
  };

  return (
    <div className="min-h-screen bg-[#e8f5e9] p-8 mt-20 relative overflow-hidden w-full">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none w-full">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-300 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-300 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-yellow-300 rounded-full filter blur-xl animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Meal Planner</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deficiencies" className="block text-sm font-medium text-gray-700 mb-1">
                Deficiencies (if any)
              </label>
              <input
                id="deficiencies"
                className="w-full p-3 bg-[#f1f8e9] border border-[#c5e1a5] rounded-md"
                placeholder="Enter your Deficiencies"
                name="deficiencies"
                value={formData.deficiencies}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 mb-1">
                BMI
              </label>
              <input
                id="bmi"
                className="w-full p-3 bg-[#f1f8e9] border border-[#c5e1a5] rounded-md"
                placeholder="Enter your BMI"
                type="number"
                name="bmi"
                value={formData.bmi}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              className="w-full p-3 bg-[#f1f8e9] border border-[#c5e1a5] rounded-md"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Choose your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 mb-1">
              Diet Preference
            </label>
            <select
              id="dietPreference"
              className="w-full p-3 bg-[#f1f8e9] border border-[#c5e1a5] rounded-md"
              name="dietPreference"
              value={formData.dietPreference}
              onChange={handleInputChange}
            >
              <option value="">Choose what type of food you eat</option>
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          <button 
            className={`w-full p-3 rounded-md text-white font-semibold transition-colors ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={generateMealPlan}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {mealPlan && mealPlan.mealPlan && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealPlan.mealPlan.split('Day').filter(Boolean).map((day, index) => {
              const dayNumber = index + 1;
              const dayPlan = `Day ${day.trim()}`;
              return (
                <div 
                  key={index}
                  className="meal-card rounded-lg p-6 text-white shadow-lg opacity-0 transform translate-y-4 transition-all duration-500 ease-out relative overflow-hidden"
                  style={{ background: dayGradients[index % dayGradients.length] }}
                >
                  <div className="absolute inset-0 bg-white opacity-10 animate-wave"></div>
                  <h2 className="text-2xl font-bold mb-4 relative z-10">Day {dayNumber}</h2>
                  <p className="mb-2 relative z-10">Calories: {mealPlan.calories || 'N/A'}</p>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">Breakfast</h3>
                  <p className="mb-4 relative z-10">{renderMealContent(dayPlan, 'Breakfast')}</p>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">Lunch</h3>
                  <p className="mb-4 relative z-10">{renderMealContent(dayPlan, 'Lunch')}</p>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">Dinner</h3>
                  <p className="relative z-10">{renderMealContent(dayPlan, 'Dinner')}</p>
                </div>
              );
            })}
          </div>
        )}

        {mealPlan && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8 relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">Macronutrients and Calories</h3>
                <p>{mealPlan.macronutrientsWithCalories || 'Information not available'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">Foods for Deficiencies</h3>
                <p>{mealPlan.foodsForDeficiencies || 'Information not available'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">Daily Water Intake</h3>
                <p>{mealPlan.dailyWaterIntake || 'Information not available'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">Nutritional Advice</h3>
                <p>{mealPlan.nutritionalAdvice || 'Information not available'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;