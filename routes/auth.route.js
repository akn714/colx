// auth routes here

// * /signin or /login
// * /signup or /register (student and faculty seperately)

const express = require('express');
const authController = require('../controllers/auth.controller');
const { authorizeUser } = require('../utils');

const router = express.Router();

router.get('/logout', authorizeUser, authController.logout);

// add routes here
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router

