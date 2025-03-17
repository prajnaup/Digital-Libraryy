import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import BookDisplayPage from './books';
import Review from './Review';
import Wishlist from './Wishlist';

const IndexPage = () => {
  return (
    <div>
      <h1>Library Management System</h1>
      <SignUp />
      <SignIn />
      <BookDisplayPage />
      <Review />
      <Wishlist />
    </div>
  );
};

export default IndexPage;