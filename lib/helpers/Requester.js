var request = require('superagent');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function getRequest(url, header, callback) {
    request.get(url)
        .set(header)
        .end(function (err, res) {
            callback(err, res);
        });
}

exports.getRequest = getRequest;