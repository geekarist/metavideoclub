var sinon = require('sinon');
var expect = require('expect.js');

describe('cli', function() {
    it('should put many values in store', function(done) {
        // GIVEN
        var cachePutSpy = sinon.spy();
        var givenStore1 = {name: 'Store 1', url: "store1url", priceSelector: 'big', titleSelector: 'h1'};
        var givenStore2 = {name: 'Store 2', url: "store2url", priceSelector: 'big', titleSelector: 'h1'};
        var cli = require('./cli.js')(
            // Video club will return 'price 1' and 'price 2' from these stores
            {   fetchMoviePrice: function(title, store, callback) {
                    if (store == givenStore1) {
                        callback('price 1', title, store);
                    } else if (store == givenStore2) {
                        callback('price 2', title, store);
                    }
                } 
            },
            // Cache is empty
            {put: cachePutSpy, get: function() {return null;}},
            // There are 2 stores
            {   store1: givenStore1,
                store2: givenStore2
            }
        );

        // WHEN
        cli.launch('batman begins', function() {
            // THEN
            if (cachePutSpy.callCount == 2) {
                expect(cachePutSpy.calledWith({title: 'batman begins', store: 'store1url'}, 'price 1')).to.be(true);
                expect(cachePutSpy.calledWith({title: 'batman begins', store: 'store2url'}, 'price 2')).to.be(true);
                done();
            }
        });
    })
})