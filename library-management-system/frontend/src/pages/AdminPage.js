import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', bookid: '', about: '', image: '' });
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
      return;
    }

    axios.get('http://localhost:5000/auth/role', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.role !== 'admin') {
          alert('Access denied. Admins only.');
          history.push('/');
        }
      })
      .catch(error => {
        console.error('Error verifying role:', error);
        history.push('/');
      });

    axios.get('http://localhost:5000/books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, [history]);

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/admin/books', newBook, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setBooks([...books, response.data]))
      .catch(error => console.error('Error adding book:', error));
  };

  const handleDeleteBook = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/admin/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Add New Book</h2>
        <input type="text" name="title" placeholder="Title" onChange={handleInputChange} />
        <input type="text" name="author" placeholder="Author" onChange={handleInputChange} />
        <input type="text" name="genre" placeholder="Genre" onChange={handleInputChange} />
        <input type="text" name="bookid" placeholder="Book ID" onChange={handleInputChange} />
        <textarea name="about" placeholder="About" onChange={handleInputChange}></textarea>
        <input type="text" name="image" placeholder="Image URL" onChange={handleInputChange} />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <h2>Manage Books</h2>
        <ul>
          {books.map(book => (
            <li key={book._id}>
              {book.title} - {book.author}
              <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;