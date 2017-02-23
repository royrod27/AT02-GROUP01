var requester = require('../helpers/Requester');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');
var servicesConfig = require('../../resources/services.json');
var roomsConfig = require('../../resources/rooms.json');
var meetingsConfig = require('../../resources/out-of-orders.json');


function getMeetings(serviceId,roomId,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;

    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postMeetings(serviceId,roomId,body,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + meetingsConfig.endpoint;

    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}


exports.getMeetings = getMeetings;
exports.postMeetings = postMeetings;
