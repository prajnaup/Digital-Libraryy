const User = require('../models').User;

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('User deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  signUp: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  signIn: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || user.password !== req.body.password) {
        return res.status(401).send('Invalid email or password');
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};