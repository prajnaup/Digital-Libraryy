import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './BookDisplayPage.css';

const BookDisplayPage = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Get query from URL

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const endpoint = query
          ? `http://localhost:5000/search/books?query=${encodeURIComponent(query)}`
          : 'http://localhost:5000/books';
        const response = await axios.get(endpoint);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [query]);

  return (
    <div className="book-display-page">
      <h1>{query ? 'Search Results' : 'Books'}</h1> 
      <ul className="book-list">
        {books.map(book => (
          <li key={book._id} className="book-item">
            <img src={book.image} alt={book.title} />
            <h2><Link to={`/books/${book._id}`}>{book.title}</Link></h2>
            {query && ( 
              <>
                <p>by {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Book id: {book.bookid}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookDisplayPage;