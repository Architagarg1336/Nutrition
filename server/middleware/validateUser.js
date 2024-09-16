exports.validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (req.path === '/register' && !name) {
    return res.status(400).json({ message: 'Please enter a name' });
  }
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }
  // Password strength check (minimum 6 characters)
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  next();
};