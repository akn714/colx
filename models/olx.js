const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const olxSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },    
    seller: {
        type: String,
        required: true
    },
    seller_contact: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Invalid contact number']
    },
    isSold: {
        type: Boolean,
        require: 'true',
        default: false
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    // contact: {
    //     type: String,
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Olx', olxSchema)