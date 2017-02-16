var expect = require('chai').expect;
var resources = require('../../lib/features/Login');


context('Smoke Tests for Login', function () {
    var expectedStatus = 200;
    this.timeout(5000);

    it('Post /login returns 200', function (done) {
        resources.postLogin(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});