var requirejs = require('requirejs');

var API = {
    db : require('./api/db/db'),
    auth : require('./api/auth/auth'),
    express : require('./api/express/express.conf'),
    upload : require('./api/upload/upload')
};
    
requirejs.config({
    nodeRequire: require
});

requirejs([
    'http',
    'https',
    'path',
    'fs'
], function (http, https, path, fs) {
    
    'use strict';

    
    //  Connect to Mongoose
    API.db.connect();

    
    //  Get Express app
    var app = API.express.getApp();
    
    
    //  Auth.common
    app.get(
        '/auth/logout',
        API.auth.logout
    );
    
    app.get(
        '/auth/isauth',
        API.auth.isAuth
    );
    
    
    //  Auth.Local
    app.post(
        '/auth/local',
        API.auth.local.login
    );
    
    app.post(
        '/auth/local/signon',
        API.auth.local.signOn
    );
    
    app.post(
        '/auth/local/forgotpassword',
        API.auth.local.forgotPassword
    );

    
    //  Auth.Linkedin
    app.get(
        '/auth/linkedin',
        API.auth.linkedin.login,
        function(req, res){
            // The request will be redirected to LinkedIn for authentication, so this
            // function will not be called.
        }
    );
    
    app.get(
        '/auth/linkedin/callback',
        API.auth.linkedin.loginCallback,
        function(req, res) {
            res.redirect('/#home');
        }
    );
    
    //  Image upload
    
    app.post(
        '/upload/image/base64',
        API.upload.uploadBase64Image
    );
     
    //  CRUD
    
    app.get(
        '/db/:objectType',
        API.db.controller.get.byObjectType
    );
    
    app.get(
        '/db/:objectType/:id',
        API.db.controller.get.byId
    );

    app.post(
        '/db/:objectType',
        API.db.controller.insert
    );

    app.put(
        '/db/:objectType/:id',
        API.db.controller.update
    );

    app.delete(
        '/db/:objectType/:id',
        API.db.controller.delete
    );
    
    
    //  Create HTTP server
    var server = http.createServer(app).listen(app.get('port'), function(){
        console.log('You can run the application on ' + API.express.getUrl() );
    });
    
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function (socket) {
        
        socket.on('offer:new', function (socket) {
            io.sockets.emit('update:offers:validation:view');
            io.sockets.emit('update:offers:root:views');//  teacher and intership_managers
        });
        
        socket.on('offer:deleted', function (socket) {
            io.sockets.emit('update:offers:validation:view');
            io.sockets.emit('update:students:home:view');
            io.sockets.emit('update:offers:root:views');//  teacher and intership_managers
        });
        
        socket.on('offer:provided', function (socket) {
            io.sockets.emit('update:offers:list:view');
            io.sockets.emit('update:students:home:view');
            io.sockets.emit('update:offers:root:views');
        });
        
        socket.on('offer:state:changed', function (socket) {
            io.sockets.emit('update:offers:validation:view');
            io.sockets.emit('update:offers:list:view');
            io.sockets.emit('update:students:home:view');
            io.sockets.emit('update:offers:root:views');//  teacher and intership_managers
        });
        
    });
    
    
    
});