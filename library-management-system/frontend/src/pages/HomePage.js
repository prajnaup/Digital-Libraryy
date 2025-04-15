import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/books?query=${encodeURIComponent(searchQuery)}`); 
  };

  return (
    <div className="homepage">
      <div className="main-content">
        <h1>Welcome to Digital Library</h1>
        <p>Discover a world of books and manage your reading experience with ease.</p>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search for books..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <button type="submit">Search</button>
        </form>
        <div className="features">
          <div className="feature">
            <h2><Link to="/books">Browse Books</Link></h2> 
            <p>Explore our extensive collection of books.</p>
          </div>
          {/* <div className="feature">
            <h2><Link to="/reviews">Community Reviews</Link></h2>
            <p>Read reviews and ratings from other readers.</p>
          </div> */}
          <div className="feature">
            <h2><Link to="/wishlist">Manage Wishlist</Link></h2>
            <p>Keep track of books you want to read.</p>
          </div>
        </div> 
      </div>
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          The digital library hub is a virtual repository of learning resources which is not just a repository with search/browse facilities but provides a host of services for the learner community. It is designed to significantly improve the way users explore and manage a vast collection of books. Tailored for students, researchers, and book lovers, this platform emphasizes efficiency and ease of use. It boasts a wide range of powerful features, such as user-friendly book browsing, personalized wishlists and valuable community reviews. By addressing the varied needs of its users, the Digital Library System strives to create a vibrant atmosphere for learning and discovery within the literary community. We invite you to embark on this enriching journey with us to enhance your reading experience.
        </p>
      </div>
      <div className="footer">
        <h2>Follow Us On</h2>
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="instagram.png" alt="Instagram" style={{ width: '30px', height: '30px' }} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="twitter.png" alt="Twitter" style={{ width: '30px', height: '30px' }} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="linkedin.png" alt="LinkedIn" style={{ width: '30px', height: '30px' }} />
          </a>
        </div>
        <p>&copy; 2025 Digital Library. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;