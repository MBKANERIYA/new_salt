const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        default: '',
    },
    birthday: {
        type: String,
        default: '',
    },
    anniversary: {
        type: String,
        default: '',
    },
    occupation: {
        type: String,
        default: '',
    },
    spouseBirthday: {
        type: String,
        default: '',
    },
    token: {
        type: String,
        // required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);