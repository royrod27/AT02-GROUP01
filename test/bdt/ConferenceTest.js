var expect = require('chai').expect;
var rooms = require('../../lib/features/Rooms');
var room = require('../../lib/helpers/room');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var serviceGenerator = require('../../lib/helpers/ServiceGenerator');
var locations = require('../../lib/features/Locations');
var credentials = require('../../config/config.json');

/*Variable*/
var roomsRes;
var idRoomTarata;
var idPlantaBaja;
var idPueblito;
var idJala;

describe('Reassign the disable conference room', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);
    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                serviceGenerator.generateService(function (err, res) {
                    done();
                });
            });
    });
    after(function (done) {
        var jsonRoom = {
            "enabled": true
        };
        rooms.putRoomsById(roomsRes[1]._id, jsonRoom, function (err, res) {
            serviceGenerator.deleteService(function (err, res) {
                locations.delLocationById(idPueblito, function (err, res) {
                    locations.delLocationById(idPlantaBaja, function (err, res) {
                        locations.delLocationById(idJala, function (err, res) {
                            done();
                        });
                    })
                })
            })

        });
    });

    context('Given I have a disabled conference room (Tarata)', function () {
        before(function (done) {
            roomGenerator.getRoom(function (err, res) {
                rooms
                    .getRooms(function (err, res) {
                        roomsRes = res.body;
                        var jsonRoom = {
                            "enabled": false
                        };
                        rooms.putRoomsById(roomsRes[1]._id, jsonRoom, function (err, res) {
                            idRoomTarata = res.body._id;
                            done();
                        })

                    })
            });
        });


        it('And I have (Tarata) assigned to (Jalasoft/Planta Baja)', function (done) {

            var locationJson = {
                name: "Jalasoft",
                customName: "Jalasoft",
                description: "bla bla"

            };
            locations.postLocation(locationJson, function (err1, res1) {
                idJala = res1.body._id;
                var locationsTwo = {
                    name: "PlantaBaja",
                    customName: "PlantaBaja",
                    parentId: res1.body._id
                };
                locations.postLocation(locationsTwo, function (err2, res2) {
                    idPlantaBaja = res2.body._id;
                    var jsonLocation = {
                        locationId: res2.body._id
                    };
                    rooms.putRoomsById(idRoomTarata, jsonLocation, function (err, res) {
                        done();
                    });
                });
            });
        });
        it('And I have the location (Jalasoft\Planta Baja\Pueblito)', function (done) {
            var locationsThree = {
                name: "Pueblito",
                customName: "Pueblito",
                parentId: idPlantaBaja
            };
            locations.postLocation(locationsThree, function (err, res) {
                idPueblito = res.body._id;
                done();
            })
        });

        it('And I have conference room (Quillacollo) is  assigned  to (Jalasoft\Planta Baja\Pueblito)', function (done) {

            rooms.putRoomsById(roomsRes[2]._id, {locationId: idPueblito}, function (err, res) {
                done();
            })
        })
    });

    context('When I assign (Tarata)  to (Jalasoft\Planta Baja\Pueblito)', function () {
        var resTarataPueblito;
        before(function (done) {
            rooms.putRoomsById(roomsRes[1]._id, {locationId: idPueblito}, function (err, res) {
                resTarataPueblito = res;
                done();
            })
        });

        it('Then  Tarata is correctly assigned to the new location', function () {
            expect(resTarataPueblito.status).to.equal(expectedStatus);
            expect(resTarataPueblito.body.locationId).to.equal(idPueblito);
        });

        it('And Tarata status is still disabled', function () {
            expect(resTarataPueblito.body.enabled).to.be.false;
        });

        it('And the total number of conference rooms assigned to (Jalasoft\Planta Baja\Pueblito) is 2', function (done) {
            rooms.getRooms(function (err, res) {
                var value = 0;
                res.body.filter(x => x.locationId == idPueblito).forEach(y => value++);
                expect(value).to.equal(2);
                done();
            });
        });
        it('And the total number of conference rooms assigned to (Jalasoft\Planta Baja) is 0', function (done) {
            rooms.getRooms(function (err, res) {
                var value = 0;
                res.body.filter(x => x.locationId == idPlantaBaja).forEach(y => value++);
                expect(value).to.equal(0);
                done();
            });
        });
    });
});