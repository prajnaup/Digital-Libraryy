import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/signin`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const submitReview = async (bookId, reviewData) => {
  try {
    const response = await axios.post(`${API_URL}/books/${bookId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addToWishlist = async (bookId) => {
  try {
    const response = await axios.post(`${API_URL}/wishlist`, { bookId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};