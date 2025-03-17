const express = require('express');
const router = express.Router();

const { UserController, BookController, ReviewController, WishlistController } = require('../controllers');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

router.get('/books', BookController.getAllBooks);
router.post('/books', BookController.createBook);
router.get('/books/:id', BookController.getBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);
router.get('/search/books', BookController.searchBooks);

router.post('/books/:id/reviews', ReviewController.createReview);
router.get('/books/:id/reviews', ReviewController.getReview);

router.post('/wishlist', WishlistController.createBook);
router.get('/wishlist', WishlistController.getBook);

module.exports = router;