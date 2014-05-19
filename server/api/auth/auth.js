var passport = require('passport'),
    passportLinkedin = require('passport-linkedin'),
    passportLocal = require('passport-local'),
    db = require('../db/db'),
    express = require('../express/express.conf'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    pwdGenerator = require('password-generator');

var dbModels = db.getModels();
//console.log(dbModels['user']);

// To logout
exports.logout =  function(req, res){
    req.logout();
    res.redirect('/');
};

// To check if user is auth
exports.isAuth = function(req, res){
    if (req.isAuthenticated()) {
        var user = req.user;
        
        //  We do not want to send the password to client side
        delete user.pwd;
        
        res.send(user);
    }
    else{
        res.send(null);
    }
}

/****************************************/
/*  AUTH LINKEDIN                       */
/****************************************/
var LinkedInStrategy = passportLinkedin.Strategy,
    LINKEDIN_API_KEY = '77timj8axy1cou',
    LINKEDIN_SECRET_KEY = 'GJAJJVPz6gDFpp3f';
    

//  Passport session setup.
//  To support persistent login sessions, Passport needs to be able to
//  serialize users into and deserialize users out of the session.  Typically,
//  this will be as simple as storing the user ID when serializing, and finding
//  the user by ID when deserializing.  However, since this example does not
//  have a database of user records, the complete LinkedIn profile is
//  serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


//  Use the LinkedInStrategy within Passport.
//  Strategies in passport require a `verify` function, which accept
//  credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
//  invoke a callback with a user object.
passport.use(new LinkedInStrategy({
        consumerKey: LINKEDIN_API_KEY,
        consumerSecret: LINKEDIN_SECRET_KEY,
        callbackURL: 'http://127.0.0.1:8080/auth/linkedin/callback',
        profileFields: [
            'id',
            'first-name',
            'last-name',
            'email-address',
            'headline',
            'picture-url',
            'educations',
            'positions',
            'skills',
            'summary'
        ]
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            
            dbModels['user'].findOne({'linkedinId' : profile.id}, function(err, user) {

                if ( !user ) {
                    
                    dbModels['user'].findOne({'email' : profile._json.emailAddress}, function(err, user) {
                        
                        var obj = {
                            _objectType : 'user',
                            userCategory: 'students',
                            linkedinId: profile.id,
                            firstName : profile._json.firstName,
                            lastName : profile._json.lastName,
                            email:  profile._json.emailAddress,
                            headline: profile._json.headline,
                            photoUrl:  profile._json.pictureUrl,
                            educations: profile._json.educations,
                            positions: profile._json.positions,
                            skills: profile._json.skills,
                            summary: profile._json.summary,
                        }
                        
                        if ( !user ) {

                            var newUser = new dbModels['user'](obj);
    
                            newUser.save(function(err, user) {
                                if (err) {
                                    console.log('err');
                                    return done(null, null);
                                }
                                else {
                                    console.log('ok');
                                    return done(null, user);
                                }
                            });
                        }
                        else {
                            
                            dbModels['user'].update({ _id: user.get('_id') }, obj, function(err, updated) {
                                
                                if (err) {
                                    console.log('User not found.');
                                    return done(null, null);
                                }
                                else {
                                    console.log('User updated ! ');
                                    return done(null, user);
                                }
                            });
                            
                        }
                        
                    });
                    
                }
                else {
                    return done(null, user);
                }
                
            });
        });
    }
));


exports.linkedin = {
    
    //  Use passport.authenticate() as route middleware to authenticate the
    //  request.  The first step in LinkedIn authentication will involve
    //  redirecting the user to linkedin.com.  After authorization, LinkedIn will
    //  redirect the user back to this application at /auth/linkedin/callback
    login : passport.authenticate('linkedin',{
        scope: ['r_fullprofile', 'r_emailaddress']
    }),

    //  Use passport.authenticate() as route middleware to authenticate the
    //  request.  If authentication fails, the user will be redirected back to the
    //  login page.  Otherwise, the primary route function function will be called,
    //  which, in this example, will redirect the user to the home page.
    loginCallback : passport.authenticate('linkedin', {
        failureRedirect: '/auth/logout'
    })

}

/****************************************/
/*  AUTH LOCAL                          */
/****************************************/

var LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        dbModels['user'].findOne({ email: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            
            if (!(user.pwd == password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            
            return done(null, user);
        });
    }
));

exports.local = {
    
    login : passport.authenticate('local', {
        successRedirect: '/#home',
        failureRedirect: '/auth/logout',
        failureFlash: false
    }),

    signOn : function(_req, _res){
        
        var firstName = validator.escape(_req.body.firstName),
            lastName = validator.escape(_req.body.lastName),
            email = validator.escape(_req.body.email),
            password = _req.body.password;
        
        dbModels['user'].findOne({'email' : email}, function(err, user) {
    
            if (password.length < 8) {
                _res.send('Password is too short (8 characters min) ');
            }
            else if ( !user ) {
                
                var obj = {
                    _objectType : 'user',
                    userCategory: 'students',
                    firstName : firstName,
                    lastName : lastName,
                    email: email,
                    pwd: password
                }
                var newUser = new dbModels['user'](obj);
    
                newUser.save(function(err, user) {
                    if (err) {
                        _res.send('Error, please try again');
                    }
                    else {
                        _res.json(200, {message : 'You\'ve been registered! Please log in with your email/password in the login page.'});
                    }
                });
                
            }
            else {
                
                dbModels['user'].update({ _id: user.get('_id') }, obj, function(err, updated) {
                    
                    if (err) {
                        _res.send('Error, please try again');
                    }
                    else {
                        _res.json(200, {message : 'You were already registered with Linkedin auth. Now you can logged with both solution (login/pwd or Linkedin)'});
                    }
                    
                });
            }
            
        });
        
    },

    forgotPassword : function(_req, _res){
        
        var email = validator.escape(_req.body.email);
        
        dbModels['user'].findOne({ 'email': email }, function(err, user) {
            
            if (!user) {
                _res.send('Email not found in the users database!');
            }
            else {
    
                var newPassword = pwdGenerator(10, false);
                
                user.pwd = newPassword ;
                user.save();
                
                /****************************************/
                /********* Need to be configured ********/
                /****************************************/
                var SENDER_EMAIL = '',
                    SENDER_PWD = '';
                /****************************************/
                
                // create reusable transport method (opens pool of SMTP connections)
                var smtpTransport = nodemailer.createTransport('SMTP',{
                    host: 'smtp.gmail.com', // hostname
                    secureConnection: true, // use SSL
                    port: 465, // port for secure SMTP
                    service: 'Gmail',
                    auth: {
                        user: SENDER_EMAIL,
                        pass: SENDER_PWD
                    }
                });
                
                
                var txtMessage = 'Here is your new password : '+newPassword,
                    htmlMessage = 'Here is your new password : <b>'+newPassword+'</b>';
                
                var mailOptions = {
                    from: 'UTT Internships Administration  <utt.internships@utt.fr>',
                    to: email,
                    subject: 'UTT Internships application  : New password', 
                    text: txtMessage,
                    html: htmlMessage
                };
                
                // send mail with defined transport object
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + response.message);
                    }
                    
                    smtpTransport.close();
                });
        
                _res.json({message : 'An email have been sent to '+email+' with a new password !'});
            }
        })
    }
};