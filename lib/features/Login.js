var requester = require('../helpers/Requester');
var loginConfig = require('../../resources/login.json');
var tokenConfig = require('../../config/token.json');
var generalConfig = require('../../config/config.json');


var url = generalConfig.url + loginConfig.endpoint;
var header = {
    'Authorization': 'jwt ' + tokenConfig.token
};

var body = {
    username: generalConfig.username,
    password: generalConfig.password,
    authentication: 'local'
};

function postLogin(callback) {
    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

exports.postLogin = postLogin;