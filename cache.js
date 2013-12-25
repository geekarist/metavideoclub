var Promise = require('promise');
var fs = require('fs');

function cachePath(path) {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    return homeDir + '/.cache/' + path;
}

function cachedValue(key) {
    var storePath = cachePath('metavideoclub/store.json');
    var storeAsStr = fs.readFileSync(storePath);
    var store = JSON.parse(storeAsStr);
    if (JSON.stringify(key) in store) {
        return store[JSON.stringify(key)];
    }
    return undefined;
}

exports.get = function(key) {
    return new Promise(function(resolve, reject) {
        var value = cachedValue(key);
        resolve(value);
    })
}
