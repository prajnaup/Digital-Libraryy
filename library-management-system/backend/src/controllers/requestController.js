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
      const request = await Request.findById(req.params.id).populate('bookId');
      if (!request) {
        return res.status(404).send('Request not found');
      }

      if (status === 'approved') {
        if (request.bookId.availableCopies <= 0) {
          return res.status(400).send('No copies available to approve the request');
        }
        request.bookId.availableCopies -= 1;
        await request.bookId.save();
      }

      request.status = status;
      request.timestamp = new Date();
      await request.save();

      res.status(200).json(request);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  confirmReturn: async (req, res) => {
    try {
      const request = await Request.findById(req.params.id).populate('bookId');
      if (!request || request.status !== 'return-pending') {
        return res.status(404).send('Return request not found or already processed.');
      }

      request.status = 'returned';
      request.returnDate = new Date();
      await request.save();

      request.bookId.availableCopies += 1;
      await request.bookId.save();

      res.status(200).send(`Book return confirmed successfully on ${request.returnDate}.`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
