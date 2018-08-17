const express = require('express');
const router = express.Router();
const userController = require('./userController');
const session = require('../sessions/sessionController');
const helper = require('../libs/helper');

router.post('/signup', userController.signup, userController.emailVerification);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);
router.get('/getProfile/:_id', helper.checkAuthorized, userController.getProfile);
router.post('/verifyAccount', userController.verifyAccount);
router.post('/checkSession', session.checkSession);

module.exports = router;