var requester = require('../helpers/Requester');
var serviceTypesConfig = require('../../resources/service-types.json');
var generalConfig = require('../../config/config.json');


var url = generalConfig.url + serviceTypesConfig.endpoint;

function getServiceType(callback) {
    requester
        .getRequestWithoutAuth(url, function (err, res) {
            callback(err, res);
        });
}

exports.getServiceType = getServiceType;