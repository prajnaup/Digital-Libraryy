const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }]
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bookid: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  reviews: [{ type: String }],
  about: { type: String, required: true }
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
const Review = mongoose.model('Review', reviewSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = {
  User,
  Book,
  Review,
  Wishlist
};