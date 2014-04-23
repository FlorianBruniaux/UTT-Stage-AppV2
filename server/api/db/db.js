var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    schemas = {
    
        user : new Schema({
            _objectType :   { type: String },
            userCategory:   { type: String },
            linkedinId:     { type: String },
            firstName :     { type: String },
            lastName :      { type: String },
            mobile:         { type: String },
            email:          { type: String },
            headline:       { type: String },
            photoUrl:       { type: String },
            pwd:            { type: String }
        }),
        
        offer : new Schema({
            _objectType :   { type: String },
            ref:            { type: String },
            department:     { type: String },
            departmentSpec: { type: String },
            lat:            { type: Number },
            lng:            { type: Number },
            fullAddress:    { type: String },
            company:        { type: String },
            mission:        { type: String },
            profile:        { type: String },
            rem:            { type: Number },
            tags:           { type: String },
            title:          { type: String },
            type:           { type: String }
        })
        
    };
    
var models = {
    user : mongoose.model('user', schemas.user),
    offer : mongoose.model('offer', schemas.offer)
};

exports.getModels = function(){
    return models;
};

exports.connect = function(){
    mongoose.connect('mongodb://127.0.0.1/UttStagesApp');
    mongoose.connection.on('open', function() {
        console.log('Connected to Mongoose...');
    });
};

exports.controller = {
    
    get: {
        
        byObjectType:  function(_req, _res){

            var objectType = _req.params.objectType;

            models[objectType].find({}, function(err, objects) {
                _res.json(objects);
            });
            
        },
        
        byId:  function(_req, _res){
            var objectType = _req.params.objectType;
            
            models[objectType].findOne({ _id: _req.params.id }, function(err, objects) {
                if (err) {
                    _res.json({error: 'Not found.'});
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