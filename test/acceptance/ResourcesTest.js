var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var resourcesConfig = require('../../resources/resources.json');


context('Acceptance Tests for Resources', function () {
    this.timeout(5000);
    var expectedStatus = 200;
    var minimumResources = 1;
    var responsePostResource;
    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                done();
            })
    });

    beforeEach(function (done) {
        resources.postResources(resourcesConfig.postBody, function (err, res) {
            responsePostResource = res;
            done();
        })
    });

    afterEach(function (done) {
        resources.deleteResource(responsePostResource.body._id, function (err, res) {
            done();
        })
    });

    it('Get /resources', function (done) {
        resources.getResources(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body.length).to.be.at.least(minimumResources);
            done();
        });
    });

    it('Post /resources', function (done) {
        expect(responsePostResource.status).to.equal(expectedStatus);
        expect(responsePostResource.body.name).to.equal(resourcesConfig.postBody.name);
        expect(responsePostResource.body.customName).to.equal(resourcesConfig.postBody.customName);
        expect(responsePostResource.body.fontIcon).to.equal(resourcesConfig.postBody.fontIcon);
        expect(responsePostResource.body.from).to.equal(resourcesConfig.postBody.from);
        expect(responsePostResource.body.description).to.equal(resourcesConfig.postBody.description);
        done();
    });

    it('Get /resources/{resourceId}', function (done) {
        resources.getResource(responsePostResource.body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(responsePostResource.body._id);
            expect(res.body.name).to.equal(resourcesConfig.postBody.name);
            expect(res.body.customName).to.equal(resourcesConfig.postBody.customName);
            expect(res.body.fontIcon).to.equal(resourcesConfig.postBody.fontIcon);
            expect(res.body.from).to.equal(resourcesConfig.postBody.from);
            expect(res.body.description).to.equal(resourcesConfig.postBody.description);
            done();
        });
    });

    it('Put /resources/{resourceId}', function (done) {
        resources.putResource(responsePostResource.body._id, resourcesConfig.putBody, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(responsePostResource.body._id);
            expect(res.body.name).to.equal(resourcesConfig.putBody.name);
            expect(res.body.customName).to.equal(resourcesConfig.putBody.customName);
            expect(res.body.fontIcon).to.equal(resourcesConfig.putBody.fontIcon);
            expect(res.body.from).to.equal(resourcesConfig.putBody.from);
            expect(res.body.description).to.equal(resourcesConfig.putBody.description);
            done();
        });
    });

    it('Delete /resources/{resourceId}', function (done) {
        resources.deleteResource(responsePostResource.body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(responsePostResource.body._id);
            expect(res.body.name).to.equal(resourcesConfig.postBody.name);
            expect(res.body.customName).to.equal(resourcesConfig.postBody.customName);
            expect(res.body.fontIcon).to.equal(resourcesConfig.postBody.fontIcon);
            expect(res.body.from).to.equal(resourcesConfig.postBody.from);
            expect(res.body.description).to.equal(resourcesConfig.postBody.description);
            done();
        });
    });
});
