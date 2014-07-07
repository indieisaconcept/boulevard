/*
 * boulevard
 * http://github.com/indieisaconcept/boulevard
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

'use strict';

var boulevard = require('../../');

module.exports = {

    // helper:
    // These are used to process a collection and modify or filter values as
    // required

    helper: {
        tests: [

            {
                description: 'should return a config for a route that has had it\'s collections modified by a helper',
                route: '/foo/story-12345678-1234567891011',
                expected: {
                    template: {},
                    config: {
                        assets: {
                            css: ['a.css'],
                            js: ['a_010.js', 'b_010.js']
                        }
                    }
                }
            }

        ],
        source: {
            version: '0.1.0',
            route: {
                foo: {
                    config: {
                        assets: {
                            js: ['a.js', 'b.js'],
                            css: ['a.css', {
                                href: 'b.css',
                                include: {
                                    story: false
                                }
                            }],
                        }
                    }
                }
            }
        },
        options: {
            helpers: {
                'assets.js': boulevard.helper('rev'),
                'assets.css': boulevard.helper('include')
            }
        }
    }

};