var expect = require('chai').expect;
var meetings = require('../../lib/features/Meetings');
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

    // after(function (done) {
    //     serviceGenerator.deleteService(function (err, res) {
    //         done();
    //     });
    // });

    var body = {
        organizer: "Administrator",
        title: "meeting generated",
        start: "2017-02-22T14:00:00.000Z",
        end: "2017-02-22T15:00:00.000Z",
        location: "",
        roomEmail: ""

    };

    // var body = {
    //     organizer: 'Administrator',
    //     title: 'bla',
    //     start: moment().add(1, 'hours')().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //     end: moment().add(2, 'hours').utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //     location: '',
    //     roomEmail: 'gualy777@gualy.lab.local',
    //     resources: ["gualy777@gualy.lab.local"],
    //     attendees: ["Administrator@gualy.lab.local"]
    // };

    var bodyJson = {
        "name": "B333",
        "customName": "B333",
        "description": "this is the room"
    };

    var modifiedRoom = {
        locationId: ""
    };

    var meetingErr, meetingRes;

    beforeEach(function (done) {

        locations.postLocation(bodyJson, function (err, res) {
            modifiedRoom.locationId = res.body._id;
            console.log('--------------------');
            console.log(modifiedRoom.locationId);
            console.log('--------------------');

            rooms.putRoomsById(room._id, modifiedRoom, function (err, res) {
                body.organizer = conf.serviceUsername;
                body.location = room.displayName;
                body.roomEmail = room.emailAddress;
                // body.resources[0] = room.emailAddress;
                console.log('--------------------');
                console.log(res.body);
                console.log('--------------------');
                meetings.postMeetings(room._id, body, function (err, res) {
                    console.log('--------------------');
                    console.log(res.body);
                    console.log('--------------------');
                    meetingErr = err;
                    meetingRes = res.body;
                    done();
                });

            });


        });
    });
    // afterEach(function (done) {
    //     meetings.deleteResource(meetingRes, function (err, res) {
    //         done();
    //     });
    // });

    it.only('- GET /rooms/{:roomId}/meetings', function (done) {
        meetings.getMeetings(room._id, function (err, res) {
            console.log(res.status)
            done();
        })
    })


})
