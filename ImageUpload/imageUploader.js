const multer = require('multer');
const fileSystem = require('fs');
const path = require('path');
var cloudinary = require('cloudinary');
var FormData = require('form-data');


cloudinary.config({
    cloud_name: 'learningnodejs',
    api_key: 'API KEY',
    api_secret: 'Secret key'
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 10240 * 5
    },
    fileFilter: fileFilter
});


module.exports.uploadImage = (req, res, next) => {
    console.log("Image Upload")
    console.log(req.file, "File");


    // cloudinary.uploader.upload(req.file.path, function (result, err) {
    //     if (result) {
    //         console.log(result, "imageee")
    //             res.status(200).json({
    //                 message: "Image Successfully Uploaded",
    //                 image: result.secure_url
    //             })
    //     }
    //     if (err) {
    //         res.status(400).json({
    //             error: err
    //         })
    //     }
    // });
    if (req.file) {
        res.status(200).json({
            message: "Image Successfully Uploaded",
            image: req.file.filename
        })
    } else {
        res.status(400).json({
            message: "Invalid Image Type(must be jpeg or png)"
        })
    }
}
module.exports.getImage = (req, res, next) => {
    // var form = new FormData();
    // form.append('u_field', 'my value');
    // form.append('u_data', new Buffer(10));
    // form.append('u_file', fileSystem.createReadStream('../uploads/' + req.params.image));
    // console.log(form,"form Data");
    // res.status(200).json({
    //     image: form
    // })
    // var readStream = fileSystem.createReadStream(filePath);
    // // We replaced all the event handlers with a simple call to readStream.pipe()
    // readStream.pipe(response);
    var files = fileSystem.readdirSync('uploads/');
    //read the image using fs and send the image content back in the response
    fileSystem.readFile('uploads/' + files[0], function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' })
            console.log(err);
            res.end("No such image");
        } else {
            console.log(content, "IMage GDuyaeaFAdA+++++++++++++++++++++++++")
            //specify the content type in the response will be an image
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
    // console.log(req.params, "get image");
    // res.status(200).json({
    //     image: 'http://localhost:3000/image/getImage/' + req.params.image
    // })
}