import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import BookDisplayPage from './pages/BookDisplayPage';
import ReviewPage from './pages/ReviewPage';
import WishlistPage from './pages/WishlistPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/signUpPage" component={SignUpPage} />
          <Route path="/signInPage" component={SignInPage} />
          {/* <Route path="/books" component={BookDisplayPage} />
          <Route path="/reviews" component={ReviewPage} />
          <Route path="/wishlist" component={WishlistPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;