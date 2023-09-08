const express = require('express');
const router = express.Router();
const http_code = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Register = require('../model/register.model');

router.get('/', async(req, res) => {
    try {
        const registereduser = await Register.find();
        if(registereduser.length === 0) {
            return res.status(http_code.NO_CONTENT).json({
                message: 'No content to show'
            });
        };
        res.status(http_code.OK).json({
            count: registereduser.length,
            data: registereduser
        });
    } catch(err) {
        console.error('Error getting registered users: ' + err);
        res.status(http_code.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Create user 
router.post('/', async(req, res) => {
    const obj = req.body;

    try {
        if(!obj.name || !obj.phone || !obj.password) {
            return res.status(http_code.BAD_REQUEST).json({
                error: 'Invalid request enter all required fields',
                message: 'Name, phone and password is requied'
            });
        };
        const phoneNum = await Register.findOne({ phone: obj.phone });
        if(phoneNum) {
            return res.status(http_code.CONFLICT).json({
                error: 'Phone number exists',
                message: 'User with this phone number already exists'
            });
        };
        
        // Hashing the password
        const hashedPassword = await bcrypt.hash(obj.password, 10);
        const newReg = await Register.create({
            name: obj.name,
            phone: obj.phone,
            password: hashedPassword
        });
        const token = jwt.sign({ userId: newReg._id }, 'your-secret-key');
        res.status(http_code.CREATED).json({
            message: 'User registered successfully',
            token
        });
    } catch(err) {
        console.error('Error creating registration: ' + err);
        res.status(http_code.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

module.exports = router;