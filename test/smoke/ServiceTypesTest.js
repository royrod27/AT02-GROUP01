var expect = require('chai').expect;
var serviceTypes = require('../../lib/features/ServiceTypes');


context('Smoke test for Service-Types', function () {
    var expectedStatus = 200;
    this.timeout(5000);
   it('Get /service-types returns 200', function (done) {
       serviceTypes.getServiceType(function (err, res) {
           expect(res.status).to.equal(expectedStatus);
           done();
       });
   });
});