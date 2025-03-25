import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the book details!', error);
      });
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="book-details-page">
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} className="book-image" />
      <p><strong>Book ID:</strong> {book.bookid}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p className="about"><strong></strong> {book.about}</p>
      {book.reviews && book.reviews.length > 0 ? (
        <div className="reviews">
          <h2>Reviews</h2>
          <ul>
            {book.reviews.map((review, index) => (
              <li key={index}>
                <p><strong>Username:</strong> {review.userId.username}</p>
                <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews available for this book.</p>
      )}
    </div>
  );
};

export default BookDetailsPage;
