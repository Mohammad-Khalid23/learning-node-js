const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    access_token: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    active: {
        type: Boolean
    },
    emailVerificationToken: {
        type: String
    }
}, { timestamps: true });
module.exports = mongoose.model('Users', user);