var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');
var credentials = require('../../config/config.json');

context('Smoke test for Services', function () {
    var expectedStatus = 200;
    this.timeout(30000);

    before(function (done) {
        tokenGenerator
            .generateToken(function (err, res) {
                if (err) console.log(err.response);
                done();
            });
    });

    it('Get /services returns 200', function (done) {
        services.getServices(function (err, res) {
            expect(res.status).to.equal(expectedStatus);
            done();
        });
    });

    it('Post /services returns 200', function (done) {
        var serviceJson = {
            username: credentials.serviceUsername,
            password: credentials.servicePassword,
            hostname: credentials.hostname
        };

        services.postServices(serviceJson, function (err, res) {
            expect(res.status).to.equal(expectedStatus);

            var idService = res.body._id;
            services.deleteService(idService, function (err, res) {
                done();
            });
        });
    });

    it('Get /services/{serviceId} returns 200', function (done) {
        var serviceJson = {
            username: credentials.serviceUsername,
            password: credentials.servicePassword,
            hostname: credentials.hostname
        };
        services.postServices(serviceJson, function (err, res) {
            var idService = res.body._id;

            services.getService(idService, function (err, res) {
                expect(res.status).to.equal(expectedStatus);
                services.deleteService(idService, function (err, res) {
                    done()
                });
            });
        });
    });


    it('Delete /services/{serviceId} returns 200', function (done) {
        var serviceJson = {
            username: credentials.serviceUsername,
            password: credentials.servicePassword,
            hostname: credentials.hostname
        };
        services.postServices(serviceJson, function (err, res) {
            var idService = res.body._id;
            services.deleteService(idService, function (err, res) {

                expect(res.status).to.equal(expectedStatus);
                done()
            });
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

});