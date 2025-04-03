import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookDetailsPage.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the book details!', error);
      });
  }, [id]);

  const handleAddReviewClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setWarning('Please log in to add a review.');
      return;
    }
    setWarning('');
    setShowModal(true);
  };

  const handleAddReview = () => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:5000/books/${id}/reviews`, { comment: review, rating: parseInt(rating) }, {
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then((response) => {
        setNotification('Review added successfully!');
        setTimeout(() => setNotification(''), 3000);
        setBook((prevBook) => ({
          ...prevBook,
          reviews: [...prevBook.reviews, response.data]
        }));
        setReview('');
        setRating(0);
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error adding review:', error);
        alert('Failed to add review. Please try again.');
      });
  };

  const handleAddToWishlist = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setWarning('Please log in to add this book to your wishlist.');
      return;
    }
    setWarning('');
    axios.post(`http://localhost:5000/wishlist`, { bookId: id }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setNotification('Book added to wishlist successfully!');
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(error => {
        console.error('Error adding book to wishlist:', error);
        alert('Failed to add book to wishlist. Please try again.');
      });
  };

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
      {book.reviews && book.reviews.filter(review => review.userId).length > 0 ? (
        <div className="reviews">
          <h2>Reviews</h2>
          <ul>
            {book.reviews.filter(review => review.userId).map((review, index) => (
              <li key={index}>
                <p><strong>{review.userId.username}</strong>: {renderStars(review.rating)}</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews available for this book.</p>
      )}
      <button className="add-review-button" onClick={handleAddReviewClick}>Add Review</button>
      <span style={{ margin: '0 10px' }}></span> 
      <button className="add-review-button" onClick={handleAddToWishlist}>Add to Wishlist</button>
      {warning && <p className="warning">{warning}</p>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
            />
            <button onClick={handleAddReview}>Submit Review</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default BookDetailsPage;