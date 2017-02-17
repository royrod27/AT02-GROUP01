var requester = require('./Requester');
var tokenFile = require('../../config/token.json');
var moment = require('moment');
var jsonfile = require('jsonfile');
var generalConfig = require('../../config/config.json');
var loginConfig = require('../../resources/login.json');

var url = generalConfig.url + loginConfig.endpoint;
var fileName = 'config/token.json';
var token;

function generateToken() {
        var header = {
            'Content-Type': 'application/json'
        };

        var body = {
            username: generalConfig.username,
            password: generalConfig.password,
            authentication: 'local'
        };

        requester
            .postRequest(url, header, body, function (err, res) {
                var newContent = res.body;
                jsonfile.writeFile(fileName, newContent,function (err) {
                    if(err) console.log(err);
                });
            });
        return tokenFile.token;
}

exports.generateToken = generateToken;