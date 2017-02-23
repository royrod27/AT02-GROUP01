var requester = require('../helpers/Requester');
var generalConfig = require('../../config/config.json');
var servicesConfig = require('../../resources/services.json');
var attendees = require('../../resources/attendees.json');


function getAttendees(serviceId,filter,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + attendees.endpoint + attendees.filter + filter + '/';

    requester
        .getRequestWithoutAuth(url, function (err, res) {
            callback(err, res);
        });
}

exports.getAttendees = getAttendees;