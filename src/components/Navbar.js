// // src/components/Navbar.js
// import React from 'react';

// import './Navbar.css'; // Import the CSS file for styling

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <ul className="nav-links">
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about">About</a></li>
//         <li><a href="#services">Services</a></li>
//         <li><a href="#Diet-Plan">Diet-Plan</a></li>
//         <li><a href="#Login">Login</a></li>
        
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
// // src/components/Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import './Navbar.css'; // Import the CSS file for styling

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li> {/* Update href to Link component */}
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/diet-plan">Diet-Plan</Link></li>
//         <li><Link to="/login">Login</Link></li> {/* Update href to Link component */}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        navbar.style.top = '-100px'; // Scroll down, hide navbar
      } else {
        navbar.style.top = '0'; // Scroll up, show navbar
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/diet-plan">Diet-Plan</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
