var expect = require('chai').expect;
var serviceTypes = require('../../lib/features/ServiceTypes');

describe('Smoke Test for Service-Types', function () {
    var expectedStatus = 200;
    this.timeout(5000);
});

context('GET test', function () {
   it('Get /service-types returns 200', function (done) {
       serviceTypes.getServiceType(function (err, res) {
           console.log(res.status);
           done();
       });
   });
});