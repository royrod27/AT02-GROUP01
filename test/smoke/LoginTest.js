var expect = require('chai').expect;
var login = require('../../lib/features/Login');
var credentials = require('../../config/config.json');


describe('Smoke Tests for Login', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);

    it('Post /login returns 200', function (done) {
        login.postLogin(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});