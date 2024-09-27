import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import { Menu, X, UserPlus, User, History, LogOut } from 'lucide-react';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Nourify</h2>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/login" onClick={toggleSidebar}>
            <UserPlus size={20} />
            <span>Join Us</span>
          </Link>
        </li>
        {/* <li>
          <Link to="/profile" onClick={toggleSidebar}>
            <User size={20} />
            <span>Profile</span>
          </Link>
        </li> */}
        <li>
          <Link to="/history" onClick={toggleSidebar}>
            <History size={20} />
            <span>History</span>
          </Link>
        </li>
        <li>
          <Link to="/logout" onClick={toggleSidebar}>
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Navbar({ scrollToFooter }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
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
              <li>
                <span onClick={scrollToFooter} style={{ cursor: 'pointer', fontSize: '18px' }}>
                  About
                </span>
              </li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/dashboard">Diet-Plan</Link></li>
              <li>
                <button className="more-button" onClick={toggleSidebar}>
                  More <Menu size={18} />
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Navbar;
