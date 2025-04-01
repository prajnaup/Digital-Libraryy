const { Book, Review } = require('../models');

module.exports = {
  getReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).populate('bookId userId');
      if (!review) {
        return res.status(404).send('Review not found');
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  createReview: async (req, res) => {
    try {
      const { id } = req.params; 
      const { rating, comment } = req.body;

      const newReview = {
        userId: req.user.id, 
        rating,
        comment,
      };

      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { $push: { reviews: newReview } },
        { new: true }
      ).populate('reviews.userId', 'username'); 

      if (!updatedBook) {
        return res.status(404).send('Book not found');
      }

      const addedReview = updatedBook.reviews[updatedBook.reviews.length - 1]; // Get the newly added review
      res.status(201).json(addedReview);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).send('Failed to add review');
    }
  },

  updateReview: async (req, res) => {
    try {
      const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedReview) {
        return res.status(404).send('Review not found');
      }
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteReview: async (req, res) => {
    try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview) {
        return res.status(404).send('Review not found');
      }
      res.status(200).send('Review deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};