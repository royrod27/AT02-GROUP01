var expect = require('chai').expect;
var rooms = require('../../lib/features/Rooms');
var room = require('../../lib/helpers/room');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var credentials = require('../../config/config.json');


context('Smoke Tests for Rooms', function () {
    var expectedStatus = credentials.StatusOK;
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

    it('Get all rooms /rooms returns 200', function (done) {
        rooms.getRooms(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Put /rooms/{id} returns 200', function (done) {
        var modifiedRoom = {
            displayName: 'displayNameModified',
            customDisplayName: 'customDisplayNameModified'
        };
        rooms.putRoomsById(room._id, modifiedRoom, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Get a Room by Id /rooms/{id} returns 200', function (done) {
        rooms.getRoomsById(room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus)
            done();
        });
    });
});