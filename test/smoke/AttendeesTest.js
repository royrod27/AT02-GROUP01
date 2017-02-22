var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var attendees = require('../../lib/features/Attendees');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');


context('Smoke test for Attendees', function () {
    var expectedStatus = 200;
    this.timeout(30000);

    var serviceJson = {
        username: credentials.serviceUsername,
        password: credentials.servicePassword,
        hostname: credentials.hostname
    };

    var filter = "a";
    var serviceId;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                services.postServices(serviceJson, function (err, res) {
                    serviceId = res.body._id;
                    done();
                });
            });
    });

    after(function (done) {
        services.deleteService(serviceId, function (err, res) {
            done();
        })
    });

    it('Get /services/{:serviceId}/attendees{?filter}/ returns 200', function (done) {
        attendees.getAttendees(serviceId, filter, function (err,res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });
});