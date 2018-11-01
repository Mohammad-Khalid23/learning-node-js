const bcrypt = require('bcrypt');
const passwordHash = require('password-hash');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('send grid api key will me here');

const service = {}
service.hashPassword = (password) => {
    console.log(password, "Password");
    // Generate a salt
    // var salt = bcrypt.genSaltSync(16);
    // // Hash the password with the salt
    // var hash = bcrypt.hashSync(password, salt);
    // return hash;

    var hashpwd = passwordHash.generate(password);
    return hashpwd;
    console.log(hashpwd, "hash ===========>>>>>>>>>>");

}

service.comparePassword = (password, hash, cb) => {
    // bcrypt.compare(password, hash, function (err, res) {
    //     return cb(res, err)
    // });
    if (passwordHash.verify(password, hash)) {
        return cb(true, null)

    } else {
        return cb(false, err)
    }
}

service.sendMail = (to, from, msg, token) => {
    console.log(token, "Token in send mail");
    const resetPassword = {
        to: to,
        from: from,
        subject: 'Reser your password',
        link: token,
        html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
    };
    const verifyEmail = {
        to: to,
        from: from,
        subject: 'Confirm your Email',
        link: token,
        html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
    };
    if (msg === 'verify') {
        sgMail.send(verifyEmail);
    } else {
        sgMail.send(resetPassword);
    }
}

module.exports = service;