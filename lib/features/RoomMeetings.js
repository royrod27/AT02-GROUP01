var requester = require('../helpers/Requester');
var meetingsConfig = require('../../resources/meetings.json');
var roomsConfig = require('../../resources/rooms.json');
var servicesConfig = require('../../resources/services.json');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');

function getMeetings(roomId, callback) {
    var url = generalConfig.url + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;
    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        })
};

function getMeetingsWithService(serviceId,roomId,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;

    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postMeetings(roomId, serviceId, body, callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;
    requester
        .postBasicRequest(url, generalConfig.serviceUsername, generalConfig.servicePassword, body, function (err, res) {
            callback(err, res);
        })
}

function deleteMeetings(meetingId, serviceId, roomId, callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint + '/' + meetingId;
    requester
        .deleteBasicRequest(url, generalConfig.serviceUsername, generalConfig.servicePassword, function (err, res) {
            callback(err, res);
        })
}

function getMeetingsWithServiceById(serviceId, roomId, meetingId, callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/meetings/' + meetingId;
    requester
        .getRequestWithoutAuth(url, function (err, res) {
            callback(err, res);
        })
}

function putMeetingsWithServiceById(serviceId, roomId, meetingId, body, callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/meetings/' + meetingId;
    requester
        .putBasicRequest(url, generalConfig.serviceUsername, generalConfig.servicePassword, body, function (err, res) {
            callback(err, res);
        })
}

function postCancelMeetingsServiceById(serviceId, roomId, meetingId, callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/meetings/cancel?' + meetingId;
    requester
        .postCancelBasicRequest(url, generalConfig.serviceUsername, generalConfig.servicePassword, function (err, res) {
            callback(err, res);
        } )
}

exports.deleteMeetings = deleteMeetings;
exports.postMeetings = postMeetings;
exports.getMeetings = getMeetings;
exports.getMeetingsWithService = getMeetingsWithService;
exports.getMeetingsWithServiceById = getMeetingsWithServiceById;
exports.putMeetingsWithServiceById = putMeetingsWithServiceById;
exports.postCancelMeetingsServiceById = postCancelMeetingsServiceById;