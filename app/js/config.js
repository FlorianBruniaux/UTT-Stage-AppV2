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
        
        bootstrap: ["jquery"],
        
        collapsible: ["jquery"],
        
        collapsibleMenu : ["collapsible"],
        
        dropdown: ["jquery"],
        
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
        
        backbone: "vendors/bower/backbone/js/backbone",
        
        //Selectable entities as mixins for Backbone.Model and Backbone.Collection!
        "backbone.picky": "vendors/bower/backbone.picky/js/backbone.picky",
        
        //Serialize the forms in your Backbone.Views into a JSON object for use with Backbone"s models.
        "backbone.syphon": "vendors/bower/backbone.syphon/js/backbone.syphon",
        
        //To deal with alert boxes etc
        bootbox: "vendors/bower/bootbox.js/js/bootbox",
        
        bootstrap: "vendors/bower/bootstrap/js/bootstrap.min",
        
        collapsible: "vendors/collapsible.min",
        
        collapsibleMenu: "common/utilities/collapsible_menu.perso",
        
        //To deak with .css files
        css: "vendors/bower/require-css/js/css",
        
        
        //To deal with bootstrap dropdow menu
        jasnybootstrap: "vendors/bower/jasny-bootstrap/js/jasny-bootstrap.min",
        
        jquery: "vendors/bower/jquery/jquery",
        
        "jquery-ui": "vendors/bower/jquery-ui-bootstrap/js/jquery-ui-1.10.0.custom.min",

        marionette: "vendors/bower/marionette/js/backbone.marionette",
       
        //An animated CSS3 loading spinner with VML fallback for IE.
        spin: "vendors/loader/spin",
        
        "spin.jquery": "vendors/loader/spin.jquery",
        
        //To deal with .tpl files with underscore
        tpl: "vendors/bower/requirejs-tpl/js/tpl",

        underscore: "vendors/bower/underscore/js/underscore"
    }
});

// Initialize the application with the main application file.
requirejs([
    
    "main"
    
]);