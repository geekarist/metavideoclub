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
    it('should call "on cached" callback with cached value when key is already in store', function(done) {
        // GIVEN
        cleanup();
        fs.mkdirSync(cachePath('metavideoclub'));
        fs.writeFileSync(cachePath('metavideoclub/store.json'), JSON.stringify(givenStore(), null, '\t'));

        // WHEN
        cache.get({n: 'v', n0: 'v0'}).then(function(value) {
            // THEN
            expect(value).to.be('storedvalue');
            cleanup();
            done();
        }, function(err) {
            // THEN
            expect().fail();
            cleanup();
            done();
        });
    });

    it('should call "on new" callback when key is not in store', function(done) {
        // GIVEN
        cleanup();
        fs.mkdirSync(cachePath('metavideoclub'));
        fs.writeFileSync(cachePath('metavideoclub/store.json'), JSON.stringify(givenStore(), null, '\t'));

        // WHEN
        cache.get('this key is not cached').then(function(value) {
            // THEN
            expect(value).to.be(undefined);
            cleanup();
            done();
        }, function() {
            // THEN
            expect().fail();
            cleanup();
            done();
        });
    });
});
