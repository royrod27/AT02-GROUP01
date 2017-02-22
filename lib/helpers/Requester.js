var request = require('superagent');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function getRequest(url, header, callback) {
    request.get(url)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

function getRequestWithoutAuth(url, callback) {
    request.get(url)
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
    request.put(url)
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

function postBasicRequest(url, user, password, body, callback) {
    request.post(url)
        .auth(user, password)
        .send(body)
        .end(function (err, res) {
            callback(err, res);
        });
}

function putBasicRequest(url, user, password, body, callback) {
    request.put(url)
        .auth(user, password)
        .send(body)
        .end(function (err, res) {
            callback(err, res);
        })
}

function deleteBasicRequest(url, user, password, callback) {
    request.del(url)
        .auth(user, password)
        .end(function (err, res) {
            callback(err, res);
        })
}

exports.deleteBasicRequest = deleteBasicRequest;
exports.putBasicRequest = putBasicRequest;
exports.postBasicRequest = postBasicRequest;
exports.getRequest = getRequest;
exports.postRequest = postRequest;
exports.putRequest = putRequest;
exports.deleteRequest = deleteRequest;
exports.getRequestWithoutAuth = getRequestWithoutAuth