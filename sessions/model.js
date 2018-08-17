const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const session = new Schema({
    user_id: {
        type: String
    },
    access_token: {
        type: String,
        unique: true
    },
    expire: {
        type: Date
    }
}, { timestamps: true });
module.exports = mongoose.model('Sessions', session);