var requester = require('../helpers/Requester');
var meetingsConfig = require('../../resources/meetings.json');
var roomsConfig = require('../../resources/rooms.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');

function getMeetings(roomId, callback) {

    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        })
};

function postMeetings(roomId, serviceId, body, callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;
    requester
        .postMeetingRequest(url, generalConfig.serviceUsername, generalConfig.servicePassword, body, function (err, res) {
            callback(err, res);
        })
}

exports.postMeetings = postMeetings;
exports.getMeetings = getMeetings;