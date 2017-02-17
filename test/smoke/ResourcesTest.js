var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');

context('Smoke Tests for Resources', function () {
    var expectedStatus = 200;
    this.timeout(5000);
    var body = {
        name: 'TELEVISION',
        customName: 'Television',
        fontIcon: 'fa fa-desktop',
        from: "",
        description: 'This is a television'
    };

    it('Get all resources /resources returns 200', function (done) {
        resources.getResources(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Post /resources returns 200', function (done) {
        resources.postResources(body, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            resources.deleteResource(res.body._id, function (err, res) {
                done();
            });
        });
    });

    it('Put /resources/{id} returns 200', function (done) {

        resources.postResources(body, function (err, res) {
            var idResource = res.body._id;
            var newBody = {
                name: 'Flag',
                customName: 'FLAG',
                fontIcon: 'fa fa-flag',
                from: "",
                description: 'Now this a Flag'
            };

            resources.putResource(idResource, newBody, function (err, res) {
                expect(res.status).to.equal(expectedStatus);

                resources.deleteResource(res.body._id, function (err, res) {
                    done();
                });
            });
        });
    });


    it('Delete /resources/{id} resturn 200', function (done) {
        resources.postResources(body, function (err, res) {
            resources.deleteResource(res.body._id, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                done();
            });
        });
    });

    it('Get a resource /resources/{id} returns 200', function (done) {
        resources.postResources(body, function (err, res) {
            var idResource = res.body._id;
            resources.getResource(idResource, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                resources.deleteResource(res.body._id, function (err, res) {
                    done();
                });
            });
        });
    });
});