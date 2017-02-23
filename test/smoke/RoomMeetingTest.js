var expect = require('chai').expect;
var meetings = require('../../lib/features/RoomMeetings');
var room_resources = require('../../lib/features/RoomResources');
var room = require('../../lib/helpers/room');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var locations = require('../../lib/features/Locations');
var rooms = require('../../lib/features/Rooms');
var credentials = require('../../config/config.json');
var moment = require('moment');
var service = require('../../lib/helpers/service');


context.only('Smoke test for meetings', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);
    var start = 210;
    var end = 211;
    var meeting_status, meeting_id, meetingDel_status;

    var body = {
        organizer: 'Administrator',
        title: 'titleMeet',
        start: moment().add(start, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        end: moment().add(end, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        location: '',
        roomEmail: 'gualy777@gualy.lab.local',
        resources: [],
        attendees: []
    };

    var locationBody = {
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
        locations.postLocation(locationBody, function (err, res) {
            modifiedRoom.locationId = res.body._id;
            rooms.putRoomsById(room._id, modifiedRoom, function (err, res) {
                body.location = room.displayName;
                body.roomEmail = room.emailAddress;
                meetings.postMeetings(room._id, service._id, body, function (err, res) {
                    meetingErr = err;
                    meetingRes = res.body;
                    meeting_id = res.body._id;
                    meeting_status = res.status;
                    done();
                });
            });
        });
    });

    afterEach(function (done) {
        locations.delLocationById(modifiedRoom.locationId, function (err, res) {
            meetings.deleteMeetings(meetingRes._id, meetingRes.serviceId, meetingRes.roomId, function (err, res) {
                meetingDel_status = res.status;
                done();
            })
        })
    })

    it('- GET /rooms/{:roomId}/meetings', function (done) {
        meetings.getMeetings(room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done) {
        meetings.getMeetingsWithService(service._id, room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Post /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done) {
        expect(meeting_status).to.equal(expectedStatus);
         done();
     });

    it('Get /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId} returns 200', function (done) {
        meetings.getMeetingsWithServiceById(service._id, room._id, meeting_id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Put /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId} returns 200', function (done) {
        var meetingChanged = {
            title: "new title",
            start: moment().add(start+10, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            end: moment().add(end+10, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            attendees: ["Administrator@gualy.lab.local"],
            optionalAttendees: []
        };

        meetings.putMeetingsWithServiceById(service._id, room._id, meeting_id, meetingChanged, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Delete /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done) {
        expect(meetingDel_status).to.equal(expectedStatus);
        done();
    });

    //////////
    it.skip('Post /services/{:serviceId}/rooms/{:roomId}/meetings/cancel?{:meetingId}',function (done) {
        meetings.postCancelMeetingsServiceById(service._id, room._id, meeting_id, function (err, res) {
            console.log(err);
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });
    ////////
});