var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var outOfOrders = require('../../lib/features/OutOfOrders');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var room = require('../../lib/helpers/room');



context('Smoke test for Services', function () {
    var expectedStatus = 200;
    this.timeout(30000);

    var serviceJson = {
        username: credentials.serviceUsername,
        password: credentials.servicePassword,
        hostname: credentials.hostname
    };
    var serviceRes;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                services.postServices(serviceJson, function (err, res) {
                    serviceRes = res;
                    roomGenerator.getRoom(function (err, res) {
                        done();
                    })
                });
            });
    });

    after(function (done) {
        services.deleteService(serviceRes.body._id, function (err, res) {
            done();
        })
    });


    it('Get /services returns 200', function (done) {
        services.getServices(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Post /services returns 200', function (done) {
        expect(serviceRes.status).to.equal(expectedStatus);
        done();
    });

    it('Get /services/{serviceId} returns 200', function (done) {
        services.getService(serviceRes.body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done()
        });
    });

//Room manager cannot load rooms from the database after the following test.
    it.skip('Get /services/{serviceId}/rooms returns 200', function (done) {
        var serviceJson = {
            username: credentials.serviceUsername,
            password: credentials.servicePassword,
            hostname: credentials.hostname
        };
        services.postServices(serviceJson, function (err, res) {
            var idService = res.body._id;
            services.getRoomsOfAService(idService, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                services.deleteService(idService, function (err, res) {
                    setTimeout(done(), 20000);
                });
            });
        });
    });

    it('Get /services/{serviceId}/rooms/{roomId} returns 200', function (done) {
        services.getARoomOfAService(serviceRes.body._id, room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns 200', function (done) {
        outOfOrders.getOutOfOrders(serviceRes.body._id, room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Post /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns 200', function (done) {
        var body = {
            from: "",
            to: "",
            title: "Temporarily Out of Order",
            roomId: ''+room._id+'',
            sendEmail: false
        };

        outOfOrders.postOutOfOrders(serviceRes.body._id, room._id, body, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        var body = {
            from: "",
            to: "",
            title: "Temporarily Out of Order",
            roomId: ''+room._id+'',
            sendEmail: false
        };

        outOfOrders.postOutOfOrders(serviceRes.body._id, room._id, body, function (err, res) {
            var outOfOrder_id =  res.body._id;
            outOfOrders.getOutOfOrdersById(serviceRes.body._id, room._id, outOfOrder_id, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                done();
            })
        })
    });

    it.only('Put /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        var body = {
            from: "",
            to: "",
            title: "Temporarily Out of Order",
            roomId: ''+room._id+'',
            sendEmail: false
        };

        outOfOrders.postOutOfOrders(serviceRes.body._id, room._id, body, function (err, res) {
            var outOfOrder_id =  res.body._id;
            var bodyChanged = {
                title: "Out_of_Order"
            };
            outOfOrders.putOutOfOrdersById(serviceRes.body._id, room._id, outOfOrder_id, bodyChanged, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                console.log(res.body);
                done();
            })
        })
    });

    it('Delete /services/{serviceId} returns 200', function (done) {
        var idService = serviceRes.body._id;
        services.deleteService(idService, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done()
        });
    });
});