#!/usr/bin/env node

var cheerio = require('cheerio');
var request = require('request');

function warnerBrosUrl() {
    return "http://www.warnerbros.fr/batman-begins-5.html";
}

function canalPlayUrl() {
    return "http://vod.canalplay.com/films/cinema/batman-begins,297,301,2887.aspx";
}

function virginMegaMovieUrl() {
    return "http://www.virginmega.fr/video/film/batman-begins-vost-106730638,normal,page1.htm";
}

function tf1VodMovieUrl() {
    return "http://mytf1vod.tf1.fr/collection/363-Super_Heros/media-3599-Batman_Begins.html?PHPSESSID=7bds948p607isk4ftkg388skp6";
}

function requestMovieUrl(title, siteSearch, callback) {
    var q = title + ' location';
    var cx = "005741261737378155414:ptryjmsmugc";
    var key = "AIzaSyBWMeWVWdEEYvDBvQmM4xCXV-1UcGr4yN8";
    var searchUrl = "https://www.googleapis.com/customsearch/v1?q=" + escape(q) + "&cx=" + escape(cx) + "&key=" + key + "&siteSearch=" + siteSearch;
    request(searchUrl, function(error, response, body) {
        var movieUrl = JSON.parse(body).items[0].link;
        callback(movieUrl);
    });
}

var userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1';

function logMoviePrice(rentalInfoSelector, rentalStore, rentalUrl) {
    request({url:rentalUrl, headers:{'User-Agent':userAgent}}, function(error, response, body) {
        var $ = cheerio.load(body);
        var rentalInfo = $(rentalInfoSelector).text();
        var rentalPrice = parseFloat(rentalInfo.replace(',', '.'));
        console.log(rentalStore + ': ' + rentalPrice + ' €');
    })
}

var movieTitle = process.argv.splice(2).join(' ');

requestMovieUrl(movieTitle, "www.videofutur.fr", function(movieUrl) {
    logMoviePrice('.vodRent .butTop:contains("unit")', 'Video Futur', movieUrl);
});

requestMovieUrl(movieTitle, "mytf1vod.tf1.fr", function(movieUrl) {
    logMoviePrice('#head-ctn:contains("Louer") span', 'TF1 VOD', movieUrl);
});

requestMovieUrl(movieTitle, "www.virginmega.fr", function(movieUrl) {
    logMoviePrice('.cont big', 'Virgin Mega', movieUrl);
});
