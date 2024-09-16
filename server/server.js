// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// app.post('/generate-meal-plan', async (req, res) => {
//   try {
//     const { deficiencies, bmi, dietPreference, gender } = req.body;
    
//     const prompt = `Generate a personalized 4-day nutrition plan for a ${gender} with the following characteristics:
// BMI: ${bmi}
// Diet Preference: ${dietPreference}
// Deficiencies: ${deficiencies || 'None'}

// Please provide the following information in a structured format. Ensure each day's plan is unique and varied and also use new food after refreshing or regenerating:

// 1. Daily Calorie Needs: [Provide a specific number]
//    Macronutrient Breakdown:
//    - Protein: [X]g ([Y]% of total calories)
//    - Carbohydrates: [X]g ([Y]% of total calories)
//    - Fats: [X]g ([Y]% of total calories)

// 2. 4-Day Meal Plan:
//    For each day (Day 1 to Day 4), provide:
//    a. Breakfast: [Meal description] (Calories: [X], Protein: [X]g, Carbs: [X]g, Fat: [X]g)
//       Recipe: [Brief recipe or preparation instructions]
//       \n
//    b. Lunch: [Meal description] (Calories: [X], Protein: [X]g, Carbs: [X]g, Fat: [X]g)
//       Recipe: [Brief recipe or preparation instructions]
//       \n

//    c. Dinner: [Meal description] (Calories: [X], Protein: [X]g, Carbs: [X]g, Fat: [X]g)
//       Recipe: [Brief recipe or preparation instructions]

//    Ensure that each day's total calories and macronutrients align with the daily needs specified in section 1.

// 3. Foods for Deficiencies: [List specific foods that address the mentioned deficiencies, or state 'No specific recommendations' if no deficiencies were mentioned]

// 4. Daily Water Intake: [Provide a specific recommendation in liters]

// 5. Nutritional Advice: [Provide 3-5 bullet points of general nutritional advice based on the person's characteristics]

// Please ensure all information is evidence-based, tailored to the individual's needs, and varies across the 4 days. Each day should have different meals and snacks to provide variety and ensure adherence to the plan.`;

//     const response = await axios.post(GEMINI_API_ENDPOINT, {
//       contents: [{ parts: [{ text: prompt }] }]
//     }, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     const generatedText = response.data.candidates[0].content.parts[0].text;
    
//     const parsedData = parseGeneratedText(generatedText);
    
//     res.json(parsedData);
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: 'An error occurred while generating the meal plan.' });
//   }
// });

// function parseGeneratedText(text) {
//   const sections = text.split(/\d+\.\s/).filter(Boolean);
  
//   const cleanText = (str) => str.replace(/[\*\n]/g, ' ').replace(/\s+/g, ' ').trim();

//   const macronutrientsWithCalories = cleanText(`${sections[0]} ${sections[1]}`);

//   const parseMealPlan = (mealPlanText) => {
//     return mealPlanText.split(/Day \d+:/).filter(Boolean).map(day => {
//       return day.split(/[a-f]\.\s/).filter(Boolean).map(meal => cleanText(meal)).join('\n');
//     }).join('\n\n');
//   };

//   const mealPlan = parseMealPlan(sections[2]);
//   const foodsForDeficiencies = cleanText(sections[3]);
//   const dailyWaterIntake = cleanText(sections[4]);
//   const nutritionalAdvice = cleanText(sections[5]);

//   return {
//     macronutrientsWithCalories,
//     mealPlan,
//     foodsForDeficiencies,
//     dailyWaterIntake,
//     nutritionalAdvice
//   };
// }

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in the environment variables');
  process.exit(1);
}

if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not defined in the environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// ... rest of your code remains the same

// User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

// Validation middleware
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (req.path === '/register' && !name) {
    return res.status(400).json({ message: 'Please enter a name' });
  }
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  next();
};

// Register Route
app.post('/api/auth/register', validateUser, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error, registration failed' });
  }
});

// Login Route
app.post('/api/auth/login', validateUser, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error, login failed' });
  }
});

// Route to generate meal plan
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

    // Request to the external API
    const response = await axios.post(GEMINI_API_ENDPOINT, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const generatedText = response.data.candidates[0].content.parts[0].text;

    // Parse the response data
    const parsedData = parseGeneratedText(generatedText);

    res.json(parsedData);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating the meal plan.' });
  }
});

// Function to parse the generated text into structured data
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});