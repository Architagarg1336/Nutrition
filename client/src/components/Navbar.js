import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <Link to="/">
        <img src="./images/logo-no-background.svg" alt="Logo" className="logo" />
      </Link>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} style={navbarStyle}>
        <div className="navbar-container">
          <ul className="nav-links">
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
