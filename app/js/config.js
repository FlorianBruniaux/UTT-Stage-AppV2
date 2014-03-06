// Enable/Disable DEBUG mode
if (typeof DEBUG === "undefined") DEBUG = true;

// Require configuration paths etc
requirejs.config({
    
    shim: {
        
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        },
        
        "backbone.picky" : ["backbone"],
        
        "backbone.syphon": ["backbone"],
        
        bootbox: ["jquery","bootstrap"],
        
        entitiesHelpers: ["jquery"],
        
        jasnybootstrap : ["jquery"],
        
        underscore: {
            exports: "_"
        },
        
        jquery: {
            exports: "$"
        },
        
        "jquery-ui": ["jquery"],
        
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        }
    },
    
    paths: {
        
        backbone: "../bower_components/backbone/backbone",
        
        //Selectable entities as mixins for Backbone.Model and Backbone.Collection!
        "backbone.picky": "../bower_components/backbone.picky/src/backbone.picky",
        
        //Serialize the forms in your Backbone.Views into a JSON object for use with Backbone"s models.
        "backbone.syphon": "../bower_components/backbone.syphon/lib/backbone.syphon",
        
        //To deal with alert boxes etc
        bootbox: "../bower_components/bootbox.js/bootbox",
        
        bootstrap: "../bower_components/bootstrap/dist/js/bootstrap.min",
        
        //To deak with .css files
        css: "../bower_components/require-css/css",
        
        entitiesHelpers: "common/utilities/entities_helpers.perso",
        
        //To deal with bootstrap dropdow menu
        jasnybootstrap: "../bower_components/jasny-bootstrap/dist/js/jasny-bootstrap.min",
        
        jquery: "../bower_components/jquery/jquery",
        
        "jquery-ui": "../bower_components/jquery-ui-bootstrap/assets/js/jquery-ui-1.10.0.custom.min",

        marionette: "../bower_components/marionette/lib/backbone.marionette",
       
        //An animated CSS3 loading spinner with VML fallback for IE.
        spin: "vendors/loader/spin",
        
        "spin.jquery": "vendors/loader/spin.jquery",
        
        //To deal with .tpl files with underscore
        tpl: "../bower_components/requirejs-tpl/tpl",

        underscore: "../bower_components/underscore/underscore"
    }
});

// Initialize the application with the main application file.
requirejs([
    
    "main"
    
]);