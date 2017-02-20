var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');

context('Smoke Tests for Resources', function () {
    this.timeout(5000);

    var expectedStatus = 200;
    var body = {
        name: 'TELEVISION',
        customName: 'Television',
        fontIcon: 'fa fa-desktop',
        from: "",
        description: 'This is a television'
    };
    var resourceErr, resourceRes;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                done();
            })
    });

    beforeEach(function (done) {
        resources.postResources(body, function (err, res) {
            resourceErr = err;
            resourceRes = res;
            done();
        });
    });
    afterEach(function (done) {
        resources.deleteResource(resourceRes.body._id, function (err, res) {
            done();
        });
    });

    it('Get all resources /resources returns 200', function (done) {
        resources.getResources(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
    it('Post /resources returns 200', function (done) {
        expect(resourceRes.status).to.equal(expectedStatus);
        done();
    });
    it('Put /resources/{id} returns 200', function (done) {
        var idResource = resourceRes.body._id;
        var newBody = {
            name: 'Flag',
            customName: 'FLAG',
            fontIcon: 'fa fa-flag',
            from: "",
            description: 'Now this a Flag'
        };
        resources.putResource(idResource, newBody, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
    it('Delete /resources/{id} resturn 200', function (done) {
        var body = {
            name: 'Flag',
            customName: 'FLAG',
            fontIcon: 'fa fa-flag',
            from: "",
            description: 'This is a flag'
        };
        resources.postResources(body, function (err, res) {
            resources.deleteResource(res.body._id, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                done();
            });
        });
    });
    it('Get a resource /resources/{id} returns 200', function (done) {
        resources.getResource(resourceRes.body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});