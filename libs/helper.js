var moment = require('moment');
var randtoken = require('rand-token');

const helper = {};

helper.generateToken = () => {
    token1 = randtoken.generate(16);
    token2 = randtoken.generate(16);
    token3 = randtoken.generate(16);
    console.log(token1 + token2 + token3, "Token");
    return token1 + token2 + token3;
}
helper.validatePassword = (password) => {
    var regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    return regex.test(password);
}
helper.validateName = (name) => {
    var regexp = new RegExp(/^[a-z,',-]+(\s)[a-z,',-]+$/i);
    return regexp.test(name)
}
helper.validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
helper.validateDoB = (date) => {
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

module.exports = helper;