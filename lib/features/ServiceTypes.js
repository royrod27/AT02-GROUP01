var requester = require('../helpers/Requester');
var serviceTypesConfig = require('../../resources/service-types.json');
var tokenGenerator = require('../helpers/TokenGenerator');
var generalConfig = require('../../config/config.json');


var token = tokenGenerator.generateToken();


var url = generalConfig.url + serviceTypesConfig.endpoint;
var header = {
    'Authorization': 'jwt ' + token
};

function getServiceType(callback) {
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

exports.getServiceType = getServiceType;