var assert = require('assert');
var videoclub = require('./videoclub.js');

describe('videoclub', function() {
    it('should find batman begins on virgin mega', function(done) {
        // GIVEN
        // WHEN
        videoclub.fetchMoviePrice(
            'batman begins',
            {   name: 'Virgin Mega',
                url: "www.virginmega.fr",
                priceSelector: '.cont big', titleSelector: '.videofile h2'},
            function(result) {
                // THEN
                assert.equal(result, 'Found as "Batman Begins - VOST" for 3.99 € at Virgin Mega (see http://www.virginmega.fr/video/film/batman-begins-vost-106730638,normal,page1.htm)');
                done();
            });
    });
});
