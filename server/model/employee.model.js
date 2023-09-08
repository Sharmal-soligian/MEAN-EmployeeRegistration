const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String
    },
    jobTitle: {
        type: String
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String
    },
    employeeCode: {
        type: Schema.Types.ObjectId,
        unique: true,
        auto: true
    }
},
{
    versionKey: false
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;