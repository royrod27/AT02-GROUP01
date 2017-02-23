var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var room = require('../../lib/helpers/room');

context('Acceptance test for Services', function () {
    this.timeout(5000);
    var expectedStatus = 200;
    var minimumServices = 0;

    var postBody = {
        username: credentials.serviceUsername,
        password: credentials.servicePassword,
        hostname: credentials.hostname
    };
    var postResponseBody;
    var postResponseStatus;

    before(function (done) {
        tokenGenerator.generateToken(function (err, res) {
            done();
        });
    });

    beforeEach(function (done) {
        services.postServices(postBody, function (err, res) {
            minimumServices++;
            postResponseBody = res.body;
            postResponseStatus = res.status;
            roomGenerator.getRoom(function (err, res) {
                done();
            });
        });
    });

    afterEach(function (done) {
        services.deleteService(postResponseBody._id, function (err, res) {
            done();
        });
    });

    it('Get /services', function (done) {
        services.getServices(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body.length).to.be.at.least(minimumServices);
            done();
        })
    });

    it('Post /services', function (done) {
        expect(postResponseStatus).to.equal(expectedStatus);
        expect(postResponseBody.credential.username).to.equal(postBody.username);
        expect(postResponseBody.serviceUrl.includes(postBody.hostname)).to.be.true;
        done();
    });

    it('Get /services/{serviceId}', function (done) {
        services.getService(postResponseBody._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(postResponseBody._id);
            expect(res.body.credential.username).to.equal(postBody.username);
            expect(res.body.serviceUrl.includes(postBody.hostname)).to.be.true;
            done();
        });
    });

    it('Delete /services/{serviceId}', function (done) {
        services.deleteService(postResponseBody._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(postResponseBody._id);
            expect(res.body.serviceUrl.includes(postBody.hostname)).to.be.true;
            expect(res.body.type).to.equal(credentials.serviceType);
            expect(res.body.name).to.equal(credentials.serviceName);
            expect(res.body.version).to.equal(credentials.serviceVersion);
            done();
        });
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}', function (done) {
        services.getARoomOfAService(postResponseBody._id, room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(room._id);
            expect(res.body.serviceId).to.equal(postResponseBody._id);
            expect(res.body.emailAddress).to.equal(room.emailAddress);
            expect(res.body.displayName).to.equal(room.displayName);
            expect(res.body.enabled).to.equal(room.enabled);
            expect(res.body.locationId).to.equal(room.locationId);
            expect(res.body.customDisplayName).to.equal(room.customDisplayName);
            done();
        });
    });
});