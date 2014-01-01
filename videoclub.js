var cheerio = require('cheerio');
var request = require('request');

var fetchMoviePrice = function(searchTitle, store, callback) {
    var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1';
    var q = searchTitle + ' location';
    var cx = "005741261737378155414:ptryjmsmugc";
    var key = "AIzaSyBWMeWVWdEEYvDBvQmM4xCXV-1UcGr4yN8";
    var searchUrl = "https://www.googleapis.com/customsearch/v1?q=" + escape(q) + "&cx=" + escape(cx) + "&key=" + key + "&siteSearch=" + store.url;
    request(searchUrl, function(error, response, body) {
        var result = JSON.parse(body);
        if (result.error) {
            callback(
                'Error while querying [' + store.name + ']: ' + JSON.stringify(result.error.errors), 
                searchTitle, store);
            return;
        }
        if (!result.items || result.items.length === 0) {
            callback('"' + searchTitle + '" not found on ' + store.name, searchTitle, store);
            return;
        }
        var movieUrl = result.items[0].link;
        request({url:movieUrl, headers:{'User-Agent':USER_AGENT}}, function(error, response, body) {
            var $ = cheerio.load(body);
            var rentalInfo = $(store.priceSelector).text().trim() || "";
            var rentalPrice = parseFloat(rentalInfo.replace(',', '.'));
            var movieTitle = $(store.titleSelector).text().trim() || '';
            var foundInformation;
            if (rentalInfo && movieTitle) {
                foundInformation = 'Found as "' + movieTitle + '" for ' + rentalPrice + ' € at ' + store.name;
            } else if (!rentalPrice) {
                foundInformation = 'Found as "' + movieTitle + '", price not found at ' + store.name;
            } else if (!movieTitle) {
                foundInformation = 'Title not found, for ' + rentalPrice + ' € at ' + store.name;
            } else {
                foundInformation = 'No information found at ' + store.name;
            }
            callback(foundInformation + ' (see ' + movieUrl + ')', searchTitle, store);
        });
    });
};
exports.fetchMoviePrice = fetchMoviePrice;
