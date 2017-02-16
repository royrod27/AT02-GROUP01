var request = require('superagent');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var logger = require('../../logger/logger.js').getLogger('project');

function getRequest(url, header, callback) {
    request.get(url)
        .set(header)
        .end(function (err, res) {

            logger.debug('GET');
            if(err!=null){
                logger.error(err.status);
                logger.error(err.response);
            }
            logger.debug(res.body);

            callback(err, res);
        });
}

function postRequest(url, header, body, callback) {
    request.post(url)
        .set(header)
        .send(body)
        .end(function (err, res) {

            logger.debug('POST');
            if(err!=null){
                logger.error(err.status);
                logger.error(err.response);
            }
            logger.debug(res.body);

            callback(err, res);
        });
}


exports.getRequest = getRequest;
exports.postRequest = postRequest;