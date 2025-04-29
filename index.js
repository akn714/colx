const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./models/db');
const LostAndFound = require('./models/lost_and_found');
const Olx = require('./models/olx');
const { log, errorHandler } = require('./utils');
const lafRoute = require('./routes/laf.route');
const olxRoute = require('./routes/olx.route');

dotenv.config();

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
    'origin': URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(log);
app.use(errorHandler);

// mini apps
app.use('/api/laf', lafRoute);
app.use('/api/olx', olxRoute);

// Root route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
let port = 3001;
app.listen(port, () => {
    console.log(`[+] Server is running on port ${port}`);
});

module.exports = app;
