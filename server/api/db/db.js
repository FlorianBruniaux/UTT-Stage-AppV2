var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    schemas = {
    
        company : new Schema({
            _objectType :           { type: String },
            cname:                  { type: String },
            description:            { type: String },
            lat:                    { type: Number },
            lng:                    { type: Number },
            fullAddress:            { type: String },
            website:                { type: String }
        }),
        
        monitoring : new Schema({
            _objectType :           { type: String },
            offer:                  Schema.Types.Mixed,
            dates:                  Schema.Types.Mixed,
            semester:               { type: String },
            uttResp:                Schema.Types.Mixed,
            visits:                 [Schema.Types.Mixed],
            sheets:                 Schema.Types.Mixed
        }),
        
        offer : new Schema({
            _objectType :           { type: String },
            ref:                    { type: String },
            validation: {
                state:              { type: String },
                msg:                { type: String },
                by:                 Schema.Types.Mixed,
                date:               { type: String }
            },
            provided:               Schema.Types.Mixed,
            alreadyMonitored:       { type: String },
            department:             { type: String },
            departmentSpec:         { type: String },
            lat:                    { type: Number },
            lng:                    { type: Number },
            fullAddress:            { type: String },
            company:                Schema.Types.Mixed,
            mission:                { type: String },
            profile:                { type: String },
            rem:                    { type: Number },
            tags:                   { type: String },
            title:                  { type: String },
            type:                   { type: String }
        }),
        
        user : new Schema({
            _objectType :           { type: String },
            userCategory:           { type: String },
            specificToCategory:     Schema.Types.Mixed,
            lastConnexion:          { type: String },
            linkedinId:             { type: String },
            firstName:              { type: String },
            lastName:               { type: String },
            mobile:                 { type: String },
            email:                  { type: String },
            headline:               { type: String },
            summary :               { type: String },
            photoUrl:               { type: String },
            pwd:                    { type: String },
            tags:                   { type: String },
            educations:             Schema.Types.Mixed,
            positions:              Schema.Types.Mixed,
            skills:                 Schema.Types.Mixed
        })
        
    };
    
var models = {
    company : mongoose.model('company', schemas.company),
    monitoring : mongoose.model('monitoring', schemas.monitoring),
    offer : mongoose.model('offer', schemas.offer),
    user : mongoose.model('user', schemas.user)
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
        
        console.log('update');
        
        delete _req.body._id;
        
        //  We need to delete _id because of Mongo error 10148
        var objectType = _req.params.objectType;
        
        models[objectType].update({ _id: _req.params.id }, _req.body, function(err, updated) {
            if (err) {
                console.log(err);
                _res.json({error: 'Object not found.'});
            } else {
                _res.json('Object updated ! ');
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