const express = require('express');
const router = express.Router();
const userController = require('./userController');

router.post('/signup', userController.signup,userController.emailVerification);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/getProfile/:_id', userController.getProfile);
router.post('/verifyAccount', userController.verifyAccount);

module.exports = router;