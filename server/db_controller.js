var requirejs = require('requirejs');
    
requirejs.config({
    nodeRequire: require
});

requirejs([
    'jquery',
    'mongoose'
], function ($, mongoose) {
    
    'use strict';
    
    exports.API = {
        
        get: function(_req, _res){
            
        },
        
        insert: function(_req, _res){
            
        },
        
        update: function(_req, _res){
            
        },
        
        delete: function(_req, _res){
            
        }
        
    }; 
});