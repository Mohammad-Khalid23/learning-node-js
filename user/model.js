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
    access_token: {
        type: String
    }
},{timestamps: true});
module.exports = mongoose.model('Users', user);