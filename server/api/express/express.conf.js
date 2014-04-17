var express = require('express'),
    passport = require('passport'),
    path = require('path');


var app = express();


app.configure(function(){
    
    //  Path to static data
    app.use(express.static(path.join(__dirname, '../../../app')));
    
    //  Debug mode = true
    app.use(express.logger('dev'));
    
    //  The port in which the app will be available
    app.set('port', process.env.PORT || 8080 );
    
    //  To use require in node
    app.use('/js/lib/', express.static((path.join(__dirname,'node_modules/requirejs/'))));
    
    //  To access to node modules
    app.use('/node_modules', express.static((path.join(__dirname,'node_modules'))));
    
    //  To be able to work with json data
    app.use(express.json({limit: '50mb'}));
    
    //  To support URL-encoded bodies
    app.use(express.urlencoded());
    
    //  To be able to override methods
    app.use(express.methodOverride());
    
    //  To be able to parse cookies
    app.use(express.cookieParser());
    
    //  To use sessiosn
    app.use(express.session({ secret: 'keyboard cat' }));
    
    //  To initialize passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    //  To use router
    app.use(app.router);
});

var serverUrl = 'http://127.0.0.1:'+app.get('port');

exports.getUrl = function(){
    return serverUrl;
}

exports.getApp = function(){
    return app;
}