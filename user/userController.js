const User = require('./model');
const Session = require('../sessions/model')
const service = require('./service');
const helper = require('../libs/helper');
var moment = require('moment');

module.exports.signup = (req, res, next) => {
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
module.exports.login = (req, res, next) => {
    console.log(req.body, "Body");
    if (req.body.email) {
        if (helper.validateEmail(req.body.email)) {
            User.findOne({ email: req.body.email }).then(result => {
                console.log(result, "Result")
                if (result != null) {
                    service.comparePassword(req.body.password, result.password, (password, err) => {
                        if (password) {
                            var expireDate = new Date(moment(new Date(), "DD-MM-YYYY").add(10, 'days'));
                            let session = new Session({
                                user_id: result._id,
                                access_token: helper.generateToken(),
                                expire: expireDate
                            })
                            session.save().then(response => {
                                res.status(200).json({
                                    message: 'Login Successfully!',
                                    access_token: response.access_token,
                                    data: result
                                })
                            })
                                .catch(err => {
                                    res.status(400).json({
                                        error: err
                                    })
                                })
                            // User.findByIdAndUpdate({ _id: result._id }, { access_token: helper.generateToken() }, { new: true })
                            //     .then(response => {
                            //         console.log(response, "Reswponse in n")
                            //         res.status(200).json({
                            //             message: 'Succesfully login',
                            //             data: response
                            //         })
                            //     })
                            //     .catch(err => {
                            //         res.status(400).json({
                            //             message: 'Error in update',
                            //             error: err
                            //         })
                            //     })
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
module.exports.forgotPassword = (req, res, next) => {
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
module.exports.resetPassword = (req, res, next) => {
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
module.exports.getProfile = (req, res, next) => {
    console.log(req.params._id, "Id");
    User.findById({ _id: req.params._id }, { password: 0 }).then(result => {
        if (result) {
            res.status(200).json({
                message: 'Get profile Successfully',
                data: result
            })
        } else {
            res.status(404).json({
                message: "No Such user Found",
                data: result
            })
        }

    })
        .catch(err => {
            res.status(404).json({
                message: "No Such user Found",
                erro: err
            })
        })
}

module.exports.emailVerification = (req, res, next) => {
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

module.exports.verifyAccount = (req, res, next) => {
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

module.exports.saveSession = () => {
    console.log(new Date(), "Date")
    var new_date = new Date(moment(new Date(), "DD-MM-YYYY").add(5, 'days'));
    var new_date1 = new Date(moment(new Date(), "DD-MM-YYYY").add(5, 'days'));
    if (new_date === new_date1) {
        console.log("Date Matched")
    } else {
        console.log("Date not Matched")
    }
    console.log(new_date, "NEw Date")
    console.log(new_date1, "NEw Date")
}