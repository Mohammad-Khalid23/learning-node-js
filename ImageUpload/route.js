const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageUpload = require('./imageUploader');

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

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 10240 * 5
    },
    fileFilter: fileFilter
});

router.post('/', upload.single('image'), imageUpload);
module.exports = router
