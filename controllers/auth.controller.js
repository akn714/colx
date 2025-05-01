const Users = require('../models/Users.model');
const bcrypt = require('bcrypt');

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, roll_no, branch, year, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const existingUser = await Users.findOne({ roll_no });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new Users({
            name,
            email,
            roll_no,
            branch,
            year,
            password,
            confirmPassword
        });

        await newUser.save();

        return res.json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { roll_no, password } = req.body;

        const user = await Users.findOne({ roll_no });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // TODO: implement JWT or session here
        return res.json({ message: 'Login successful!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    register,
    login
};
