const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./model');
const service = require('./service');
var moment = require('moment');
var randtoken = require('rand-token');

const userController = {};

userController.signup = (req, res, next) => {
    console.log(req.body, "Body");
    if (req.body.email) {
        if (validateEmail(req.body.email)) { //email validate
            if (validateName(req.body.name)) { //name validate
                if (validatePassword(req.body.password)) { //password validate
                    if (req.body.password === req.body.confirmPassword) { //match password
                        if (validateDoB(req.body.dob)) { //date of birth validate
                            let userData = {
                                name: req.body.name,
                                email: req.body.email,
                                password: service.hashPassword(req.body.password)
                            }
                            const user = new User(userData);
                            user.save().then(result => {
                                res.status(200).json({
                                    message: 'Succesfully Signup',
                                    data: result
                                })
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
        if (validateEmail(req.body.email)) {
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
    User.findOneAndUpdate({ email: req.body.email }, { resetPasswordToken: generateToken() }, { new: true })
        .then(result => {
            service.sendMail(result.resetPasswordToken);
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

generateToken = () => {
    token = randtoken.generate(16);
    console.log(token, "Token");
    return token;
}
validatePassword = (password) => {
    var regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    return regex.test(password);
}
validateName = (name) => {
    var regexp = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/i);
    return regexp.test(name)
}
validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
validateDoB = (date) => {
    var currentTime = moment(new Date(), 'YYYY,MM,DD');
    let dob = moment(new Date(date), 'YYYY,MM,DD');
    var a = moment(currentTime);
    var b = moment(dob);
    console.log(a.diff(b, 'years'), "DIFFERANCE")
    console.log(dob);
    let diff = a.diff(b, 'years');
    if (diff < 5) {
        console.log("You are not eligible");
        return false;
    } else {
        console.log("You are eligible");
        return true;
    }
}


module.exports = userController;