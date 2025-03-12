import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><img src='logo.jpg' height="100%" width="50px"></img></Link>
      </div>
      <div className="navbar-title">
         Digital<br/>Library
        </div>
      <ul className="navbar-links">
        <li><Link to="/signin">Log In</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;