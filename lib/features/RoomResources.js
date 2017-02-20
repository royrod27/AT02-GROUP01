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
};

exports.getResourceOfRoom = getResourceOfRoom;
exports.joinRoomResource = joinRoomResource;
