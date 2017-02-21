var requester = require('../helpers/Requester');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');


function getOutOfOrders(serviceId,roomId,callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/out-of-orders';

    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postOutOfOrders(serviceId,roomId,body,callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/out-of-orders';

    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function getOutOfOrdersById(serviceId,roomId,outOfOrderId,callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/out-of-orders/' + outOfOrderId;

    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function putOutOfOrdersById(serviceId,roomId,outOfOrderId,body,callback) {
    var url = generalConfig.url + 'services/' + serviceId + '/rooms/' + roomId + '/out-of-orders/' + outOfOrderId;

    requester
        .putRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

exports.getOutOfOrders = getOutOfOrders;
exports.postOutOfOrders = postOutOfOrders;
exports.getOutOfOrdersById = getOutOfOrdersById;
exports.putOutOfOrdersById = putOutOfOrdersById;