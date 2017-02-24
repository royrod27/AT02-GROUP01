var expect = require('chai').expect;
var locations = require('../../lib/features/Locations');
var room = require('../../resources/room.json');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');


before(function (done) {
    tokenGenerator
        .generateToken(function (err, res) {
            done();
        })
});

describe('Acceptance test for Locations', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);

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

    it('obtain the location generate GET /locations', function (done) {
        locations.getLocation(function (err, res) {
            expect(res.body[0].name).to.equal(body.name);
            done();
        })
    });

    it('have the same name with it create Post /locations', function (done) {
        var bodyJson = {
            "name": "B204",
            "customName": "B204",
            "description": "this is the room"
        };

        locations.postLocation(bodyJson, function (err, res) {
            expect(res.body.name).to.equal(bodyJson.name);
            locations.delLocationById(res.body._id, function (err, res) {
                done();
            })
        });
    });

    it('obtain the location generate Get /locations/{:locationId }', function (done) {
        locations.getLocationById(locationRes._id, function (err, res) {
            expect(res.body._id).to.equal(locationRes._id);
            done();
        })

    });

    it('have the custom name modify Put /locations/{:locationId }', function (done) {
        var bodyJson = {
            "customName": "Modify"
        };
        locations.putLocationById(locationRes._id, bodyJson, function (err, res) {
            expect(res.body.customName).to.equal(bodyJson.customName);
            done();
        })
    });

    it('the locations is deleted Delete /locations/{:locationId }', function (done) {
        var bodyJsonDelete = {
            "name": "B20111",
            "customName": "B20111",
            "description": "this is the room"
        };
        locations.postLocation(bodyJsonDelete, function (err, res) {
            locations.delLocationById(res.body._id, function (err, res) {
                locations.getLocationById(res.body._id,function (err, res) {
                    expect(res.status).to.equal(404);
                    done();
                })
            })
        })
    })
});