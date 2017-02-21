var requester = require('../helpers/Requester');
var servicesConfig = require('../../resources/services.json');
var roomsConfig = require('../../resources/rooms.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');

var url = generalConfig.url + servicesConfig.endpoint;

function getServices(callback) {
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postServices(body, callback) {
    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function deleteService(id, callback) {
    var deleteUrl = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + id;
    requester
        .deleteRequest(deleteUrl, header, function (err, res) {
            callback(err, res);
        });
}

function getService(id, callback) {
    var getUrl = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + id;
    requester
        .getRequest(getUrl, header, function (err, res) {
            callback(err, res);
        });
}

function getRoomsOfAService(id, callback) {
    var getUrl = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + id + '/' + roomsConfig.endpoint;
    requester
        .getRequest(getUrl, header, function (err, res) {
            callback(err, res);
        })
}


function getARoomOfAService(idService, idRoom, callback) {
    var getUrl = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + idService + '/' + roomsConfig.endpoint + '/' + idRoom;
    requester
        .getRequest(getUrl, header, function (err, res) {
            callback(err, res);
        });
}

exports.getServices = getServices;
exports.postServices = postServices;
exports.deleteService = deleteService;
exports.getService = getService;

exports.getRoomsOfAService = getRoomsOfAService;
exports.getARoomOfAService = getARoomOfAService;