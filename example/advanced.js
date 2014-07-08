/*
 * boulevard
 * http://github.com/indieisaconcept/boulevard
 *
 * Copyright (c) 2014 Jonathan Barnett
 * Licensed under the MIT license.
 */

'use strict';

var boulevard = require('../'),
    processor = boulevard('./test/fixtures/file/manifest.json', {

        // template:
        // These are rules which are used to classify a route. These values,
        // can then be used for filtering. They can either be a regex or a
        // function

        templates: {

            story   : /story-(.{8})-(\d{13})/,
            gallery : /gallery-(.{8})-(\d{13})/,

            homepage: function (/* String */ route) {
                return route.split('/').length <= 2;
            },

            section : function (/* String */ route, /* Object */ templates) {
                return route.split('/').length >= 3 && !templates.story.test(route);
            }

        },

        // helpers:
        // These are used to process a collection and modify or filter values as
        // required

        helpers: {
            'assets.css': boulevard.helper('rev include'),
            'assets.js' : boulevard.helper('rev include')
        }

    });

['/entertainment/story-fni0cx12-1226975734488'].forEach(function (item) {
    processor(item, function (err, data) {
        console.log(JSON.stringify(data, null, 4));
    });
});
