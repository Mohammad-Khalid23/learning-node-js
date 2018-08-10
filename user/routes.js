const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/getProfile/:_id', userController.getProfile);

module.exports = router;