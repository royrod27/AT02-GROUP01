var expect = require('chai').expect;
var locations = require('../../lib/features/Locations');
var room = require('../../resources/room.json');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');

before(function (done) {
    tokenGenerator
        .generateToken(function (err, res) {
            done();
        })
});

context.only('Smoke test for Locations', function () {
    this.timeout(10000);

    var body = {
        "name": "jala",
        "customName": "JALA",
        "description": "this is the jala location"
    };

    var locationErr, locationRes;

    beforeEach(function (done) {
        locations.postLocation(body, function (err, res) {
            locationErr = err;
            locationRes = res.body;
            done();
        });
    });

    afterEach(function (done) {
        locations.delLocationById(locationRes._id, function (err, res) {
            done();
        });
    });

    it('GET /locations', function (done) {

        locations.getLocation(function (err, res) {
            expect(200).to.equal(res.status);
            done();
        })
    })

    it('Post /locations', function (done) {
        var bodyJson = {
            "name": "B201",
            "customName": "B201",
            "description": "this is the room"
        };

        locations.postLocation(bodyJson, function (err, res) {
            expect(res.status).to.equal(200);
            locations.delLocationById(res.body._id, function (err, res) {
                done();
            })
        });
    })

    it('Get /locations/{:locationId }', function (done) {
        locations.getLocationById(locationRes._id, function (err, res) {
            expect(res.status).to.equal(200);
            done();
        })

    })

    it('Put /locations/{:locationId }', function (done) {
        var bodyJson = {
            "customName": "Modify"
        };
        locations.putLocationById(locationRes._id, bodyJson, function (err, res) {
            expect(res.status).to.equal(200);
            done();
        })
    })

    it('Delete /locations/{:locationId }', function (done) {
        var bodyJsonDelete = {
            "name": "B20111",
            "customName": "B20111",
            "description": "this is the room"
        };
        locations.postLocation(bodyJsonDelete, function (err, res) {
            locations.delLocationById(locationRes._id, function (err, res) {
                expect(res.status).to.equal(200);
                done();
            })
        })
    })
})




