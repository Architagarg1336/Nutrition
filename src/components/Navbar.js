import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    top: `${Math.max(4, 8 - scrollPosition / 4)}px`,
  };

  return (
    <header className="header">
      <div className="logo-container">
      </div>
      <nav className="navbar" style={navbarStyle}>
        <div className="navbar-container">
          <ul className="nav-links">
        <img src="./images/logo-no-background.svg" alt="Logo" className="logo" />
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/diet-plan">Diet-Plan</Link></li>
              <li><Link to="/login" className="login-button">Join Us</Link></li>

          </ul>
        </div>
      </nav>

    </header>
  );
}

export default Navbar;