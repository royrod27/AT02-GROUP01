var requester = require('../helpers/Requester');
var resourcesConfig = require('../../resources/resources.json');
var tokenConfig = require('../../config/token.json');
var generalConfig = require('../../config/config.json');


var url = generalConfig.url + resourcesConfig.endpoint;
var header = {
    'Authorization': 'jwt ' + tokenConfig.token
};


function getResources(callback) {
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

exports.getResources = getResources;