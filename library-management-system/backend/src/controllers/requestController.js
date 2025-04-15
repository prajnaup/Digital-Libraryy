const Request = require('../models').Request;

module.exports = {
  getRequests: async (req, res) => {
    try {
      const requests = await Request.find({ status: 'pending' }) 
        .populate('userId', 'username')
        .populate('bookId', 'title');
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getAllRequests: async (req, res) => {
    try {
      const requests = await Request.find()
        .populate('userId', 'username')
        .populate('bookId', 'title');
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getUserRequests: async (req, res) => {
    try {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); 
      const requests = await Request.find({
        userId: req.user.id,
        $or: [
          { status: 'pending' },
          { status: { $in: ['approved', 'disapproved', 'returned'] }, timestamp: { $gte: twoDaysAgo } }
        ]
      }).populate('bookId', 'title'); 
      res.status(200).json(requests.map(request => ({
        ...request.toObject(),
        returnDate: request.returnDate 
      })));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateRequest: async (req, res) => {
    try {
      const { status } = req.body;
      if (!['approved', 'disapproved'].includes(status)) {
        return res.status(400).send('Invalid status');
      }
      const updatedRequest = await Request.findByIdAndUpdate(
        req.params.id,
        { status, timestamp: new Date() }, 
        { new: true }
      );
      if (!updatedRequest) {
        return res.status(404).send('Request not found');
      }
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  confirmReturn: async (req, res) => {
    try {
      const request = await Request.findByIdAndUpdate(
        req.params.id,
        { status: 'returned', returnDate: new Date() }, 
        { new: true }
      );
      if (!request) {
        return res.status(404).send('Return request not found.');
      }
      res.status(200).send(`Book return confirmed successfully on ${request.returnDate}.`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
