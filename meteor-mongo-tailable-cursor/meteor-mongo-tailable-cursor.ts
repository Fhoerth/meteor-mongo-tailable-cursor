"use strict";

import {Options} from "./interfaces/options";

Npm.require('mongodb');

export class MeteorMongoTailableCursor {

    options: Options;
    collection: mongodb.Collection;
    connection: mongodb.MongoClient;
    constructorCallback: Function;
    query: any;

    constructor (options: Options, getCursorFn) {
        this.options = options;

        this.query = { }

        if (this.options.ns) {
            this.query.ns = this.options.ns;
        }

        if (this.options.ts) {
            this.query.ts = this.options.ts;
        }

        this.constructorCallback = getCursorFn;

        this.connectToMongo();
    };

    connectToMongo () {
        let $self: MeteorMongoTailableCursor = this;

        this.connection = mongodb.MongoClient.connect(
            this.options.db,
            function(err: Error, db: mongodb.Db): void {
                assert.equal(err, null);
                $self.collection = db.collection($self.options.collection);
                $self.getTimestamp();
            }
        );

    }

    getTimestamp (callbackFn: Function = null) {
        let $self: MeteorMongoTailableCursor = this;

        if (!this.options.ts) {
            var timestamp: String;
            var query: any = {};;

            if (this.query.ns) {
                query.ns = this.query.ns;
            }

            let timestamp_cursor: mongodb.Cursor = this.collection
                .find( query )
                .sort( {$natural: -1} )
                .limit(1);

            timestamp_cursor.toArray(function(err: Error, items: Array<Object>): void {
                assert.equal(err, null);

                let timestamp: String = new String();

                if (!items.length) {
                    let d: Date = new Date();
                    timestamp = d.toISOString();
                } else {
                    timestamp = items[0].ts;
                }

                $self.options.ts = timestamp;
                if (callbackFn) callbackFn();

            });

        } else {
            if (callbackFn) callbackFn();
        }
    };

    startStreaming () {
        console.log("Streaming is ready to start");
        console.log(this.options);
        // Crear el cursor tailable.

    }

}
