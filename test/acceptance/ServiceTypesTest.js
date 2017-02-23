var expect = require('chai').expect;
var serviceTypes = require('../../lib/features/ServiceTypes');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var serviceTypesJson = require('../../resources/service-types.json');
var credentials = require('../../config/config.json');

context('Acceptance test for Service-Types', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);

    it('Get /service-types returns 200', function (done) {
        serviceTypes.getServiceType(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body[0].name).to.equal(serviceTypesJson.serviceName);
            expect(res.body[0].version).to.equal(serviceTypesJson.serviceVersion);
            expect(res.body[0].support[0]).to.equal(serviceTypesJson.support);
            done();
        });
    });
});


