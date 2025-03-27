const express = require('express');
const router = express.Router();

const { UserController, BookController, ReviewController, WishlistController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

router.get('/books', BookController.getAllBooks);
router.post('/books', BookController.createBook);
router.get('/books/:id', BookController.getBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);
router.get('/search/books', BookController.searchBooks);

router.post('/books/:id/reviews', authMiddleware, ReviewController.createReview);
router.get('/books/:id/reviews', ReviewController.getReview);

router.post('/wishlist', authMiddleware, WishlistController.createBook);
router.get('/wishlist', authMiddleware, WishlistController.getBook);

module.exports = router;