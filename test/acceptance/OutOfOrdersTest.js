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
    var orderJson, bodyChanged;
    var outOfOrder_body, room_body;
    var outOfOrder_status;

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                services.postServices(serviceJson, function (err, res) {
                    serviceId = res.body._id;
                    roomGenerator.getRoom(function (err, res) {
                        room_body = res.body;
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
            expect(res.body[0]._id).to.equal(outOfOrder_body._id);
            expect(res.body[0].roomId).to.equal(room_body[0]._id);
            expect(res.body[0].title).to.equal(orderJson.title);
            done();
        })
    });


    it('Post /services/{:serviceId}/rooms/{:roomId}/out-of-orders returns 200', function (done) {
        expect(outOfOrder_status).to.equal(expectedStatus);
        expect(outOfOrder_body.roomId).to.equal(room._id);
        expect(outOfOrder_body.title).to.equal(orderJson.title);
        expect(orderJson.sendEmail).to.be.false;
        done();
    });

    it('Get /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        outOfOrders.getOutOfOrdersById(serviceId, room._id, outOfOrder_body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(outOfOrder_body._id);
            expect(res.body.roomId).to.equal(room._id);
            expect(res.body.title).to.equal(orderJson.title);
            expect(res.body.sendEmail).to.be.false;
            done();
        });
    });

    it('Put /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        bodyChanged = {
            title: "Out_of_Order"
        };
        outOfOrders.putOutOfOrdersById(serviceId, room._id, outOfOrder_body._id, bodyChanged, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(outOfOrder_body._id);
            expect(res.body.roomId).to.equal(room._id);
            expect(res.body.title).to.equal(bodyChanged.title);
            done();
        });
    });

    it('Delete /services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId} returns 200', function (done) {
        outOfOrders.deleteOutOfOrdersById(serviceId, room._id, outOfOrder_body._id, function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            expect(res.body._id).to.equal(outOfOrder_body._id);
            expect(res.body.roomId).to.equal(room._id);
            expect(res.body.sendEmail).to.be.false;
            done();
        });
    });
});