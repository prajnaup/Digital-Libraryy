import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Digital Library</h1>
      <p>Discover a world of books and manage your reading experience with ease.</p>
      <div className="features">
        <div className="feature">
          <h2><Link to="/signup">Sign Up/Sign In</Link></h2>
          <p>Create an account to access personalized features.</p>
        </div>
        <div className="feature">
          <h2><Link to="/books">Browse Books</Link></h2>
          <p>Explore our extensive collection of books.</p>
        </div>
        <div className="feature">
          <h2><Link to="/reviews">Community Reviews</Link></h2>
          <p>Read reviews and ratings from other readers.</p>
        </div>
        <div className="feature">
          <h2><Link to="/wishlist">Manage Wishlist</Link></h2>
          <p>Keep track of books you want to read or purchase.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;