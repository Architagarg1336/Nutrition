import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <SecondPage />
              <ThirdPage />
              <BmiPage />
              <Footer />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tips" element={<TipsFirst />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;