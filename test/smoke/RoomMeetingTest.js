var expect = require('chai').expect;
var meetings = require('../../lib/features/RoomMeetings');
var room_resources = require('../../lib/features/RoomResources');
var room = require('../../lib/helpers/room');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var locations = require('../../lib/features/Locations');
var rooms = require('../../lib/features/Rooms');
var conf = require('../../config/config.json');
var moment = require('moment');

context('Smoke test for meetings', function () {
    this.timeout(10000);
    var serviceId;

    var body = {
        organizer: 'Administrator',
        title: 'bla',
        start: moment().add(9, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        end: moment().add(10, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        location: '',
        roomEmail: 'gualy777@gualy.lab.local',
        resources: [],
        attendees: []
    };

    var bodyJson = {
        "name": "B333",
        "customName": "B333",
        "description": "this is the room"
    };

    var modifiedRoom = {
        locationId: ""
    };

    var meetingErr, meetingRes;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                serviceGenerator.generateService(function (err, res) {
                    serviceId = res.body._id;
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

    beforeEach(function (done) {
        locations.postLocation(bodyJson, function (err, res) {
            modifiedRoom.locationId = res.body._id;
            rooms.putRoomsById(room._id, modifiedRoom, function (err, res) {
                body.organizer = conf.serviceUsername;
                body.location = room.displayName;
                body.roomEmail = room.emailAddress;
                meetings.postMeetings(room._id, serviceId, body, function (err, res) {
                    meetingErr = err;
                    meetingRes = res.body;
                    done();
                });
            });
        });
    });

    it.only('- GET /rooms/{:roomId}/meetings', function (done) {
        meetings.getMeetings(room._id, function (err, res) {
            done();
        })
    })
});