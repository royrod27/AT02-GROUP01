var requester = require('../helpers/Requester');
var resourcesConfig = require('../../resources/resources.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');



function getResources(callback) {
    var url = generalConfig.url + resourcesConfig.endpoint;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function getResource(id, callback) {
    var url = generalConfig.url + resourcesConfig.endpoint + '/' + id;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postResources(body, callback) {
    var url = generalConfig.url + resourcesConfig.endpoint;
    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function deleteResource(id, callback) {
    var url = generalConfig.url + resourcesConfig.endpoint + '/' + id;

    requester
        .deleteRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function putResource(id, body, callback) {
    var url = generalConfig.url + resourcesConfig.endpoint + '/' + id;

    requester
        .putRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

exports.getResources = getResources;
exports.postResources = postResources;
exports.deleteResource = deleteResource;
exports.putResource = putResource;
exports.getResource = getResource;