var requirejs = require('requirejs'),
    models = require('./models');
    
requirejs.config({
    nodeRequire: require
});

requirejs([

], function () {
    
    'use strict';
    
    exports.API = {
        
        get: {
            
            byObjectType:  function(_req, _res){
                
                var objectType = _req.params.objectType;
                
                models[objectType].find({}, function(err, objects) {
                    _res.json(objects);
                });
                
            },
            
            byId:  function(_req, _res){
                var objectType = _req.params.objectType;
                
                models[objectType].find({ _id: _req.params.id }, function(err, objects) {
                    if (err) {
                        _res.json({error: 'Contact not found.'});
                    } else {
                        _res.json(objects);
                    }
                });
                
            }
            
        },
        
        insert: function(_req, _res){
            
            var objectType = _req.params.objectType,
                newObject = new models[objectType](_req.body);
                
            newObject.save(function(err, object) {
                if (err) {
                    _res.json({error: 'Error adding object.'});
                } else {
                    _res.json(object);
                }
            });
            
        },
        
        update: function(_req, _res){
            
            var objectType = _req.params.objectType;
            
            models[objectType].update({ _id: _req.body.id }, _req.body, function(err, updated) {
                if (err) {
                    _res.json({error: 'Object not found.'});
                } else {
                    _res.json(updated);
                }
            })
            
        },
        
        delete: function(_req, _res){
            
            var objectType = _req.params.objectType,
                id = _req.params.id;

            models[objectType].findOne({ _id: id }, function(err, object) {
                if (err) {
                    _res.json({error: 'object not found.'});
                }
                else {
                    object.remove(function(err, object){
                        _res.json(200, {status: 'Success'});
                    })
                }
            });
            
        }
        
    }; 
});