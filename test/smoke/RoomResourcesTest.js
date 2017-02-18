var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var room_resources = require('../../lib/features/RoomResources');
var room = require('../../resources/room.json');

context('Smoke test for resources of rooms', function () {
    this.timeout(5000);

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
            resourceRes = res;
            done();
        });
    });
    afterEach(function (done) {
        resources.deleteResource(resourceRes.body._id, function (err, res) {
            done();
        });
    });

    it.only('get resources by id GET /rooms/{roomId}/resources/{:resourceId}', function (done) {
        var jsonJoin = {
            resourceId: resourceRes.body._id,
            quantity: 5
        };
        room_resources.joinRoomResource(room.id, jsonJoin, function (err, res) {
            room_resources.getResourceOfRoom(room.id, res.body.resources[0]._id, function (err, res) {
                expect(200).to.equal(res.status);
                done();
            })
        })
    })
})



