var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var meetings = require('../../lib/features/Meetings');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var room = require('../../lib/helpers/room');


context.skip('Smoke test for Meetings', function () {
    var expectedStatus = 200;
    this.timeout(30000);

    var serviceJson = {
        username: credentials.serviceUsername,
        password: credentials.servicePassword,
        hostname: credentials.hostname
    };

    var serviceId;
    var meetingJson;
    var meeting_body;
    var meeting_status;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {

                services.postServices(serviceJson, function (err, res) {
                    serviceId = res.body._id;
                    roomGenerator.getRoom(function (err, res) {
                        meetingJson = {
                            organizer: "a.user",
                            title: "my meeting",
                            start: "",
                            end: "",
                            location: "Room 102",
                            roomEmail: "room102@myexchange.com",
                            resources: [
                                "room102@myexchange.com"
                            ],
                            attendees: [
                                "a.user@myexchange.com"
                            ]
                        };

                        meetings.postMeetings(serviceId, room._id, meetingJson, function (err, res) {
                            meeting_body = res.body;
                            meeting_status = res.status;
                            done();
                        })
                    })

                });
            });
    });


    after(function (done) {
        services.deleteService(serviceId, function (err, res) {
            done();
        })
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done) {
        meetings.getMeetings(serviceId, room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });


    it('Post /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done) {
        expect(meeting_status).to.equal(expectedStatus);
        done();
    });
});

