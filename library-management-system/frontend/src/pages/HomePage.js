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
    history.push(`/books?query=${searchQuery}`);
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
      <div className="about-us">
        <h2>About Us</h2>
        <p>
          The digital library hub is a virtual repository of learning resources which is not just a repository with search/browse facilities but provides a host of services for the learner community. It is sponsored and mentored by Ministry of Education, Government of India, through its National Mission on Education through Information and Communication Technology (NMEICT). Filtered and federated searching is employed to facilitate focused searching so that learners can find the right resource with least effort and in minimum time. NDLI provides user group-specific services such as Examination Preparatory for School and College students and job aspirants. Services for Researchers and general learners are also provided. NDLI is designed to hold content of any language and provides interface support for 10 most widely used Indian languages. It is built to provide support for all academic levels including researchers and life-long learners, all disciplines, all popular forms of access devices and differently-abled learners. It is designed to enable people to learn and prepare from best practices from all over the world and to facilitate researchers to perform inter-linked exploration from multiple sources. It is developed, operated and maintained from Indian Institute of Technology Kharagpur.
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