const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('send grid api key will me here');

const service = {}
service.hashPassword = (password) => {
    console.log(password, "Password");
    // Generate a salt
    var salt = bcrypt.genSaltSync(16);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

service.comparePassword = (password, hash, cb) => {
    bcrypt.compare(password, hash, function (err, res) {
        return cb(res, err)
    });
}

service.sendMail = (token) => {
    console.log(token, "Token in send mail");
    const msg = {
        to: 'm.khalidayub95@gmail.com',
        from: 'khalidayub2315@gmail.com',
        subject: 'Reser your password',
        link: token,
        html: '<h2>Welcome to Learning Node</h2><div>Click Link Below to Reset your password</div><a href="www.google.com" target="_blank">Click to Reset Password</a>',
    };
    sgMail.send(msg);
}

module.exports = service;