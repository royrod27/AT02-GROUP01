var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var room_resources = require('../../lib/features/RoomResources');
var room = require('../../lib/helpers/room');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var credentials = require('../../config/config.json');


context('Smoke test for resources of rooms', function () {
    this.timeout(credentials.timeout);

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                serviceGenerator.generateService(function (err, res) {
                    roomGenerator.getRoom(function (err, res) {
                        done();
                    });
                });
            });
    });

    after(function (done) {
        serviceGenerator.deleteService(function (err, res) {
            done();
        });
    });

    var body = {
        name: "testResource",
        customName: "deleteTestResource",
        fontIcon: "fa fa-desktop",
        from: "",
        description: "delete testResource"
    };

    var resourceErr, resourceRes;

    beforeEach(function (done) {
        resources.postResources(body, function (err, res) {
            resourceErr = err;
            resourceRes = res.body;
            done();
        });
    });
    afterEach(function (done) {
        resources.deleteResource(resourceRes._id, function (err, res) {
            done();
        });
    });

    it('The resource associated is the same that the resource created GET /rooms/{:roomId}/resources/{:roomResourceId}', function (done) {
        var jsonJoin = {
            resourceId: resourceRes._id,
            quantity: 5
        };
        room_resources.joinRoomResource(room._id, jsonJoin, function (err, res) {
            room_resources.getResourceOfRoom(room._id, res.body.resources[0]._id, function (err, res) {
                expect(resourceRes._id).to.equal(res.body.resourceId);
                done();
            })
        })
    });

    it('the quantity is modify for the new value PUT /rooms/{:roomId}/resources/{:roomResourceId}', function (done) {
        var quantityModify = 10;
        var jsonJoin = {
            resourceId: resourceRes._id,
            quantity: 5
        };
        room_resources.joinRoomResource(room._id, jsonJoin, function (err, res) {
            room_resources.putResourceOfRoom(room._id, res.body.resources[0]._id, {"quantity": quantityModify}, function (err, res) {
                expect(res.body.resources[0].quantity).to.equal(quantityModify);
                done();
            })
        })
    });

    it('return the resources GET /rooms/{:roomId}/resources', function (done) {

        var jsonJoin = {
            resourceId: resourceRes._id,
            quantity: 5
        };

        var joinResource;

        room_resources.joinRoomResource(room._id, jsonJoin, function (err, res) {
            joinResource = res.body;
            room_resources.getResourcesByRoom(room._id, function (err, res) {
                expect(res.body[0]._id).to.equal(joinResource.resources[0]._id);
                done();
            })
        })
    });

    it('the resource is created POST /rooms/{:roomId}/resources/', function (done) {
        var joinResourceToRoom = {
            resourceId: resourceRes._id,
            quantity: 8
        };
        room_resources.joinRoomResource(room._id, joinResourceToRoom, function (err, res) {
            expect(resourceRes._id).to.equal(res.body.resources[0].resourceId);
            done();
        })
    })
});
