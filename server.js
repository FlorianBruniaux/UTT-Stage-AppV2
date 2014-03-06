var requirejs = require('requirejs'),
    dbController = require('./db_controller');

requirejs.config({
    nodeRequire: require
});

requirejs([
    'http',
    'path',
    'express',
    'fs'
], function (http, path, express, fs) {
    
    'use strict';
    
    var app = express();
    
    //Configuration
    app.configure(function(){
        //Path to static data
        app.use(express.static(path.join(__dirname, 'app')));
        //Debug mode = true
        app.use(express.logger('dev'));
        //The port in which the app will be available
        app.set('port', process.env.PORT || 3030);
        //To use require in node
        app.use('/js/lib/', express.static((path.join(__dirname,'node_modules/requirejs/'))));
        //Access to node modules
        app.use('/node_modules', express.static((path.join(__dirname,'node_modules'))));
        //To be able to work with json data
        app.use(express.json({limit: '50mb'}));
    });
    
    //Get
    //app.get('/db/', dbController.API.get);
    
    //Post
    //app.post('/db/', dbController.API.insert);

    //Update
    //app.put('/db/', dbController.API.update);

    //Delete
    //app.delete('/db/', dbController.API.delete);
    
    //Creates HTTP server
    http.createServer(app).listen(app.get('port'), function(){
        console.log("You can run the application on port " + app.get('port'));
    });

});