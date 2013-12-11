#!/usr/bin/env node

var cheerio = require('cheerio');
var request = require('request');

var movieTitle = process.argv.splice(2).join(' ');

var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1';
var STORES = {
    // canalplay: {name: 'Canal Play', url: 'vod.canalplay.com'},
    virginmega: {name: 'Virgin Mega', url: "www.virginmega.fr", priceSelector: '.cont big', titleSelector: '.videofile h2'},
    videofutur: {name: 'Video Futur', url: 'www.videofutur.fr', priceSelector: '.vodRent .butTop:contains("unit")', titleSelector: '.title h2'},
    tf1vod: {name: 'TF1 VOD', url: "mytf1vod.tf1.fr", priceSelector: '#head-ctn:contains("Louer") span', titleSelector: '#media-title'}
};

function fetchAndLogMoviePrice(searchTitle, store) {
    var q = searchTitle + ' location';
    var cx = "005741261737378155414:ptryjmsmugc";
    var key = "AIzaSyBWMeWVWdEEYvDBvQmM4xCXV-1UcGr4yN8";
    var searchUrl = "https://www.googleapis.com/customsearch/v1?q=" + escape(q) + "&cx=" + escape(cx) + "&key=" + key + "&siteSearch=" + store.url;
    request(searchUrl, function(error, response, body) {
        var movieUrl = JSON.parse(body).items[0].link;
        request({url:movieUrl, headers:{'User-Agent':USER_AGENT}}, function(error, response, body) {
            var $ = cheerio.load(body);
            var rentalInfo = $(store.priceSelector).text() || "-1";
            var rentalPrice = parseFloat(rentalInfo.replace(',', '.'));
            var movieTitle = $(store.titleSelector).text().trim() || 'Unknown title';
            console.log('"' + movieTitle + '": ' + rentalPrice + ' € at ' + store.name);
        })
    });
}

for (var store in STORES) {
    fetchAndLogMoviePrice(movieTitle, STORES[store]);
}