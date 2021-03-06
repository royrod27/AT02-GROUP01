var expect = require('chai').expect;
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var rooms = require('../../lib/features/Rooms');
var room = require('../../lib/helpers/room');
var credentials = require('../../config/config.json');


describe('Acceptance tests for Rooms endpoint', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);
    var minimumRoomsExpected = 1;

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


    it('Get /Rooms returns all rooms', function (done) {
        rooms.getRooms(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body.length).to.be.at.least(minimumRoomsExpected);
            done();
        });
    });

    it('Put /Rooms/{roomId} returns the first room modified', function (done) {
        var modifiedRoom = {
            displayName: 'GualyVc',
            customDisplayName: 'GualyVc'
        };
        rooms.putRoomsById(room._id, modifiedRoom, function (err, res) {

            var putRoomBody = res.body;
            expect(putRoomBody.displayName).to.equal(modifiedRoom.displayName)
            expect(putRoomBody.customDisplayName).to.equal(modifiedRoom.customDisplayName)
            expect(putRoomBody._id).to.be.equal(room._id)
            expect(putRoomBody.serviceId).to.be.equal(room.serviceId)
            expect(putRoomBody.enable).to.be.equal(room.enable)
            expect(res.status).to.equal(expectedStatus);
            var recoverRoom = {
                displayName: room.displayName,
                customDisplayName: room.customDisplayName
            };
            rooms.putRoomsById(room._id, recoverRoom, function (err, res) {
                done();
            })
        });
    });

    it('Get /Rooms/{roomId} - returns an specific Room by its Id', function (done) {
        rooms.getRoomsById(room._id, function (err, res) {
            var getRoomByIdBody = res.body;
            expect(getRoomByIdBody._id).to.equal(room._id)
            expect(getRoomByIdBody.displayName).to.equal(room.displayName)
            expect(getRoomByIdBody.customDisplayName).to.equal(room.customDisplayName)
            expect(getRoomByIdBody.serviceId).to.equal(room.serviceId)
            expect(getRoomByIdBody.enable).to.equal(room.enable)
            expect(getRoomByIdBody.Url).to.equal(room.Url)
            expect(getRoomByIdBody.__v).to.equal(room.__v)
            expect(getRoomByIdBody.locationId).to.equal(room.locationId)
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });
});