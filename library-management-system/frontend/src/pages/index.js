import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import BookDisplay from './BookDisplay';
import Review from './Review';
import Wishlist from './Wishlist';

const IndexPage = () => {
  return (
    <div>
      <h1>Library Management System</h1>
      <SignUp />
      <SignIn />
      <BookDisplay />
      <Review />
      <Wishlist />
    </div>
  );
};

export default IndexPage;