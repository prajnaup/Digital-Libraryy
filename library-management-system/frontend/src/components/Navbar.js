import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const history = useHistory();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [notification, setNotification] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null); // Update the state to trigger re-render
    setNotification('Successfully logged out');
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    history.push('/signin');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken); // Sync state with localStorage
    if (storedToken) {
      setNotification('Successfully logged in');
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><img src='logo.jpg' height="100%" width="50px"></img></Link>
      </div>
      <div className="navbar-title">
         Digital<br/>Library
      </div>
      <ul className="navbar-links">
        {token ? (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/signin">Log In</Link></li>
        )}
      </ul>
      {notification && <div className="notification">{notification}</div>}
    </nav>
  );
};

export default Navbar;