var requester = require('../helpers/Requester');
var roomsConfig = require('../../resources/rooms.json');
var tokenGenerator = require('../helpers/TokenGenerator');
var generalConfig = require('../../config/config.json');

var token = tokenGenerator.generateToken();

var header = {
    'Authorization': 'jwt ' + token
};

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
