#!/usr/bin/env node

var cheerio = require('cheerio');
var request = require('request');

function warnerBrosUrl() {
    return "http://www.warnerbros.fr/batman-begins-5.html";
}

function canalPlayUrl() {
    return "http://vod.canalplay.com/films/cinema/batman-begins,297,301,2887.aspx";
}

function virginMegaUrl() {
    return "http://www.virginmega.fr/video/film/batman-begins-vost-106730638,normal,page1.htm";
}

function tf1VodUrl() {
    return "http://mytf1vod.tf1.fr/collection/363-Super_Heros/media-3599-Batman_Begins.html?PHPSESSID=7bds948p607isk4ftkg388skp6";
}

function videoFuturUrl() {
    return "http://www.videofutur.fr/viewTitleDetails.do?titreId=121349";
}

var userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1';

var rentalInfoSelector = '.vodRent .butTop:contains("unit")';
var rentalStore = 'Video Futur';
request({url:videoFuturUrl(), headers:{'User-Agent':userAgent}}, function(error, response, body) {
    var $ = cheerio.load(body);
    var rentalInfo = $(rentalInfoSelector).text();
    var rentalPrice = parseFloat(rentalInfo.replace(',', '.'));
    console.log(rentalStore + ': ' + rentalPrice + ' €');
});

request({url:tf1VodUrl(), headers:{'User-Agent':userAgent}}, function(error, response, body) {
    var $ = cheerio.load(body);
    var rentalInfo = $('#head-ctn:contains("Louer") span').text();
    var rentalPrice = parseFloat(rentalInfo.replace(',', '.'));
    console.log('TF1 VOD: ' + rentalPrice + ' €');
});

request({url:virginMegaUrl(), headers:{'User-Agent':userAgent}}, function(error, response, body) {
    var $ = cheerio.load(body);
    var rentalInfo = $('.cont big').text();
    var rentalPrice = parseFloat(rentalInfo.replace(',', '.'));
    console.log('Virgin Mega: ' + rentalPrice + ' €');
});
