var expect = require('chai').expect;
var resources = require('../../lib/features/Resources');
var rooms = require('../../lib/features/Rooms');
var room = require('../../resources/room.json');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');

context('Smoke Tests for Rooms', function () {
    this.timeout(5000);
    var expectedStatus = 200;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                done();
            })
    });

    it('Get all rooms /rooms returns 200', function (done) {
        rooms.getRooms(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Put /rooms/{id} returns 200', function (done) {
        var modifiedRoom = {
            displayName: 'displayNameModified', //Key bug, changing customDisplayName instead.
            customDisplayName: 'customDisplayNameModified'
        };
        rooms.putRoomsById(room.id, modifiedRoom, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    // Test to obtain rooms by Id
    it('Get a Room by Id /rooms/{id} returns 200', function (done) {
        rooms.getRoomsById(room.id, function (err, res) {
            expect(res.status).to.equal(expectedStatus)
            done();
        });
    });
})