var expect = require('chai').expect;
var serviceTypes = require('../../lib/features/ServiceTypes');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');

context('Smoke test for Service-Types', function () {
    var expectedStatus = 200;
    this.timeout(5000);

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                done();
            })
    });


    it('Get /service-types returns 200', function (done) {
        serviceTypes.getServiceType(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});

