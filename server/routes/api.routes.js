const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');
const registerController = require('../controllers/register.controller');
const loginController = require('../controllers/login.controller');

router.use('/employee', employeeController);
router.use('/register', registerController);
router.use('/login', loginController);

module.exports = router;