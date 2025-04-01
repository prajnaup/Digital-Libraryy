import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [notification, setNotification] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginNotificationShown'); 
    setToken(null); 
    setNotification('Successfully logged out');
    setTimeout(() => setNotification(''), 3000);
    history.push('/signin');
  };

  const handleMyAccount = () => {
    history.push('/my-account');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const loginNotificationShown = localStorage.getItem('loginNotificationShown');

    if (storedToken && !loginNotificationShown) {
      setNotification('Successfully logged in');
      setTimeout(() => setNotification(''), 3000);
      localStorage.setItem('loginNotificationShown', 'true');
    }

    setToken(storedToken);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><img src='/logo.jpg' height="100%" width="50px"></img></Link>
      </div>
      <div className="navbar-title">
         Digital<br/>Library
      </div>
      <ul className="navbar-links">
        {token ? (
          <li className="profile-menu" ref={dropdownRef}>
            <img 
              src="/Profle-Icon.png" 
              alt="Profile" 
              className="profile-icon" 
              onClick={() => setShowDropdown(!showDropdown)} 
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleMyAccount}>My Account</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <li><Link to="/signin">Log In</Link></li>
        )}
      </ul>
      {notification && <div className="notification">{notification}</div>}
    </nav>
  );
};

export default Navbar;