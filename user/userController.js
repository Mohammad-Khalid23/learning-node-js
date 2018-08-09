const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./model');
const service = require('./service');

const userController = {};

userController.signup = (req, res, next) => {
    console.log(req.body, "Body");

    if (req.body.email) {
        if (validateEmail(req.body.email)) {
            if (validateName(req.body.name)) {
                if (validatePassword(req.body.password)) {
                    if (req.body.password === req.body.confirmPassword) {
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

        User.findOne({ email: req.body.email }).then(result => {
            console.log(result.password, "hash password")
            console.log(req.body.password, "password")
            service.comparePassword(req.body.password, result.password, (password, err) => {
                console.log(res, "Rtesponser");
                if (password) {
                    res.status(200).json({
                        message: 'Succesfully login',
                        data: result
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid Password'
                    })
                }
            })
        })
            .catch(err => {
                res.status(400).json({
                    error: err
                })
            })
    }
    else {
        res.status(400).json({
            message: 'Something Missing'
        })
    }
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


module.exports = userController;