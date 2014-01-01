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

function logDebug(msg) {
    if (exports.verbose) {
        console.log(msg);
    }
}

exports.put = function(key, value) {
    logDebug('## Putting value in cache...');
    logDebug('## Key: [' + JSON.stringify(key) + ']');
    logDebug('## Value: [' + value + ']');

    var storePath = cachePath('metavideoclub/store.json');
    var store;
    if (fs.existsSync(storePath)) {
        logDebug('## Cache file does already exist, read it')
        var storeAsStr = fs.readFileSync(storePath);
        store = JSON.parse(storeAsStr);
    } else {
        logDebug('## Cache file does not exist')
        store = {};
    }
    logDebug('## Existing store: ' + JSON.stringify(store));

    logDebug('## Updating store')
    store[JSON.stringify(key)] = value;
    if (!fs.existsSync(cachePath('metavideoclub/'))) {
        logDebug('## Cache directory does not exist')
        fs.mkdirSync(cachePath('metavideoclub'));
    }

    logDebug('## Writing new store: ' + JSON.stringify(store));
    fs.writeFileSync(cachePath('metavideoclub/store.json'), JSON.stringify(store, null, '\t'));
}
