const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./model');
const service = require('./service');
const helper = require('../libs/helper');

const userController = {};

userController.signup = (req, res, next) => {
    console.log(req.body, "Body");
    if (req.body.email) {
        if (helper.validateEmail(req.body.email)) { //email validate
            if (helper.validateName(req.body.name)) { //name validate
                if (helper.validatePassword(req.body.password)) { //password validate
                    if (req.body.password === req.body.confirmPassword) { //match password
                        if (helper.validateDoB(req.body.dob)) { //date of birth validate
                            let userData = {
                                name: req.body.name,
                                email: req.body.email,
                                password: service.hashPassword(req.body.password),
                                active: false
                            }
                            const user = new User(userData);
                            user.save().then(result => {
                                // res.status(200).json({
                                //     message: 'Succesfully Signup',
                                //     data: result
                                // })
                                next();
                            })
                                .catch(err => {
                                    res.status(400).json({
                                        errot: err
                                    })
                                })
                        } else {
                            res.status(400).json({
                                message: "You are not Eligible for this please grow up and then come"
                            })
                        }
                    } else {
                        res.status(400).json({
                            message: "Password not match"
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "Invalid Password"
                    })
                }
            } else {
                res.status(400).json({
                    message: "Please give full name"
                })
            }
        } else {
            res.status(400).json({
                message: "Invalid Email"
            })
        }
    }
    else {
        res.status(400).json({
            message: 'Something Missing'
        })
    }
}
userController.login = (req, res, next) => {
    console.log(req.body, "Body");
    if (req.body.email) {
        if (helper.validateEmail(req.body.email)) {
            User.findOne({ email: req.body.email }).then(result => {
                console.log(result, "Result")
                if (result != null) {
                    service.comparePassword(req.body.password, result.password, (password, err) => {
                        if (password) {
                            User.findByIdAndUpdate({ _id: result._id }, { access_token: generateToken() }, { new: true })
                                .then(response => {
                                    console.log(response, "Reswponse in n")
                                    res.status(200).json({
                                        message: 'Succesfully login',
                                        data: response
                                    })
                                })
                                .catch(err => {
                                    res.status(400).json({
                                        message: 'Error in update',
                                        error: err
                                    })
                                })
                        } else {
                            res.status(400).json({
                                message: 'InCorrect Password'
                            })
                        }
                    })
                } else {
                    res.status(404).json({
                        message: 'No User Found'
                    })
                }
            })
                .catch(err => {
                    res.status(400).json({
                        message: 'Duplicate Email Address',
                        error: err
                    })
                })
        }
        else {
            res.status(400).json({
                message: "Invalid Email"
            })
        }
    }
    else {
        res.status(400).json({
            message: 'Something Missing'
        })
    }
}
userController.forgotPassword = (req, res, next) => {
    User.findOneAndUpdate({ email: req.body.email }, { resetPasswordToken: helper.generateToken() }, { new: true })
        .then(result => {
            service.sendMail(result.email, 'khalidayub2315@gmail.com', 'reset', result.resetPasswordToken);
            res.status(200).json({
                message: 'Check your email to reset your password',
                // data: {
                //     resetPasswordToken: result.resetPasswordToken
                // }
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}
userController.resetPassword = (req, res, next) => {
    console.log(req.body, "Request body");
    let newPassword = service.hashPassword(req.body.newPassword);
    console.log(newPassword, "neww Password")
    User.findOneAndUpdate({ resetPasswordToken: req.body.resetPasswordToken }, { password: newPassword }, { new: true })
        .then(result => {
            res.status(200).json({
                message: "Password updated Successfully",
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}
userController.getProfile = (req, res, next) => {
    console.log(req.params._id, "Id");
    User.findById({ _id: req.params._id }, { password: 0 }).then(result => {
        res.status(200).json({
            message: 'Get profile Successfully',
            data: result
        })
    })
        .catch(err => {
            res.status(404).json({
                message: "No Such user Find",
                erro: err
            })
        })
}


userController.emailVerification = (req, res, next) => {
    User.findOneAndUpdate({ email: req.body.email }, { emailVerificationToken: helper.generateToken() }, { new: true })
        .then(result => {
            // service.sendMail(result.email, 'khalidayub2315@gmail.com', 'verify', result.emailVerificationToken);
            res.status(200).json({
                message: 'Signup Successfully,Check your email to verify your Account',
                // data: {
                //     emailVerificationToken: result.emailVerificationToken
                // }
                data: result
            })
            next();
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}

userController.verifyAccount = (req, res, next) => {
    console.log(req.body, "Request body");
    User.findOneAndUpdate({ emailVerificationToken: req.body.emailVerificationToken }, { active: true, emailVerificationToken: null }, { new: true })
        .then(result => {
            res.status(200).json({
                message: "Your Account has been Confirmed",
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}



module.exports = userController;