var requester = require('../helpers/Requester');
var serviceTypesConfig = require('../../resources/service-types.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');


var url = generalConfig.url + serviceTypesConfig.endpoint;

function getServiceType(callback) {
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

exports.getServiceType = getServiceType;