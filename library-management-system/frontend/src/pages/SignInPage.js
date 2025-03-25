import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css'; // Import the CSS file for styling

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/signin', formData)
      .then(response => {
        console.log('User signed in:', response.data);
        setErrorMessage(''); 
      })
      .catch(error => {
        console.error('There was an error signing in!', error);
        if (error.response && error.response.status === 401) {
          setErrorMessage('Invalid credentials');
        } else {
          setErrorMessage('There was an error signing in!');
        }
      });
  };

  return (
    <div className="auth-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p><a href="/signup">New User? Register here</a></p>
    </div>
  );
};

export default SignInPage;