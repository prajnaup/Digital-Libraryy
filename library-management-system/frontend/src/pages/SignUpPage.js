import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css'; 
const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    retypePassword: '',
    email: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState(''); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.retypePassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    axios.post('http://localhost:5000/signup', formData)
      .then(response => {
        console.log('User signed up:', response.data);
        localStorage.setItem('token', response.data.token); 
        setErrorMessage('');
        setNotification('Successfully signed up!'); 
        setTimeout(() => {
          setNotification('');
          window.location.href = '/'; 
        }, 3000);
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('There was an error signing up!');
        }
      });
  };

  return (
    <div className="auth-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="retypePassword" placeholder="Retype Password" value={formData.retypePassword} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default SignUpPage;