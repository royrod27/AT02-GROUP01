var expect = require('chai').expect;
var login = require('../../lib/features/Login');
var credentials = require('../../config/config.json');
var moment = require('moment');


context('Acceptance Tests for Login', function () {
    var expectedStatus = 200;
    this.timeout(5000);

    it('Post /login request returns 200, it has the same username than username on credentials' +
        ' and, the day of creation is today.', function (done) {
        login.postLogin(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body.username).to.equal(credentials.username);
            expect(moment(res.body.createdAt).date()).to.equal(moment().date());
            done();
        });
    });
});