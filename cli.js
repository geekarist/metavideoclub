#!/usr/bin/env node

var videoclub = require('./videoclub.js');
var cache = require('./cache.js');

var movieTitle = process.argv.splice(2).join(' ');

var STORES = {
    // canalplay: {name: 'Canal Play', url: 'vod.canalplay.com'},
    virginmega: {name: 'Virgin Mega', url: "www.virginmega.fr", priceSelector: '.cont big', titleSelector: '.videofile h2'},
    videofutur: {name: 'Video Futur', url: 'www.videofutur.fr', priceSelector: '.vodRent .butTop:contains("unit")', titleSelector: '.title h2'},
    tf1vod: {name: 'TF1 VOD', url: "mytf1vod.tf1.fr", priceSelector: '#head-ctn:contains("Louer") span', titleSelector: '#media-title'}
};

for (var store in STORES) {
    var key = {title: movieTitle, store: STORES[store].url};
    var cachedPrice = cache.get(key);
    if (cachedPrice == null) {
        console.log('NOT CACHED');
        videoclub.fetchMoviePrice(movieTitle, STORES[store], function(price) {
            console.log(price);
            cache.put(key, price);
        });
    } else {
        console.log('CACHED');
        console.log(cachedPrice);
    }
}