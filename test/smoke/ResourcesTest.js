var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');

context('Smoke Tests for Resources', function () {
    var expectedStatus = 200;
    this.timeout(5000);


    it('Get /resources returns 200', function (done) {
        resources.getResources(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Post /resources returns 200', function (done) {
        var body = {
            name: 'TELEVISION',
            customName: 'Television',
            fontIcon: 'fa fa-desktop',
            from: "",
            description: 'This is a television'
        };

        resources.postResources(body, function (err, res) {
            expect(res.status).to.equal(expectedStatus);

            resources.deleteResource(res.body._id, function (err, res) {
                done();
            });
        });
    });
});