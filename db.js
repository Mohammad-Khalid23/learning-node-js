const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cruddb',{ useNewUrlParser: true });

mongoose.connection.on('connected', (db) =>{
    console.log('Connected');
});

mongoose.connection.on('error', (error) =>{
    console.log(error, 'error');
});
mongoose.connection.on('disconnected', () =>{
    console.log('disconnected');
});