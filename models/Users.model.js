const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    roll_no: {
        type: Number,
        required: true,
        unique: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    // profileImage:{
    //     type: String,
    //     default: 'img/users/default.jpeg'
    // },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});

// Password hashing before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;

    next();
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;
