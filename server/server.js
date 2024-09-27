const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });


// Check for required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'GEMINI_API_KEY', 'EMAIL_USER', 'EMAIL_PASS'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  lastUpdated: { type: Date, default: Date.now }
});
// const User = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);

const GEMINI_API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// New route to get user data
// Get user data
app.get('/api/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Function to send welcome email
const sendWelcomeEmail = async (name, email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Nourify!',
    html: `
      <h1>Welcome to Nourify, ${name}!</h1>
      <p>We're excited to have you on board. Get ready to start your journey towards better nutrition and health.</p>
      <p>If you have any questions, feel free to reach out to us.</p>
      <p>Best regards,<br>The Nourify Team</p>
    `
  };

  try {
    console.log('Attempting to send welcome email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    throw error;
  }
};

// Function to send newsletter subscription email
const sendNewsletterEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Nourify Newsletter',
    html: `
      <h1>Thank you for subscribing!</h1>
      <p>You are now subscribed to Nourify for news and updates.</p>
      <p>Stay tuned for exciting content and tips on nutrition and health.</p>
      <p>Best regards,<br>The Nourify Team</p>
    `
  };

  try {
    console.log('Attempting to send newsletter subscription email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Newsletter subscription email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending newsletter subscription email:', error);
    throw error;
  }
};

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
    await sendWelcomeEmail(name, email);
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

// Newsletter subscription route
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    await sendNewsletterEmail(email);
    res.json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error, subscription failed' });
  }
});

// Contact us route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await sendEmailToUser(name, email, message);
    await sendEmailToCompany(name, email, message);
    res.json({ message: 'Message received successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error, message sending failed' });
  }
});

// Function to send email to the user
const sendEmailToUser = async (name, email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Inquiry Received',
    html: `
      <h1>Hi ${name},</h1>
      <p>Thank you for reaching out to us!</p>
      <p>We have received your message:</p>
      <blockquote>${message}</blockquote>
      <p>Our team is looking into your query and will get back to you shortly.</p>
      <p>Best regards,<br>The Nourify Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Function to send email to the company
const sendEmailToCompany = async (name, email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'nourifybyad@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h1>New Inquiry from ${name}</h1>
      <p>Email: ${email}</p>
      <p>Message:</p>
      <blockquote>${message}</blockquote>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Route to generate meal plan
app.post('/generate-meal-plan', async (req, res) => {
  try {
    const { deficiencies, bmi, dietPreference, gender } = req.body;
    
    const prompt = `Generate a proper 4-day nutrition plan for a ${gender} with the following characteristics and keep in mind the weight goal according to the range of bmi:
BMI: ${bmi}
Diet Preference: ${dietPreference}
Deficiencies: ${deficiencies || 'None'}

Please provide the following information in a structured JSON format:

{
  "calories": number,
  "macronutrientsWithCalories": string,
  "mealPlan": {
    "Day 1": {
      "Breakfast": string,
      "Lunch": string,
      "Dinner": string
    },
    "Day 2": {
      "Breakfast": string,
      "Lunch": string,
      "Dinner": string
    },
    "Day 3": {
      "Breakfast": string,
      "Lunch": string,
      "Dinner": string
    },
    "Day 4": {
      "Breakfast": string,
      "Lunch": string,
      "Dinner": string
    }
  },
  "foodsForDeficiencies": string,
  "dailyWaterIntake": string,
  "nutritionalAdvice": string
}

Ensure each day's plan is unique and varied. Use new foods after refreshing or regenerating. All information should be evidence-based, tailored to the individual's needs, and vary across the 4 days. Each day should have different meals to provide variety and ensure adherence to the plan. If multiple deficiencies are provided, address each one in the plan and recommendations.`;

    console.log('Sending request to Gemini API...');
    const response = await axios.post(GEMINI_API_ENDPOINT, {
      contents: [{ parts: [{ text: prompt }] }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Received response from Gemini API');

    let generatedText = response.data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);

    // Parse the response data
    // Remove markdown code block syntax if present
    generatedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    let parsedData;
    try {
      parsedData = JSON.parse(generatedText);
      console.log('Successfully parsed JSON response');
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ error: 'Failed to parse the generated meal plan.' });
    }

    console.log('Parsed data:', parsedData);
    res.json(parsedData);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while generating the meal plan.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});