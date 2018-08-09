const bcrypt = require('bcrypt');

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
module.exports = service;