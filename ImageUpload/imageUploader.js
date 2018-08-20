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
    var files = fileSystem.readdirSync('uploads/');
    res.sendFile(path.join(__dirname, '../uploads', req.params.image))
    // console.log(req.params, "get image");
    // res.status(200).json({
    //     image: 'http://localhost:3000/image/getImage/' + req.params.image
    // })
}