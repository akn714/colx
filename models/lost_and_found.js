const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const lostAndFoundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    author: {
        type: String,
        required: true
    },
    contactMe: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Invalid contact number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('LostAndFound', lostAndFoundSchema)