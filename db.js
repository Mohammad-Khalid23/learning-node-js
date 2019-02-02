const mongoose = require('mongoose');

mongoose.connect('mongodb://patient-tracker2:patient123@ds139984.mlab.com:39984/khalid-projects',{ useNewUrlParser: true });

mongoose.connection.on('connected', (db) =>{
    console.log('Connected to the Database');
});

mongoose.connection.on('error', (error) =>{
    console.log(error, 'error');
});
mongoose.connection.on('disconnected', () =>{
    console.log('disconnected with database');
});