const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./models/db');
const { log, errorHandler, authorizeUser } = require('./utils');
const lafRoute = require('./routes/laf.route');
const olxRoute = require('./routes/olx.route');
const authRoute = require('./routes/auth.route');

const app = express();
const URL = 'http://localhost:3000';

// connect to database
connectDB();

mongoose.connection.on('connected', () => {
    console.log('[+] Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log('[-] Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('[-] Mongoose disconnected');
});

app.use(cors({
    origin: URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(log);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api/auth', authRoute);

// app.use(authorizeUser);

app.get('/api/me', authorizeUser, (req, res) => {
    console.log('[+] cookies:', req.cookies);
    res.json({ cookies: req.cookies });
});

// mini apps
app.use('/api/laf', lafRoute);
app.use('/api/olx', olxRoute);

// ADMIN ROUTE
// const Users = require('./models/Users.model');
// app.get('/list-users', async (req, res) => {
//     const users = await Users.find();
//     if(!users) return res.json({
//         error: 'users not found'
//     });
//     return res.json({
//         users: users
//     });
// });

// Root route
app.get('*', (req, res) => {
    return res.redirect('/');
});

// Start server
let port = 3001;
app.listen(port, () => {
    console.log(`[+] Server is running on port ${port}`);
});

module.exports = app;
