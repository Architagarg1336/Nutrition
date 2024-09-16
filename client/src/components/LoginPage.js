
// import React, { useState } from 'react';
// import './css/login.css'; // Ensure this path matches your project structure

// function LoginPage() {
//   const [rightPanelActive, setRightPanelActive] = useState(false);

//   const handleSignUpClick = () => {
//     setRightPanelActive(true);
//   };

//   const handleSignInClick = () => {
//     setRightPanelActive(false);
//   };

//   return (
//     <div className="login-page-main"> {/* Add a descriptive class name here */}
//       <div className={`form-container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
//         {/* Sign Up Form */}
//         <div className="form-section sign-up-section">
//           <form>
//             <h1>Create Account</h1>
//             <div className="social-icons">
//               <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
//               <a href="#" className="social-icon"><i className="fab fa-google-plus-g"></i></a>
//               <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//             <span>or use your email for registration</span>
//             <input type="text" placeholder="Name" />
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button type="button">Sign Up</button>
//           </form>
//         </div>

//         {/* Sign In Form */}
//         <div className="form-section sign-in-section">
//           <form>
//             <h1>Sign in</h1>
//             <div className="social-icons">
//               <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
//               <a href="#" className="social-icon"><i className="fab fa-google-plus-g"></i></a>
//               <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//             <span>or use your account</span>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <a href="#">Forgot your password?</a>
//             <button type="button">Sign In</button>
//           </form>
//         </div>

//         {/* Overlay Container */}
//         <div className="overlay-container">
//           <div className="overlay">
//             {/* Left Overlay Panel */}
//             <div className="overlay-panel overlay-left">
//               <h1>Welcome Back!</h1>
//               <p>To keep connected with us please login with your personal info</p>
//               <button className="ghost" onClick={handleSignInClick}>Sign In</button>
//             </div>
//             {/* Right Overlay Panel */}
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start your journey with us</p>
//               <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/api'; // Adjust path if needed
import './css/login.css'; // Ensure this path matches your project structure

function LoginPage() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess('Account created successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Email and Password are required.');
      return;
    }

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });
      setSuccess('Login successful!');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page-main"> {/* Add a descriptive class name here */}
      <div className={`form-container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Sign Up Form */}
        <div className="form-section sign-up-section">
          <form onSubmit={handleSubmitSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button type="submit">Sign Up</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-section sign-in-section">
          <form onSubmit={handleSubmitSignIn}>
            <h1>Sign in</h1>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>

        {/* Overlay Container */}
        <div className="overlay-container">
          <div className="overlay">
            {/* Left Overlay Panel */}
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>Sign In</button>
            </div>
            {/* Right Overlay Panel */}
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;