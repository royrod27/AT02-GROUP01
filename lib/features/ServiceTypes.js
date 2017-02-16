var requester = require('../helpers/Requester');
var serviceTypesConfig = require('../../resources/service-types.json');
var tokenConfig = require('../../config/token.json');
var generalConfig = require('../../config/config.json');


var url = generalConfig.url + serviceTypesConfig.endpoint;
var header = {
    'Authorization': 'jwt ' + tokenConfig.token
};


function getServiceType(callback) {
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

exports.getServiceType = getServiceType;