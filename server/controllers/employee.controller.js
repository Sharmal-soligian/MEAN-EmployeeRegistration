const express = require('express');
const router = express.Router();
const http_codes = require('http-status-codes');

const Employee = require('../model/employee.model');

router.get('/all', async(req, res) => {
    try {
        const employee = await Employee.find();
        if(employee.length === 0) {
            return res.status(http_codes.NO_CONTENT).json({
                message: 'No Employees in database'
            });
        };
        res.status(http_codes.OK).json({
            count: employee.length,
            data: employee
        });
    } catch(err) {
        console.error('Error getting employee: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Create employee
router.post('/add', async(req, res) => {
    const obj = req.body;

    try {
        if(!obj.name || !obj.phone) {
            return res.status(http_codes.BAD_REQUEST).json({
                error: 'Enter all required datas',
                message: 'Enter phone number and name'
            });
        };
        const phoneNum = await Employee.findOne({ phone: obj.phone });
        if(phoneNum) {
            return res.status(http_codes.CONFLICT).json({
                error: 'Phone number already exists'
            });
        };

        const empCode = await Employee.findOne({ employeeCode: obj.employeeCode });
        if(empCode) {
            return res.status(http_codes.CONFLICT).json({
                error: 'Employee with this code already exists'
            });
        };
        
        const newEmployee = await Employee.create(obj);
        res.status(http_codes.CREATED).json({
            newEmployee,
            message: 'New employee created'
        });
    } catch(err) {
        console.error('Error creating employee: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Get emp by id
router.get('/find/:id', async(req, res) => {
    let id = req.params.id;
    
    try {
        const empId = await Employee.findById(id);
        if(!empId) {
            return res.status(http_codes.NOT_FOUND).json({
                error: 'Invalid id',
                message: 'Employee with this id not found'
            });
        };
        res.status(http_codes.OK).json({
            empId,
            message: 'Fetched employee by id'
        });
    } catch(err) {
        console.error('Error getting user by id: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Edit emp
router.put('/update/:id', async(req, res) => {
    const obj = req.body;
    let id = req.params.id;

    try {
        const updateEmp = await Employee.findByIdAndUpdate(id,{
            name: obj.name,
            email: obj.email,
            jobTitle: obj.jobTitle,
            phone: obj.phone,
            imageUrl: obj.imageUrl
        });
        res.status(http_codes.OK).json({
            data: updateEmp,
            message: 'Employee updated succesfully'
        });
    } catch(err) {
        console.error('Error updating employee: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Delete amp
router.delete('/delete/:id', async(req, res) => {
    let id = req.params.id;

    try {
        const empId = await Employee.findById(id);
        if(!empId) {
            return res.status(http_codes.NOT_FOUND).json({
                error: 'NO employee with this id',
                message: 'Employee with this id not found'
            });
        };
        const deleteEmp = await Employee.findByIdAndDelete(id);
        res.status(http_codes.OK).json({
            message: 'Employee deleted successfully'
        });
    } catch(err) {
        console.error('Error deleting Emp: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

module.exports = router;