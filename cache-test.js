var expect = require('expect.js');
var fs = require('fs');
var cache = require('./cache.js');

function cachePath(path) {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    return homeDir + '/.cache/' + path;
}

function cleanup() {
    if (fs.existsSync(cachePath('metavideoclub/store.json'))) {
        fs.unlinkSync(cachePath('metavideoclub/store.json'));
    }
    if (fs.existsSync(cachePath('metavideoclub'))) {
        fs.rmdirSync(cachePath('metavideoclub'));
    }
}

function givenStore() {
    var key = {n: 'v', n0: 'v0'};
    var store = {};
    store[JSON.stringify(key)] = 'storedvalue';
    return store;
}

describe('cache', function() {
    it('should return cached value when key is already in store', function() {
        // GIVEN
        cleanup();
        fs.mkdirSync(cachePath('metavideoclub'));
        fs.writeFileSync(cachePath('metavideoclub/store.json'), JSON.stringify(givenStore(), null, '\t'));

        // WHEN
        var value = cache.get({n: 'v', n0: 'v0'});
        
        // THEN
        expect(value).to.be('storedvalue');
        cleanup();
    });

    it('should return null when key is not in store', function() {
        // GIVEN
        cleanup();
        fs.mkdirSync(cachePath('metavideoclub'));
        fs.writeFileSync(cachePath('metavideoclub/store.json'), JSON.stringify(givenStore(), null, '\t'));

        // WHEN
        var value = cache.get('this key is not cached');

        // THEN
        expect(value).to.be(null);
        cleanup();
    });

    it('should update value in store', function() {
        // GIVEN
        var key = {n : 'v', n0: 'v0'};
        var value = 'other value';
        cleanup();
        // WHEN
        cache.put(key, value);
        // THEN
        expect(cache.get(key)).to.be('other value');
        cleanup();
    })

    it('should put new value in store', function() {
        // GIVEN
        var key = {n1 : 'v1', n2: 'v2'};
        var value = 'another value';
        cleanup();
        cache.put({n: 'v', n0: 'v0'}, 'storedvalue');
        // WHEN
        cache.put(key, value);
        // THEN
        expect(cache.get({n: 'v', n0: 'v0'})).to.be('storedvalue');
        expect(cache.get(key)).to.be('another value');
        cleanup();
    })
});
