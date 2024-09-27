import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SecondPage from './components/SecondPage';
import ThirdPage from './components/ThirdPage';
import Footer from './components/Footer';
import TipsFirst from './components/TipsFirst';
import BmiPage from './components/BmiPage';
import Dashboard from './components/Dashboard';
import ContactForm from './components/ContactUs';

function App() {
  const footerRef = useRef(null); // Create a ref for the footer

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar scrollToFooter={scrollToFooter} />
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <SecondPage />
              <ThirdPage />
              <BmiPage />
              <div ref={footerRef}>
                <Footer />
              </div>
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tips" element={<TipsFirst />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactForm />} />
          {/* Add About Us route if needed */}
          <Route path="/about" element={
            <div>
              <h1>About Us</h1>
              <p>Your about us content goes here.</p>
              <div ref={footerRef}></div> {/* Include the footer reference here as well */}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
