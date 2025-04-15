import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './AdminPage.css'; 

const AdminPage = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', bookid: '', about: '', image: '', copies: 1 }); // Added 'copies'
  const [editingBook, setEditingBook] = useState(null); 
  const [notification, setNotification] = useState(''); 
  const [confirmation, setConfirmation] = useState({ show: false, message: '', onConfirm: null });
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
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

    axios.get('http://localhost:5000/admin/requests', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));

    axios.get('http://localhost:5000/admin/all-requests', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => setAllRequests(response.data))
      .catch(error => console.error('Error fetching all requests:', error));
  }, [history]);

  useEffect(() => {
    console.log("Editing book changed:", editingBook); 
    if (editingBook) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editingBook]);

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const showConfirmation = (message, onConfirm) => {
    setConfirmation({ show: true, message, onConfirm });
  };

  const handleAddBook = () => {
    showConfirmation('Are you sure you want to add this book?', () => {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:5000/admin/books', newBook, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setBooks([...books, response.data]);
          setNotification('Book added successfully!'); 
          setTimeout(() => setNotification(''), 3000); 
          setNewBook({ title: '', author: '', genre: '', bookid: '', about: '', image: '', copies: 1 }); // Reset 'copies' to 1
        })
        .catch(error => console.error('Error adding book:', error));
    });
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook(book);
    document.querySelector('.admin-page').scrollIntoView({ behavior: 'smooth' }); 
  };

  const handleUpdateBook = () => {
    showConfirmation('Are you sure you want to update this book?', () => {
      const token = localStorage.getItem('token');
      axios.put(`http://localhost:5000/admin/books/${editingBook._id}`, newBook, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setBooks(books.map(book => (book._id === editingBook._id ? response.data : book)));
          setNotification('Book updated successfully!'); 
          setTimeout(() => setNotification(''), 3000);
          setEditingBook(null);
          setNewBook({ title: '', author: '', genre: '', bookid: '', about: '', image: '', copies: 1 }); // Reset 'copies' to 1
        })
        .catch(error => console.error('Error updating book:', error));
    });
  };

  const handleCancelEdit = () => {
    setEditingBook(null); 
    setNewBook({ title: '', author: '', genre: '', bookid: '', about: '', image: '', copies: 1 }); // Reset 'copies' to 1
  };

  const handleDeleteBook = (id) => {
    showConfirmation('Are you sure you want to delete this book?', () => {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:5000/admin/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setBooks(books.filter(book => book._id !== id));
          setNotification('Book deleted successfully!'); 
          setTimeout(() => setNotification(''), 3000); 
        })
        .catch(error => console.error('Error deleting book:', error));
    });
  };

  const handleRequestAction = (requestId, action) => {
    const token = localStorage.getItem('token');
    if (['approved', 'disapproved', 'returned'].includes(action)) {
      axios.put(`http://localhost:5000/admin/${action === 'returned' ? 'returns' : 'requests'}/${requestId}`, { status: action }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          setRequests(requests.filter(request => request._id !== requestId)); 
          setAllRequests(allRequests.filter(request => request._id !== requestId)); 
        })
        .catch(error => console.error(`Error updating ${action} request:`, error));
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Page</h1>
      {notification && <div className="notification">{notification}</div>} 
      <div className="admin-section">
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleInputChange} />
        <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleInputChange} />
        <input type="text" name="genre" placeholder="Genre" value={newBook.genre} onChange={handleInputChange} />
        <input type="text" name="bookid" placeholder="Book ID" value={newBook.bookid} onChange={handleInputChange} />
        <textarea name="about" placeholder="About" value={newBook.about} onChange={handleInputChange}></textarea>
        <input type="text" name="image" placeholder="Image URL" value={newBook.image} onChange={handleInputChange} />
        <input type="number" name="copies" placeholder="Number of Copies" value={newBook.copies} onChange={handleInputChange} /> 
        {editingBook ? (
          <>
            <button className="admin-button" style={{ marginRight: '10px' }} onClick={handleUpdateBook}>Update Book</button>
            <button className="admin-button" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button className="admin-button" onClick={handleAddBook}>Add Book</button>
        )}
      </div>
      <div className="admin-section">
        <h2>Manage Books</h2>
        <ul className="admin-book-list">
          {books.map(book => (
            <li key={book._id} className="admin-book-item">
              <span>{book.title} - {book.author}</span>
              <div>
                <button className="admin-button" onClick={() => handleEditBook(book)}>Edit</button>
                <button className="admin-button" onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Book Requests</h2>
        <ul>
          {requests.length > 0 ? (
            requests.map(request => (
              <li key={request._id}>
                <p>Book: {request.bookId.title}</p>
                <p>Requested by: {request.userId.username}</p>
                <button onClick={() => handleRequestAction(request._id, 'approved')}>Approve</button>
                <span style={{ margin: '0 10px' }}></span> 
                <button onClick={() => handleRequestAction(request._id, 'disapproved')}>Disapprove</button>
              </li>
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Confirm Returns</h2>
        <ul>
          {allRequests
            .filter(request => request.status === 'return-pending') 
            .map(request => (
              <li key={request._id}>
                <p>Book: {request.bookId.title}</p>
                <p>Requested by: {request.userId.username}</p>
                <button onClick={() => handleRequestAction(request._id, 'returned')}>Confirm Return</button>
              </li>
            ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Pending Returns</h2>
        <ul>
          {allRequests
            .filter(request => request.status === 'approved') 
            .map(request => (
              <li key={request._id}>
                <p>Book: {request.bookId.title}</p>
                <p>Requested by: {request.userId.username}</p>
                {request.timestamp && (
                  <p>Date Approved: {new Date(request.timestamp).toLocaleDateString()}</p>
                )}
              </li>
            ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>History</h2>
        <ul>
          {allRequests
            .filter(request => ['disapproved', 'returned'].includes(request.status)) 
            .map(request => (
              <li key={request._id}>
                <p>Book: {request.bookId.title}</p>
                <p>Requested by: {request.userId.username}</p>
                <p>Status: {request.status}</p>
                {request.timestamp && (
                  <p>
                    Date: {new Date(request.timestamp).toLocaleDateString()}
                    {request.status === 'returned' && request.returnDate && (
                      <> - {new Date(request.returnDate).toLocaleDateString()}</>
                    )}
                  </p>
                )}
              </li>
            ))}
        </ul>
      </div>
      {confirmation.show && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>{confirmation.message}</p>
            <button onClick={() => { confirmation.onConfirm(); setConfirmation({ show: false, message: '', onConfirm: null }); }}>Yes</button>
            <button onClick={() => setConfirmation({ show: false, message: '', onConfirm: null })}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;