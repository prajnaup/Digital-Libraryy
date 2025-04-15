import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [notification, setNotification] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
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

  const handleNotificationsClick = () => {
    setShowNotificationPopup(true);
  };

  const closeNotificationPopup = () => {
    setShowNotificationPopup(false);
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setNotifications(response.data); 
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }
  }, [token]);

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
                <button onClick={handleNotificationsClick}>My Notifications</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <li><Link to="/signin">Log In</Link></li>
        )}
      </ul>
      {notification && <div className="notification">{notification}</div>}
      {showNotificationPopup && (
        <div className="notification-popup">
          <div className="popup-content">
            <h3>Notifications</h3>
            {notifications.filter(notification => ['approved', 'disapproved'].includes(notification.status)).length > 0 ? (
              <ul>
                {notifications
                  .filter(notification => ['approved', 'disapproved'].includes(notification.status))
                  .map((notification, index) => (
                    <li key={index}>
                      Your request for <strong>{notification.bookId.title}</strong> has been <strong>{notification.status}</strong>.
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No new notifications available</p>
            )}
            <button onClick={closeNotificationPopup}>Close</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;