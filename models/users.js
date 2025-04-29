const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be at least 0']
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Product must belong to a category']
  },
  condition: {
    type: String,
    required: true,
    enum: {
      values: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
      message: 'Condition is either: New, Like New, Good, Fair, Poor'
    }
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Product must belong to a seller']
  },
  images: [String],
  status: {
    type: String,
    enum: ['Available', 'Pending', 'Sold'],
    default: 'Available'
  },
  location: {
    city: String,
    state: String,
    country: String,
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add seller info to product when queried
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'seller',
    select: 'username profile.avatar rating'
  }).populate({
    path: 'category',
    select: 'name'
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;