const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const crudRoutes = require('./crud/routes/routes');
const db = require('./db')

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', crudRoutes);
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status= 404;
//     next(error);
// })

// app.use((req, res, next) => {
//     req.status(error.status || 500);
//     res.json({
//         error:{
//             message:error.message

//         }
//     })
//     next(error);
// })
app.listen(port);
console.log("Magic Happenig on " + port)