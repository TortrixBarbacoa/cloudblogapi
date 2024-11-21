const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const User = require('../models/user');
const router = express.Router();

router.post(
    '/signup', [
        body('name').trim().not().isEmpty(),
        body('last_name').trim().not().isEmpty(),
        body('username').trim().isLength({ min: 5 }).custom(async (username) => {
            const user = await User.find(username);
            if (user[0].length > 0) {
                return Promise.reject('Username already exists!');
            }
        }),
        body ('title').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email').normalizeEmail(),
        body('password').isLength({ min: 7 }).withMessage('Password must be at least 7 characters long').trim()
    ], 
    authController.signup
);

router.post('/login', authController.login);

router.get('/', authController.fetchAllUsers);

module.exports = router;