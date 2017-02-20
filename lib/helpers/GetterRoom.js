var generalConfig = require('../../config/config.json');
var roomConfig = require('../../resources/rooms.json');
var requester = require('../helpers/Requester');
var room = require('./room');
var header = require('./header');

function getRoom(callback) {
    var url = generalConfig.url + roomConfig.endpoint;
    requester.
        getRequest(url, header, function (err, res) {
        Object.assign(room, res.body[0]);
        callback(err, res);
    })
}

exports.getRoom = getRoom;