const Book = require('../models').Book;
const Wishlist = require('../models').Wishlist;

module.exports = {
  getBook: async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('books');
      if (!wishlist) {
        return res.status(404).send('Wishlist not found');
      }
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  createBook: async (req, res) => {
    try {
      const { bookId } = req.body;
      let wishlist = await Wishlist.findOne({ userId: req.user.id });
      if (!wishlist) {
        wishlist = new Wishlist({ userId: req.user.id, books: [] });
      }
      if (!wishlist.books.includes(bookId)) {
        wishlist.books.push(bookId);
        await wishlist.save();
      }
      res.status(201).json(wishlist);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateBook: async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).send('Book not found');
      }
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteBook: async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        return res.status(404).send('Book not found');
      }
      res.status(200).send('Book deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  removeBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const wishlist = await Wishlist.findOne({ userId: req.user.id });
      if (!wishlist) {
        return res.status(404).send('Wishlist not found');
      }
      wishlist.books = wishlist.books.filter(book => book.toString() !== bookId);
      await wishlist.save();
      res.status(200).send('Book removed from wishlist');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};