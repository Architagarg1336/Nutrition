const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

app.post('/generate-meal-plan', async (req, res) => {
  try {
    const { deficiencies, bmi, dietPreference, gender } = req.body;
    
    const prompt = `Generate a personalized 4-day nutrition plan for a ${gender} with the following characteristics:
BMI: ${bmi}
Diet Preference: ${dietPreference}
Deficiencies: ${deficiencies || 'None'}

Please provide the following information in a structured format. Ensure each day's plan is unique and varied and also use new food after refreshing or regenerating:

1. Daily Calorie Needs: [Provide a specific number]
   Macronutrient Breakdown:
   - Protein: [X]g ([Y]% of total calories)
   - Carbohydrates: [X]g ([Y]% of total calories)
   - Fats: [X]g ([Y]% of total calories)

2. 4-Day Meal Plan:
   For each day (Day 1 to Day 4), provide:
   a. Breakfast: [Meal description] (Calories: [X], Protein: [X]g, Carbs: [X]g, Fat: [X]g)
      Recipe: [Brief recipe or preparation instructions]
      \n
   b. Lunch: [Meal description] (Calories: [X], Protein: [X]g, Carbs: [X]g, Fat: [X]g)
      Recipe: [Brief recipe or preparation instructions]
      \n

   c. Dinner: [Meal description] (Calories: [X], Protein: [X]g, Carbs: [X]g, Fat: [X]g)
      Recipe: [Brief recipe or preparation instructions]

   Ensure that each day's total calories and macronutrients align with the daily needs specified in section 1.

3. Foods for Deficiencies: [List specific foods that address the mentioned deficiencies, or state 'No specific recommendations' if no deficiencies were mentioned]

4. Daily Water Intake: [Provide a specific recommendation in liters]

5. Nutritional Advice: [Provide 3-5 bullet points of general nutritional advice based on the person's characteristics]

Please ensure all information is evidence-based, tailored to the individual's needs, and varies across the 4 days. Each day should have different meals and snacks to provide variety and ensure adherence to the plan.`;

    const response = await axios.post(GEMINI_API_ENDPOINT, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;
    
    const parsedData = parseGeneratedText(generatedText);
    
    res.json(parsedData);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating the meal plan.' });
  }
});

function parseGeneratedText(text) {
  const sections = text.split(/\d+\.\s/).filter(Boolean);
  
  const cleanText = (str) => str.replace(/[\*\n]/g, ' ').replace(/\s+/g, ' ').trim();

  const macronutrientsWithCalories = cleanText(`${sections[0]} ${sections[1]}`);

  const parseMealPlan = (mealPlanText) => {
    return mealPlanText.split(/Day \d+:/).filter(Boolean).map(day => {
      return day.split(/[a-f]\.\s/).filter(Boolean).map(meal => cleanText(meal)).join('\n');
    }).join('\n\n');
  };

  const mealPlan = parseMealPlan(sections[2]);
  const foodsForDeficiencies = cleanText(sections[3]);
  const dailyWaterIntake = cleanText(sections[4]);
  const nutritionalAdvice = cleanText(sections[5]);

  return {
    macronutrientsWithCalories,
    mealPlan,
    foodsForDeficiencies,
    dailyWaterIntake,
    nutritionalAdvice
  };
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});