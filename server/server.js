var requirejs = require('requirejs'),
    dbController = require('./db_controller')
    , passport = require('passport')
    , util = require('util')
    , LinkedInStrategy = require('passport-linkedin').Strategy;

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
    
    var app = express(),
        LINKEDIN_API_KEY = "77timj8axy1cou",
        LINKEDIN_SECRET_KEY = "GJAJJVPz6gDFpp3f";

    //Configuration
    app.configure(function(){
        //Path to static data
        app.use(express.static(path.join(__dirname, '../app')));
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
        
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({ secret: 'keyboard cat' }));
        // Initialize Passport!  Also use passport.session() middleware, to support
        // persistent login sessions (recommended).
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(app.router);
    });
    
    
    /****************************************/
    /*  API LINKEDIN                        */
    /****************************************/
    
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete LinkedIn profile is
    //   serialized and deserialized.
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    // Use the LinkedInStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
    //   invoke a callback with a user object.
    passport.use(new LinkedInStrategy({
            consumerKey: LINKEDIN_API_KEY,
            consumerSecret: LINKEDIN_SECRET_KEY,
            callbackURL: "http://127.0.0.1:8080/auth/linkedin/callback",
            profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'picture-url']
        },
        function(token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {
                // To keep the example simple, the user's LinkedIn profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the LinkedIn account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    ));

    // GET /auth/linkedin
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in LinkedIn authentication will involve
    //   redirecting the user to linkedin.com.  After authorization, LinkedIn will
    //   redirect the user back to this application at /auth/linkedin/callback
    app.get('/auth/linkedin',
        passport.authenticate('linkedin', { scope: ['r_fullprofile', 'r_emailaddress'] }),
        function(req, res){
          // The request will be redirected to LinkedIn for authentication, so this
          // function will not be called.
        }
    );
    
    // GET /auth/linkedin/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/#home');
        }
    );
    
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/#home');
    });
    
    app.get('/isauth', function(req, res){
        if (req.isAuthenticated()) {
            console.log("Authenticated!");
            res.send(true);
        }
        else{
            console.log("NOT Authenticated!");
            res.send(false);
        }
    });
    
    app.get('/login',function(req,res){
        res.redirect('/#home');
    })
    /****************************************/
    /*  APP                                 */
    /****************************************/
    
    //Get
    app.get('/db/', dbController.API.get);
    
    //Post
    app.post('/db/', dbController.API.insert);

    //Update
    app.put('/db/', dbController.API.update);

    //Delete
    app.delete('/db/', dbController.API.delete);
    
    //Creates HTTP server
    http.createServer(app).listen(app.get('port'), function(){
        console.log("You can run the application on port " + app.get('port'));
    });

});