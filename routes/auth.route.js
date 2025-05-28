// auth routes here

// * /signin or /login
// * /signup or /register (student and faculty seperately)

const express = require('express');
const authController = require('../controllers/auth.controller');
const { authorizeUser } = require('../utils');

const router = express.Router();

// add routes here
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/logout', authorizeUser, authController.logout);

module.exports = router

