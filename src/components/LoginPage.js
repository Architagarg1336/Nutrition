// import React, { useState } from 'react';
// import './login.css'; // Import the CSS file for styling

// function LoginPage() {
//   const [isRegister, setIsRegister] = useState(false); // State to toggle between login and register forms

//   // Function to toggle between forms
//   const toggleForm = () => {
//     setIsRegister((prev) => !prev);
//   };

//   return (
//     <div className={`wrapper ${isRegister ? 'active' : ''}`}>
//       <span className="rotate-bg"></span>
//       <span className="rotate-bg2"></span>

//       {/* Login Form */}
//       <div className="form-box login">
//         <h2 className="title animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
//         <form action="#">
//           <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
//             <input type="text" required />
//             <label>Username</label>
//             <i className="bx bxs-user"></i>
//           </div>

//           <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
//             <input type="password" required />
//             <label>Password</label>
//             <i className="bx bxs-lock-alt"></i>
//           </div>

//           <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>
//             Login
//           </button>

//           <div className="linkTxt animation" style={{ '--i': 5, '--j': 25 }}>
//             <p>
//               Don't have an account?{' '}
//               <button type="button" className="register-link" onClick={toggleForm}>
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* Login Information Section */}
//       <div className="info-text login">
//         <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>Welcome Back!</h2>
//         <p className="animation" style={{ '--i': 1, '--j': 21 }}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?
//         </p>
//       </div>

//       {/* Register Form */}
//       <div className="form-box register">
//         <h2 className="title animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
//         <form action="#">
//           <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
//             <input type="text" required />
//             <label>Username</label>
//             <i className="bx bxs-user"></i>
//           </div>

//           <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
//             <input type="email" required />
//             <label>Email</label>
//             <i className="bx bxs-envelope"></i>
//           </div>

//           <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
//             <input type="password" required />
//             <label>Password</label>
//             <i className="bx bxs-lock-alt"></i>
//           </div>

//           <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>
//             Sign Up
//           </button>

//           <div className="linkTxt animation" style={{ '--i': 22, '--j': 5 }}>
//             <p>
//               Already have an account?{' '}
//               <button type="button" className="login-link" onClick={toggleForm}>
//                 Login
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* Register Information Section */}
//       <div className="info-text register">
//         <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome Back!</h2>
//         <p className="animation" style={{ '--i': 18, '--j': 1 }}>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


// // src/components/LoginPage.js
// // import React from 'react';
// // import './login.css'; // Ensure you have a CSS file for styling if needed

// // function LoginPage() {
// //   return (
// //     <div className="login-page">
// //       <h2>Login Page</h2>
// //       <form>
// //         <div className="input-box">
// //           <input type="text" required placeholder="Username" />
// //         </div>
// //         <div className="input-box">
// //           <input type="password" required placeholder="Password" />
// //         </div>
// //         <button type="submit">Login</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default LoginPage;
// src/components/SignUpSignIn.js


import React, { useState } from 'react';
import './login.css'; // Ensure this path matches your project structure

function LoginPage() {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  return (
    <div className="login-page-main"> {/* Add a descriptive class name here */}
      <div className={`form-container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
        {/* Sign Up Form */}
        <div className="form-section sign-up-section">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-section sign-in-section">
          <form>
            <h1>Sign in</h1>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type="button">Sign In</button>
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
