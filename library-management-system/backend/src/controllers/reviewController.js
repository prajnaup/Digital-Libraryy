const Review = require('../models').Review;

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
      const newReview = new Review(req.body);
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).send(error.message);
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