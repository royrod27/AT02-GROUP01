var request = require('superagent');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function getRequest(url, header, callback) {
    request.get(url)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

function postRequest(url, header, body, callback) {
    request.post(url)
        .set(header)
        .send(body)
        .end(function (err, res) {
            callback(err, res);
        });
}

function putRequest(url, header, body, callback) {
    request.post(url)
        .set(header)
        .send(body)
        .end(function (err, res) {
            callback(err, res);
        });
}

function deleteRequest(url, header, callback) {
    request.del(url)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

exports.getRequest = getRequest;
exports.postRequest = postRequest;
exports.putRequest = putRequest;
exports.deleteRequest = deleteRequest;