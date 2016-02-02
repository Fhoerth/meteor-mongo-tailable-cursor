System.register(['./meteor-mongo-tailable-cursor/meteor-mongo-tailable-cursor'], function(exports_1) {
    'use strict';
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (meteor_mongo_tailable_cursor_1_1) {
                exportStar_1(meteor_mongo_tailable_cursor_1_1);
            }],
        execute: function() {
        }
    }
});
