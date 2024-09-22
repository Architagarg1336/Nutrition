import React, { useState } from 'react';
import './css/Footer.css'; // Make sure this path is correct

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
          Empowering your wellness journey with expertly tailored meal plans that address nutritional deficiencies, helping you achieve balance, vitality, and optimal health
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/dashboard">Diet-plan</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <p>Email: Nourify@gmail.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section newsletter">
          <h2>Subscribe to Our Newsletter</h2>
          <form onSubmit={handleSubmit} className="xtyle-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="xtyle-newsletter-input"
              required
            />
            <button type="submit" className="xtyle-newsletter-submit">
              →
            </button>
          </form>
          <div className="footer-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Fresh Drinks | All rights reserved
      </div>
    </footer>
  );
}

export default Footer;