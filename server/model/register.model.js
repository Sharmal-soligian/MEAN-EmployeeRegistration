const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regiserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        default: null,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    versionKey: false,
    timestamps: true
});

const Register = mongoose.model('Register', regiserSchema);
module.exports = Register;