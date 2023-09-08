const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const http_codes = require('http-status-codes');

const Register = require('../model/register.model');

router.post('/', async(req, res) => {
    const { name, password } = req.body;

    try {
        const signedUpUser = await Register.findOne({ name });
        if(!signedUpUser) {
            return res.status(http_codes.UNAUTHORIZED).json({
                error: 'Invalid name',
                message: 'Name is invalid'
            });
        };
        const passwordMatch = await bcrypt.compare(password, signedUpUser.password);
        if(!passwordMatch) {
            return res.status(http_codes.UNAUTHORIZED).json({
                error: 'Invalid password',
                message: 'Password is invalid'
            });
        };
        const token = jwt.sign({ userId: signedUpUser._id }, 'your-secret-key', { expiresIn: '2h' });
        res.status(http_codes.OK).json({
            message: 'Successfully logged in',
            name: req.body.name,
            token
        });
    } catch(err) {
        console.error('Error Loggin: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

module.exports = router;