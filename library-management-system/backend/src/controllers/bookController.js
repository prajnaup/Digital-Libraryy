const Book = require('../models').Book;
const Request = require('../models').Request;

module.exports = {

  getAllBooks: async (req, res) => {
    try {
      console.log("Fetching books..."); 
      const books = await Book.find();
      console.log("Books found:", books); 
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
        const book = await Book.findById(req.params.id).populate('reviews.userId', 'username');
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
          { genre: { $regex: query, $options: 'i' } },
          { bookid: { $regex: query, $options: 'i' } }
        ]
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  checkAvailability: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.status(200).json({ available: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  requestBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      const newRequest = new Request({
        userId: req.user.id,
        bookId: req.params.id,
        status: 'pending'
      });
      await newRequest.save();
      res.status(201).send('Request sent successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  returnBook: async (req, res) => {
    try {
      const request = await Request.findOneAndUpdate(
        {
          userId: req.user.id,
          bookId: req.params.id,
          status: 'approved'
        },
        { status: 'return-pending', timestamp: new Date() },
        { new: true }
      );
      if (!request) {
        return res.status(404).send('No approved request found for this book.');
      }
      res.status(200).send('Return request sent successfully. Awaiting admin approval.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

};