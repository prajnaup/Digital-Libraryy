const User = require('../models').User;
const jwt = require('jsonwebtoken');
const config = require('../config');

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
      if (error.code === 11000) {
        if (error.keyPattern.username) {
          return res.status(400).send('Username already exists');
        }
        if (error.keyPattern.email) {
          return res.status(400).send('Email already exists');
        }
      }
      res.status(500).send(error.message);
    }
  },

signIn: async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
};
