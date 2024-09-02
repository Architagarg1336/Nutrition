// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router components
import Navbar from './components/Navbar'; // Import the Navbar component
import LandingPage from './components/LandingPage'; // Import the LandingPage component
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import SecondPage from './components/SecondPage'; // Import the SecondPage component
import ThirdPage from './components/ThirdPage'; // Import the ThirdPage component
import Footer from './components/Footer'; // Import the Footer component
import TipsFirst from './components/TipsFirst'; // Import the TipsFirst component
import BmiPage from './components/BmiPage';
// import FourthPage from './components/FourthPage'; // Uncomment if needed

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage /> {/* First section */}
                <SecondPage /> {/* Second section */}
                <ThirdPage /> {/* Third section */}
                {/* <FourthPage /> Uncomment if needed */}
                <BmiPage/>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tips" element={<TipsFirst />} /> {/* Add TipsFirst route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
