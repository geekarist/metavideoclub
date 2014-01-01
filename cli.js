module.exports = function(videoclubMock, cacheMock, storesMock) {
    return {
        launch: function(movieTitle, callback) {
            var videoclub = videoclubMock || require('./videoclub.js');
            var cache = cacheMock || require('./cache.js');
            var STORES = storesMock || require('./stores.js').online;

            for (var store in STORES) {
                var key = {title: movieTitle, store: STORES[store].url};
                var cachedPrice = cache.get(key);
                if (cachedPrice == null) {
                    videoclub.fetchMoviePrice(movieTitle, STORES[store], function(price, callbackTitle, callbackStore) {
                        cache.put({title: callbackTitle, store: callbackStore.url}, price);
                        callback(price);
                    });
                } else {
                    callback(cachedPrice);
                }
            }
        }
    }
}

