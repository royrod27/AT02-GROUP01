var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var outOfOrders = require('../../lib/features/OutOfOrders');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');
var roomGenerator = require('../../lib/helpers/GetterRoom');
var room = require('../../lib/helpers/room');


describe('Smoke test for Out-Of-Orders', function () {
    var expectedStatus = credentials.StatusOK;
    this.timeout(credentials.timeout);

    var serviceJson = {
        username: credentials.serviceUsername,
        password: credentials.servicePassword,
        hostname: credentials.hostname
    };

    var serviceId;
    var orderJson;
    var outOfOrder_body;
    var outOfOrder_status;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                services.postServices(serviceJson, function (err, res) {
                    serviceId = res.body._id;
                    roomGenerator.getRoom(function (err, res) {
                        orderJson = {
                            from: "",
                            to: "",
                            title: "Temporarily Out of Order",
                            roomId: '' + room._id + '',
                            sendEmail: false
                        };

                        outOfOrders.postOutOfOrders(serviceId, room._id, orderJson, function (err, res) {
                            outOfOrder_body = res.body;
                            outOfOrder_status = res.status;
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

    it('Get /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns 200', function (done) {
        outOfOrders.getOutOfOrders(serviceId, room._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    });


    it('Post /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns 200', function (done) {
        expect(outOfOrder_status).to.equal(expectedStatus);
        done();
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        outOfOrders.getOutOfOrdersById(serviceId, room._id, outOfOrder_body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Put /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        var bodyChanged = {
            title: "Out_of_Order"
        };
        outOfOrders.putOutOfOrdersById(serviceId, room._id, outOfOrder_body._id, bodyChanged, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Delete /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        outOfOrders.deleteOutOfOrdersById(serviceId, room._id, outOfOrder_body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Get /out-of-orders',function (done) {
        outOfOrders.getOutOfOrdersWithOutService(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        })
    })
});