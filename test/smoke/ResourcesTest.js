var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');

context('Smoke Tests for Resources', function () {
    var expectedStatus = 200;
    this.timeout(5000);




    it('Get /login returns 200', function (done) {
        resources.getResources(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});
