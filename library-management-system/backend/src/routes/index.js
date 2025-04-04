const express = require('express');
const router = express.Router();

const { UserController, BookController, ReviewController, WishlistController } = require('../controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');

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
router.delete('/wishlist/:bookId', authMiddleware, WishlistController.removeBook);

router.post('/admin/books', authMiddleware, isAdmin, BookController.createBook);
router.put('/admin/books/:id', authMiddleware, isAdmin, BookController.updateBook);
router.delete('/admin/books/:id', authMiddleware, isAdmin, BookController.deleteBook);

router.get('/auth/role', authMiddleware, (req, res) => {
  res.status(200).json({ role: req.user.role });
});

module.exports = router;