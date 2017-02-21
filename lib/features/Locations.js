var requester = require('../helpers/Requester');
var locationConfig = require('../../resources/locations.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');

function getLocation(callback) {

    var url = generalConfig.url + locationConfig.endpoint;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res)
        })
};

function postLocation(body, callback) {

    var url = generalConfig.url + locationConfig.endpoint;
    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res)
        })
};

function getLocationById(locationId, callback) {

    var url = generalConfig.url + locationConfig.endpoint + '/' + locationId;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res)
        })
};

function putLocationById(locationId, body, callback) {

    var url = generalConfig.url + locationConfig.endpoint + '/' + locationId;
    requester
        .putRequest(url, header, body, function (err, res) {
            callback(err, res)
        })
};

function delLocationById(locationId, callback) {
    var url = generalConfig.url + locationConfig.endpoint + '/' + locationId;
    requester
        .deleteRequest(url, header, function (err, res) {
            callback(err, res);
        })
}

exports.getLocation = getLocation;
exports.postLocation = postLocation;
exports.getLocationById = getLocationById;
exports.putLocationById = putLocationById;
exports.delLocationById = delLocationById;
