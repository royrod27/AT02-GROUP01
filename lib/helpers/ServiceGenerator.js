var generalConfig = require('../../config/config.json');
var servicesConfig = require('../../resources/services.json');
var requester = require('../helpers/Requester');
var service = require('./service');
var header = require('./header');


function generateService(callback) {
    var url = generalConfig.url + servicesConfig.endpoint;
    var serviceJson = {
        username: "Administrator",
        password: "Slayer777",
        hostname: "at02guvi02lab.gualy.lab.local"
    };
    requester
        .postRequest(url, header, serviceJson, function (err, res) {
            Object.assign(service, res.body);
            callback(err, res);
        })
}

function deletesService(callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + service._id;
    requester
        .deleteRequest(url, header, function (err, res) {
            callback(err, res);
        })
}


exports.generateService = generateService;
exports.deleteService = deletesService;
