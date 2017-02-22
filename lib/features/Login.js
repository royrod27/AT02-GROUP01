var requester = require('../helpers/Requester');
var loginConfig = require('../../resources/login.json');
var generalConfig = require('../../config/config.json');


var url = generalConfig.url + loginConfig.endpoint;

var body = {
    username: generalConfig.username,
    password: generalConfig.password,
    authentication: loginConfig.authentication
};

function postLogin(callback) {
    requester
        .postRequest(url, loginConfig.header, body, function (err, res) {
            callback(err, res);
        });
}

exports.postLogin = postLogin;