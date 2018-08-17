const session = require('./model');
const user = require('../user/model');

module.exports.createSession = (req, res, next) => {
    console.log(req.headers, "Headers");

}

module.exports.checkSession = (req, res, next) => {
    let header = req.headers;
    if (header.authorization) {
        let token = header.authorization;
        session.findOne({ access_token: token }).then(result => {
            user.findOne({ _id: result.user_id }, { password: 0, emailVerificationToken: 0 }).then(response => {
                res.status(200).json({
                    message: "User Data",
                    data: {
                        data: response,
                        access_token: token
                    }
                })
            })
                .catch(err => {
                    res.status(400).json({
                        error: err
                    })
                })
        })
            .catch(err => {
                res.status(400).json({
                    error: err
                })
            })
        console.log(token, "TOKEN")
    } else {
        res.status(400).json({
            message: "Please send the Token in Header"
        })
    }

}