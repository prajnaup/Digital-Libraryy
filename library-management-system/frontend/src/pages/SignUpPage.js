// filepath: /c:/Users/prajn/OneDrive/Desktop/workspace/library-management-system/frontend/src/pages/SignUpPage.js

import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/signup', formData)
      .then(response => {
        console.log('User signed up:', response.data);
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;