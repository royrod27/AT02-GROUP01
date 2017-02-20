var generalConfig = require('../../config/config.json');
var loginConfig = require('../../resources/login.json');
var requester = require('../helpers/Requester');
var token = require('./token');
var header = require('./header');

var headerLogin = {
    'Content-Type': 'application/json'
};

var body = {
    username: generalConfig.username,
    password: generalConfig.password,
    authentication: 'local'
};
var url = generalConfig.url + loginConfig.endpoint;

function generateToken(callback) {
    if(!token.isValid()) {
        requester
            .postRequest(url, headerLogin, body, function (err, res) {
                Object.assign(token, res.body);
                header.Authorization = 'jwt ' + res.body.token;
                callback(err, res);
            });
    } else {
        callback(null, token);
    }
}

exports.generateToken = generateToken;