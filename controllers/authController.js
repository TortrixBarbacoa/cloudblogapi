const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    const { name, last_name, username, email, password, title } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userDetails = new User(name, last_name, username, hashedPassword, title, email);
        await User.save(userDetails);
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.error('Error creating user:', err);
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.find(username);  

        if (user[0].length !== 1) {
            const error = new Error('A user with this username could not be found.');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(password, storedUser.password);

        if (!isEqual) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                username: storedUser.username,
                userId: storedUser.id.toString()
            },
            'secretfortoken',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token, userId: storedUser.id.toString() });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchAllUsers = async (req, res, next) => {
    try {
        const [allUsers] = await User.fetchAll();
        res.status(200).json(allUsers);
    } catch (err) {
        console.error('Error fetching users:', err);
        next(err);
    }
}