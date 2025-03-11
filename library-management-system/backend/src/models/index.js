const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }]
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  price: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const book1Schema = new mongoose.Schema({
  book: { type: String, required: true },
  author: { type: String, required: true },
  published: { type: Number, required: true },
  // genre: { type: String },
  // price: { type: Number, required: true },
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Book1 = mongoose.model('Book1', book1Schema);
const Review = mongoose.model('Review', reviewSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = {
  User,
  Book,
  Review,
  Wishlist
};