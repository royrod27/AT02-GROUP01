var expect = require('chai').expect;
var services = require('../../lib/features/Services');
var tokenGenerator = require('../../lib/helpers/TokenGenerator');

context('Smoke test for Services', function () {
    var expectedStatus = 200;
    this.timeout(5000);

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
            username: "Administrator",
            password: "Slayer777",
            hostname: "at02guvi02lab.gualy.lab.local"
        };

        services.postServices(serviceJson, function (err, res) {
            expect(res.status).to.equal(expectedStatus);

            var idService = res.body._id;
            services.deleteService(idService, function (err, res) {
                done();
            });
        });
    });

    it('Delete /services/{serviceId} returns 200', function (done) {
        var serviceJson = {
            username: "Administrator",
            password: "Slayer777",
            hostname: "at02guvi02lab.gualy.lab.local"
        };
        services.postServices(serviceJson, function (err, res) {
            var idService = res.body._id;
            services.deleteService(idService, function (err, res) {

                expect(res.status).to.equal(expectedStatus);
                done()
            });
        });
    });


});