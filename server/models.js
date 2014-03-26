var requirejs = require('requirejs');
    
requirejs.config({
    nodeRequire: require
});

requirejs([
    'mongoose'
], function (mongoose) {
    
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;
    
    var user = new Schema({
        _objectType :   { type: String },
        userCategory:   { type: String },
        linkedinId:     { type: String },
        firstName :     { type: String },
        lastName :      { type: String },
        mobile:         { type: String },
        email:          { type: String },
        headline:       { type: String },
        photoUrl:       { type: String }
    });

    exports.user = mongoose.model('user', user);


});