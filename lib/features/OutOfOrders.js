var requester = require('../helpers/Requester');
var generalConfig = require('../../config/config.json');
var header = require('../helpers/header');
var servicesConfig = require('../../resources/services.json');
var roomsConfig = require('../../resources/rooms.json');
var outOfOrdersConfig = require('../../resources/out-of-orders.json');


function getOutOfOrders(serviceId,roomId,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + outOfOrdersConfig.endpoint;

    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function postOutOfOrders(serviceId,roomId,body,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + outOfOrdersConfig.endpoint;

    requester
        .postRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function getOutOfOrdersById(serviceId,roomId,outOfOrderId,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + outOfOrdersConfig.endpoint + '/' + outOfOrderId;

    requester
        .getRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

function putOutOfOrdersById(serviceId,roomId,outOfOrderId,body,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + outOfOrdersConfig.endpoint + '/' + outOfOrderId;

    requester
        .putRequest(url, header, body, function (err, res) {
            callback(err, res);
        });
}

function deleteOutOfOrdersById(serviceId,roomId,outOfOrderId,callback) {
    var url = generalConfig.url + servicesConfig.GeneralEndpoint + '/' + serviceId + '/' + roomsConfig.endpoint + '/' + roomId + '/' + outOfOrdersConfig.endpoint + '/' + outOfOrderId;

    requester
        .deleteRequest(url, header, function (err, res) {
            callback(err, res);
        });
}

exports.getOutOfOrders = getOutOfOrders;
exports.postOutOfOrders = postOutOfOrders;
exports.getOutOfOrdersById = getOutOfOrdersById;
exports.putOutOfOrdersById = putOutOfOrdersById;
exports.deleteOutOfOrdersById = deleteOutOfOrdersById;