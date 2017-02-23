var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var resourcesConfig = require('../../resources/resources.json');
var credentials = require('../../config/config.json')


context('Acceptance Tests for Resources', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);
    var minimumResources = 1;
    var responsePostResourceBody;
    var responsePostResourceStatus;
    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                done();
            })
    });

    beforeEach(function (done) {
        resources.postResources(resourcesConfig.postBody, function (err, res) {
            responsePostResourceBody = res.body;
            responsePostResourceStatus = res.status;
            done();
        })
    });

    afterEach(function (done) {
        resources.deleteResource(responsePostResourceBody._id, function (err, res) {
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
        expect(responsePostResourceStatus).to.equal(expectedStatus);
        expect(responsePostResourceBody.name).to.equal(resourcesConfig.postBody.name);
        expect(responsePostResourceBody.customName).to.equal(resourcesConfig.postBody.customName);
        expect(responsePostResourceBody.fontIcon).to.equal(resourcesConfig.postBody.fontIcon);
        expect(responsePostResourceBody.from).to.equal(resourcesConfig.postBody.from);
        expect(responsePostResourceBody.description).to.equal(resourcesConfig.postBody.description);
        done();
    });

    it('Get /resources/{resourceId}', function (done) {
        resources.getResource(responsePostResourceBody._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(responsePostResourceBody._id);
            expect(res.body.name).to.equal(resourcesConfig.postBody.name);
            expect(res.body.customName).to.equal(resourcesConfig.postBody.customName);
            expect(res.body.fontIcon).to.equal(resourcesConfig.postBody.fontIcon);
            expect(res.body.from).to.equal(resourcesConfig.postBody.from);
            expect(res.body.description).to.equal(resourcesConfig.postBody.description);
            done();
        });
    });

    it('Put /resources/{resourceId}', function (done) {
        resources.putResource(responsePostResourceBody._id, resourcesConfig.putBody, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(responsePostResourceBody._id);
            expect(res.body.name).to.equal(resourcesConfig.putBody.name);
            expect(res.body.customName).to.equal(resourcesConfig.putBody.customName);
            expect(res.body.fontIcon).to.equal(resourcesConfig.putBody.fontIcon);
            expect(res.body.from).to.equal(resourcesConfig.putBody.from);
            expect(res.body.description).to.equal(resourcesConfig.putBody.description);
            done();
        });
    });

    it('Delete /resources/{resourceId}', function (done) {
        resources.deleteResource(responsePostResourceBody._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(responsePostResourceBody._id);
            expect(res.body.name).to.equal(resourcesConfig.postBody.name);
            expect(res.body.customName).to.equal(resourcesConfig.postBody.customName);
            expect(res.body.fontIcon).to.equal(resourcesConfig.postBody.fontIcon);
            expect(res.body.from).to.equal(resourcesConfig.postBody.from);
            expect(res.body.description).to.equal(resourcesConfig.postBody.description);
            done();
        });
    });
});
