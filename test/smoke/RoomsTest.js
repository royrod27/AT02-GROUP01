var expect = require('chai').expect;
var rooms = require('../../lib/features/Rooms');
var room = require('../../lib/helpers/room');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');

context('Smoke Tests for Rooms', function () {
    this.timeout(5000);
    var expectedStatus = 200;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                done();
            })
    });

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
})
