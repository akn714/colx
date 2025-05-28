const Users = require('../models/Users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER a user
const register = async (req, res) => {
    try {
        const { name, email, contact, roll_no, branch, year, password, confirmPassword } = req.body;

        if (!name || !email || !contact || !roll_no || !branch || !year || !password || !confirmPassword)
            return res.status(400).json({ error: 'All fields are required' });

        if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match' });

        const existingUser = await Users.findOne({ roll_no });
        if (existingUser) return res.status(400).json({ error: 'User already registered with this roll number' });

        const newUser = await Users.create({
            name,
            email,
            contact,
            roll_no,
            branch,
            year,
            password,
            confirmPassword
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('[register error]', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// LOGIN a user
const login = async (req, res) => {
    try {
        const { roll_no, password } = req.body;

        if (!roll_no || !password) return res.status(400).json({ error: 'Roll number and password are required' });

        const user = await Users.findOne({ roll_no });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // set to true in production (when using HTTPS)
            sameSite: 'None', // or 'Strict' or 'None' based on your needs
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        
        return res.status(200).json({
            message: 'Login successful!',
            token
        });
    } catch (error) {
        console.error('[-] login error', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// LOGOUT a user (handled client-side, but we can still invalidate token if using DB or Redis)
// LOGOUT a user
const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // should be true in production (HTTPS)
        sameSite: 'None' // match the cookie config used in login
    });
    return res.status(200).json({ message: 'Logout successful!' });
};

module.exports = {
    register,
    login,
    logout
};
