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
    condition: {
        type: String,
        required: true,
        enum: {
            values: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
            message: 'Condition is either: New, Like New, Good, Fair, Poor'
        }
    },
    // tags: [String],
    // category: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Category',
    //   required: [true, 'Product must belong to a category']
    // },
    isSold: {
        type: Boolean,
        require: true,
        default: false
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Product must belong to a seller']
    },
    seller_contact: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Invalid contact number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Products', productSchema);