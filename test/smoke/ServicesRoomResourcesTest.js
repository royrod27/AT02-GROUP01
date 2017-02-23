/**
 * Created by Fernando on 2/21/2017.
 */
var expect = require('chai').expect;
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var services = require('../../lib/features/Services');
var resources = require('../../lib/features/Resources');
var room = require('../../lib/helpers/room');
var service = require('../../lib/helpers/service');
var credentials = require('../../config/config.json');

context('Smoke tests for Services/Room/Resources endpoint', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);
    var responsePost;
    var idResource;
    var resourceIdInARoom;
    var responseDelete;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                serviceGenerator.generateService(function (err, res) {
                    roomGenerator.getRoom(function (err, res) {
                        var bodyResource =
                            {
                                "name": "TELEVISION",
                                "customName": "Television",
                                "fontIcon": "fa fa-tv",
                                "from": "",
                                "description": "This is a television"
                            };
                        resources.postResources(bodyResource, function (err, res) {
                            idResource = res.body._id;
                            var body2 =
                                {
                                    "resourceId": res.body._id,
                                    "quantity": 5
                                };
                            services.postResourcesOfRoomsOfServices(service._id, room._id, body2, function (err, res) {
                                responsePost = res;
                                done();
                            })
                        });
                    });
                });
            });
    });

    after(function (done) {
        serviceGenerator.deleteService(function (err, res) {
            resources.deleteResource(idResource, function (err, res) {
                responseDelete = res;
                done();
            })
        });
    });

    it('Get /services/{serviceId}/rooms/{roomId}/resources/ returns 200', function (done) {
        services.getResourcesOfRoomsOfServices(service._id, room._id, function (err, res) {
            resourceIdInARoom = res.body[0]._id;
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Post /services/{serviceId}/rooms/{roomId}/resources/ returns 200', function (done) {
        expect(responsePost.status).to.equal(expectedStatus);
        done();
    });

    it('Get /services/{serviceId}/rooms/{roomId}/resources/{resourceId} returns 200', function (done) {
        services.getResourceByIdOfRoomsOfServices(service._id, room._id, resourceIdInARoom, function (err, res) {
            expect(res.status).to.equal(expectedStatus)
            done();
        })
    });

    it('Put /services/{serviceId}/rooms/{roomId}/resources/{resourceId} returns 200', function (done) {
        var putResourceById =
            {
                "quantity": 5
            };
        services.putResourceByIdOfRoomsOfServices(service._id, room._id, resourceIdInARoom, putResourceById, function (err, res) {
            expect(res.status).to.equal(expectedStatus)
            done();
        })
    });

    it('Delete /services/{serviceId}/rooms/{roomId}/resources/{resourceId} returns 200', function (done) {
        resources.deleteResource(idResource, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });
});