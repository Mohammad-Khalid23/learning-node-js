const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crud = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique:true
    },
    fatherName: {
        type: String,
        lowercase: true

    },
    roll: {
        type: Number
    }
}, { timestamps: true });
module.exports = mongoose.model('Crud', crud);