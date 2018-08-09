const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./model');
const service = require('./service');

const userController = {};

userController.signup = (req, res, next) => {
    console.log(req.body, "Body");
    if (req.body.email) {
        let tempUser = {
            name: req.body.name,
            email: req.body.email,
            password: service.hashPassword(req.body.password)
        }
        const user = new User(tempUser);
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


module.exports = userController;