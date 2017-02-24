var expect = require('chai').expect;
var serviceTypes = require('../../lib/features/ServiceTypes');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');


describe('Smoke test for Service-Types', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);

    it('Get /service-types returns 200', function (done) {
        serviceTypes.getServiceType(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});