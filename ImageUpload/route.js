const express = require('express');
const router = express.Router();
const image = require('./imageUploader');

router.post('/uploadImage', image.upload.single('image'), image.uploadImage);
router.get('/getImage/:image', image.getImage);
module.exports = router
