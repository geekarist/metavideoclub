var fs = require('fs');

function cachePath(path) {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    return homeDir + '/.cache/' + path;
}

function cachedValue(key) {
    var storePath = cachePath('metavideoclub/store.json');
    if (!fs.existsSync(storePath)) {
        return null;
    }
    var storeAsStr = fs.readFileSync(storePath);
    var store = JSON.parse(storeAsStr);
    if (JSON.stringify(key) in store) {
        return store[JSON.stringify(key)];
    }
    return null;
}

exports.get = function(key) {
    return cachedValue(key);
}

exports.put = function(key, value) {
    var storePath = cachePath('metavideoclub/store.json');
    var store;
    if (fs.existsSync(storePath)) {
        var storeAsStr = fs.readFileSync(storePath);
        store = JSON.parse(storeAsStr);
    } else {
        store = {};
    }
    store[JSON.stringify(key)] = value;
    if (!fs.existsSync(cachePath('metavideoclub/'))) {
        fs.mkdirSync(cachePath('metavideoclub'));
    }
    fs.writeFileSync(cachePath('metavideoclub/store.json'), JSON.stringify(store, null, '\t'));
}
