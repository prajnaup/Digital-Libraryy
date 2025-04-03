import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/signin'); // Redirect to login page if not logged in
      return;
    }
    axios.get('http://localhost:5000/wishlist', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setWishlist(response.data.books);
      })
      .catch(error => {
        console.error('There was an error fetching the wishlist!', error);
      });
  }, [history]);

  const handleRemoveFromWishlist = (bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not logged in.');
      return;
    }
    axios.delete(`http://localhost:5000/wishlist/${bookId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setWishlist(wishlist.filter(book => book._id !== bookId));
      })
      .catch(error => {
        console.error('There was an error removing the book from the wishlist!', error);
      });
  };

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div>
          <p>Your wishlist is empty. Browse books and add them to your wishlist!</p>
          <Link to="/books">Browse Books</Link>
        </div>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map(item => (
            <li key={item._id} className="wishlist-item">
              <img src={item.image} alt={item.title} />
              <h2><Link to={`/books/${item._id}`}>{item.title}</Link></h2>
              <p>by {item.author}</p>
              <p className="price">Genre: {item.genre}</p>
              <button onClick={() => handleRemoveFromWishlist(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;