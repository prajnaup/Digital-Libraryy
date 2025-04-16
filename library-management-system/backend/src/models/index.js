const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' }, 
  wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }]
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bookid: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number },
    comment: { type: String }
  }],
  about: { type: String, required: true },
  image: { type: String, required: true },
  copies: { type: Number, required: true, default: 1 },
  availableCopies: { type: Number, required: true, default: 1 } 
});

bookSchema.pre('save', function (next) {
  if (this.isNew) {
    this.availableCopies = this.copies; 
  } else if (this.availableCopies > this.copies) {
    this.availableCopies = this.copies; 
  }
  next();
});

bookSchema.pre('find', function (next) {
  this.populate({
    path: 'reviews.userId',
    select: 'username',
    match: {} 
  });
  next();
});

bookSchema.pre('findOne', function (next) {
  this.populate({
    path: 'reviews.userId',
    select: 'username',
    match: {} 
  });
  next();
});

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String }
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

// const requestSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
//   status: { type: String, enum: ['pending', 'approved', 'disapproved', 'returned'], default: 'pending' },
//   timestamp: { 
//     type: Date,
//     get: (timestamp) => {
//       if (!timestamp) return undefined;
//       const options = { timeZone: 'Asia/Kolkata', hour12: true, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
//       return new Intl.DateTimeFormat('en-GB', options).format(new Date(timestamp));
//     }
//   },
//   returnDate: { 
//     type: Date,
//     get: (returnDate) => {
//       if (!returnDate) return undefined;
//       const options = { 
//         timeZone: 'Asia/Kolkata', 
//         hour12: true, 
//         year: 'numeric', 
//         month: '2-digit', 
//         day: '2-digit', 
//         hour: '2-digit', 
//         minute: '2-digit', 
//         second: '2-digit' 
//       };
//       return new Intl.DateTimeFormat('en-GB', options).format(new Date(returnDate));
//     }
//   }
// }, { toJSON: { getters: true }, toObject: { getters: true } });

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['pending', 'approved', 'disapproved', 'returned'], default: 'pending' },
  timestamp: { 
    type: Date,
    get: (timestamp) => {
      if (!timestamp) return undefined;
      return new Date(timestamp).toLocaleString('en-GB', { 
        timeZone: 'Asia/Kolkata', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        // hour: '2-digit', 
        // minute: '2-digit' 
      });
    }
  },
  returnDate: { 
    type: Date,
    get: (returnDate) => {
      if (!returnDate) return undefined;
      return new Date(returnDate).toLocaleString('en-GB', { 
        timeZone: 'Asia/Kolkata', 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        // hour: '2-digit', 
        // minute: '2-digit' 
      });
    }
  }
}, { toJSON: { getters: true }, toObject: { getters: true } }); // Enable getters

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Review = mongoose.model('Review', reviewSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
const Request = mongoose.model('Request', requestSchema);

module.exports = {
  User,
  Book,
  Review,
  Wishlist,
  Request
};