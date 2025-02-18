import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('/api/books/:id/reviews') // Replace :id with the actual book ID
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the reviews!', error);
      });
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>{review.comment} - {review.rating} stars</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;