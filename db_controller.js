var requirejs = require('requirejs'),
    mongo = require('mongodb');
    
requirejs.config({
    nodeRequire: require
});

requirejs([
    'jquery'
], function ($) {
    
    'use strict';
    
    var Server = mongo.Server,
        Db = mongo.Db,
        BSON = mongo.BSONPure,
        
        server = new Server('localhost', 27017, {auto_reconnect: true}),
        db = new Db('winedb', server, {safe: true});
    
    
    
    exports.API = {
        
        
    }; 
});