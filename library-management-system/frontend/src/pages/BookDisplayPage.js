import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookDisplayPage.css';

const BookDisplayPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  return (
    <div className="book-display-page">
      <h1>Books</h1>
      <ul className="book-list">
        {books.map(book => (
          <li key={book._id} className="book-item">
            <img src={book.image} alt={book.title} />
            <h2><Link to={`/books/${book._id}`}>{book.title}</Link></h2>
            {/* <p>by {book.author}</p>
            <p>Book ID: {book.bookid}</p>
            <p>Genre: {book.genre}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookDisplayPage;