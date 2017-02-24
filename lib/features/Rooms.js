var requester = require('../helpers/Requester');
var roomsConfig = require('../../resources/rooms.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');


function getRooms(callback) {
    var url = generalConfig.url + roomsConfig.endpoint;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function getRoomsById(id, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + id;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postRooms(body, callback) {
    var url = generalConfig.url + roomsConfig.endpoint;
    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function deleteRoomsById(id, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + id;

    requester
        .deleteRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function putRoomsById(id, body, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + id;

    requester
        .putRequest(url, header, body, function (err, res) {
            callback(err, res);
        });

}

exports.getRooms = getRooms;
exports.postRooms = postRooms;
exports.deleteRoomsById = deleteRoomsById;
exports.putRoomsById = putRoomsById;
exports.getRoomsById = getRoomsById;