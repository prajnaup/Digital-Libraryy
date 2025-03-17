const Book = require('../models').Book;

module.exports = {

  getAllBooks: async (req, res) => {
    try {
      console.log("Fetching books..."); // Debugging
      const books = await Book.find();
      console.log("Books found:", books); // Debugging
      if (!books.length) {
        return res.status(204).send("No books found");
      }
      res.status(200).json(books);
    } catch (error) {
      console.log("Error fetching books:", error);
      res.status(500).send(error.message);
    }
  },
  
  getBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  createBook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      await newBook.save();
      res.status(201).json(newBook);
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

  searchBooks: async (req, res) => {
    try {
      const { query } = req.query;
      const books = await Book.find({ 
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { author: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } }
        ]
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

};