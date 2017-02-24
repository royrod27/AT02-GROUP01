var requester = require('../helpers/Requester');
var roomsConfig = require('../../resources/rooms.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');


function joinRoomResource(roomId, body, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/resources';
    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function getResourceOfRoom(roomId, resourceId, callback) {

    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/resources/' + resourceId;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res)
        })
}

function getResourcesByRoom(roomId, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/resources';
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        })
}

function putResourceOfRoom(roomId, resourceId, body, callback) {

    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/resources/' + resourceId;
    requester
        .putRequest(url, header, body, function (err, res) {
            callback(err, res)
        })
}

function delResourceOfRoom(roomId, resourceId, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/resources/' + resourceId;
    requester
        .deleteRequest(url, header, function (err, res) {
            callback(err, res);
        })
}

exports.getResourcesByRoom = getResourcesByRoom;
exports.delResourceOfRoom = delResourceOfRoom;
exports.getResourceOfRoom = getResourceOfRoom;
exports.joinRoomResource = joinRoomResource;
exports.putResourceOfRoom = putResourceOfRoom;