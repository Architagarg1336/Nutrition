import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/Button';
import { ScrollArea } from './ui/ScrollArea';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [formData, setFormData] = useState({
    deficiencies: '',
    bmi: '',
    gender: 'female',
    dietPreference: 'veg'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const generateMealPlan = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-meal-plan', formData);
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  const formatMealPlan = (dayPlan) => {
    return dayPlan
      .replace(/(Breakfast|Lunch|Dinner)/g, '<b>$1</b>')
      .replace(/(Lunch|Dinner)/g, '<br/><b>$1</b>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 mt-20">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <button 
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold">Meal Planner</h1>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-white p-4 shadow-md transition-all duration-300 ease-in-out
                          ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} 
                          md:relative md:ml-0 md:w-64 absolute inset-y-0 left-0 z-30`}>
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li><Button variant="ghost" className="w-full justify-start">Profile</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Previous Chats</Button></li>
            <li><Button variant="ghost" className="w-full justify-start">Logout</Button></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-3xl mx-auto">
            {/* Input Form */}
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-2xl font-bold">Generate Your Meal Plan</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input 
                    placeholder="Deficiencies (if any)" 
                    name="deficiencies"
                    value={formData.deficiencies}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="BMI" 
                    type="number"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleInputChange}
                  />
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      Male
                    </label>
                  </div>
                  <Select 
                    name="dietPreference"
                    value={formData.dietPreference}
                    onChange={handleInputChange}
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </Select>
                  <Button onClick={generateMealPlan} className="w-full">Generate Now</Button>
                </div>
              </CardContent>
            </Card>

            {/* Meal Plan Display */}
            {mealPlan && (
              <>
                {/* Day-wise Meal Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {mealPlan.mealPlan.split('\n\n').filter(day => day.trim() !== '').map((dayPlan, index) => (
                    <Card key={index} className="h-64">
                      <CardHeader>
                        <h3 className="text-lg font-semibold">Day {index + 1} Meal Plan</h3>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <p dangerouslySetInnerHTML={{ __html: formatMealPlan(dayPlan) }}></p>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Additional Information Card */}
                <Card className="w-full mb-4">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Additional Information</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Macronutrients and Calories:</h4>
                        <p>{mealPlan.macronutrientsWithCalories}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Daily Water Intake:</h4>
                        <p>{mealPlan.dailyWaterIntake}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Foods for Deficiencies:</h4>
                        <p>{mealPlan.foodsForDeficiencies}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Nutritional Advice:</h4>
                        <p>{mealPlan.nutritionalAdvice}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;