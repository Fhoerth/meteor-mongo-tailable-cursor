"use strict";
Npm.require('mongodb');
var MeteorMongoTailableCursor = (function () {
    function class_1(options, getCursorFn) {
        this.options = options;
        this.query = {};
        if (this.options.ns) {
            this.query.ns = this.options.ns;
        }
        if (this.options.ts) {
            this.query.ts = this.options.ts;
        }
        this.constructorCallback = getCursorFn;
        this.connectToMongo();
    }
    ;
    class_1.prototype.connectToMongo = function () {
        var $self = this;
        this.connection = mongodb.MongoClient.connect(this.options.db, function (err, db) {
            assert.equal(err, null);
            $self.collection = db.collection($self.options.collection);
            $self.getTimestamp();
        });
    };
    class_1.prototype.getTimestamp = function (callbackFn) {
        if (callbackFn === void 0) { callbackFn = null; }
        var $self = this;
        if (!this.options.ts) {
            var timestamp;
            var query = {};
            ;
            if (this.query.ns) {
                query.ns = this.query.ns;
            }
            var timestamp_cursor = this.collection
                .find(query)
                .sort({ $natural: -1 })
                .limit(1);
            timestamp_cursor.toArray(function (err, items) {
                assert.equal(err, null);
                var timestamp = new String();
                if (!items.length) {
                    var d = new Date();
                    timestamp = d.toISOString();
                }
                else {
                    timestamp = items[0].ts;
                }
                $self.options.ts = timestamp;
                if (callbackFn)
                    callbackFn();
            });
        }
        else {
            if (callbackFn)
                callbackFn();
        }
    };
    ;
    class_1.prototype.startStreaming = function () {
        console.log("Streaming is ready to start");
        console.log(this.options);
        // Crear el cursor tailable.
    };
    return class_1;
})();
