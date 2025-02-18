import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get('/api/wishlist')
      .then(response => {
        setWishlist(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the wishlist!', error);
      });
  }, []);

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map(item => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;