import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './BookDisplayPage.css';

const BookDisplayPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [tempSelectedGenres, setTempSelectedGenres] = useState([]); 
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [tempShowAvailableOnly, setTempShowAvailableOnly] = useState(false); 
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); 
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const endpoint = query
          ? `http://localhost:5000/search/books?query=${encodeURIComponent(query)}`
          : 'http://localhost:5000/books';
        const response = await axios.get(endpoint);
        setBooks(response.data);
        setFilteredBooks(response.data);

     
        const uniqueGenres = [...new Set(response.data.map(book => book.genre))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, [query]);

  useEffect(() => {
  
    let filtered = books;

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(book => selectedGenres.includes(book.genre));
    }

    if (showAvailableOnly) {
      filtered = filtered.filter(book => book.availableCopies && book.availableCopies > 0); 
    }

    setFilteredBooks(filtered);
  }, [selectedGenres, showAvailableOnly, books]);

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setTempSelectedGenres(prev =>
      checked ? [...prev, value] : prev.filter(genre => genre !== value)
    );
  };

  const handleResetFilters = () => {
    setTempSelectedGenres([]);
    setTempShowAvailableOnly(false);
  };

  const handleApplyFilters = () => {
    setSelectedGenres(tempSelectedGenres);
    setShowAvailableOnly(tempShowAvailableOnly);
    setIsFilterModalOpen(false); 
  };

  return (
    <div className="book-display-page">
      <h1>
        {query 
          ? `Search Results for "${query}"` 
          : 'Books'}
      </h1>

      <button onClick={() => setIsFilterModalOpen(true)} className="filter-button">Filter</button>

      {isFilterModalOpen && (
        <div className="filter-modal">
          <div className="filter-modal-content">
            <h3>Filter Options</h3>
            <div className="filter-group">
              <h4>Genres</h4>
              {genres.map(genre => (
                <label key={genre}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={tempSelectedGenres.includes(genre)}
                    onChange={handleGenreChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <label>
                <input
                  type="checkbox"
                  checked={tempShowAvailableOnly}
                  onChange={() => setTempShowAvailableOnly(prev => !prev)}
                />
                Show Available Only
              </label>
            </div>
            <div className="filter-modal-actions">
              <button onClick={handleResetFilters}>Reset Filters</button>
              <button onClick={handleApplyFilters}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {query && filteredBooks.length === 0 && (
        <p>No results found for "{query}".</p>
      )}

      <ul className="book-list">
        {filteredBooks.map(book => (
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