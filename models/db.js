// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_LINK);
    console.log(`[+] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`[+] Connection Error: ${err.message}`);
    // process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;