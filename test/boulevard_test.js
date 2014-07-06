/*jshint -W068, unused: false */

'use strict';

var boulevard = require('../'),
    util      = require('../lib/util'),
    fixtures  = require('./fixtures'),
    should    = require('should');

describe('boulevard', function() {

    describe('[ COMMON ]', function () {

        it('should be a function', function() {
            var result = boulevard.should.be.an.Function;
        });

        it('should have a helper method', function() {
            var result = boulevard.helper.should.be.an.Function;
        });

        it('should throw an error if no manifest path specified', function () {
            (function () {
                boulevard();
            }).should.throw();
        });

        it('should throw an error if a manifest is not found', function () {
            (function () {
                boulevard('./manifest.json');
            }).should.throw();
        });

    });

    describe('[ ROUTES ]', function () {

        Object.keys(fixtures).forEach(function (fixture) {
        //['simple', 'inherited', 'helper', 'template'].forEach(function (fixture) {

            describe('[ ' + fixture.toUpperCase() + ' ]', function () {

                var name      = fixture,
                    current   = fixtures[fixture],
                    processor = boulevard(current.source, current.options || {});

                // it('function if a manifest is found', function () {
                //     var result = processor.should.an.Function;
                // });

                var tests   = Array.isArray(current.tests) && current.tests || [];

                tests.forEach(function (test) {

                    var method = test.skip ? it.skip : it;

                    method(test.description, function (done) {

                       processor(test.route).on('data', function (err, data) {

                            if (err) {
                                return done(err);
                            }

                            var result = util.isFunction(test.expected) && test.expected(data) ||
                                         data.should.be.an.Object && should(data).eql(test.expected);

                            done();

                        });

                    });

                });

            });

        });

    });

});
