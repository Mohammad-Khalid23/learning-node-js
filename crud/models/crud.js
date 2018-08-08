const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crud = new Schema({
    name: {
        type: String
    },
    fatherName: {
        type: String
    },
    roll:{
        type:Number
    },
    date:{
        type:String
    }
});
module.exports = mongoose.model('Crud', crud);