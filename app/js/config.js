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
        
        jasnybootstrap : ["jquery"],

        jquery: {
            exports: "$"
        },
        
        "jquery-ui": ["jquery"],
        
        "jquery.validate" : ["jquery"],
        
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        
        polyglot: {
            exports: 'Polyglot'
        },
        
        underscore: {
            exports: "_"
        },
        
        "utt.stages": {
            deps: [
                "underscore",
                "jquery"
            ]
        },
    },
    
    paths: {
        
        backbone: "vendors/bower/backbone/js/backbone",
        
        //Selectable entities as mixins for Backbone.Model and Backbone.Collection!
        "backbone.picky": "vendors/bower/backbone.picky/js/backbone.picky",
        
        //Serialize the forms in your Backbone.Views into a JSON object for use with Backbone"s models.
        "backbone.syphon": "vendors/bower/backbone.syphon/js/backbone.syphon",
        
        //To deal with alert boxes etc
        bootbox: "vendors/bower/bootbox.js/js/bootbox",
        
        bootstrap: "vendors/bower/bootstrap/js/bootstrap",
        
        collapsible: "vendors/collapsible.min",
        
        collapsibleMenu: "common/utilities/collapsible_menu.perso",
        
        //To deak with .css files
        css: "vendors/bower/require-css/js/css",
        
        //To deal with bootstrap dropdow menu
        jasnybootstrap: "vendors/bower/jasny-bootstrap/js/jasny-bootstrap.min",
        
        jquery: "vendors/bower/jquery/js/jquery",
        
        "jquery-ui": "vendors/bower/jquery-ui-bootstrap/js/jquery-ui-1.10.0.custom.min",
        
        "jquery.validate": "vendors/bower/jquery-validation/js/jquery.validate",

        marionette: "vendors/bower/marionette/js/backbone.marionette",
       
        polyglot:"vendors/bower/polyglot/js/polyglot",
        
        //An animated CSS3 loading spinner with VML fallback for IE.
        spin: "vendors/loader/spin",
        
        "spin.jquery": "vendors/loader/spin.jquery",
        
        //To deal with .tpl files with underscore
        tpl: "vendors/bower/requirejs-tpl/js/tpl",

        underscore: "vendors/bower/underscore/js/underscore",
        
        "utt.stages": "vendors/utt_stages_api"
    }
});

// Initialize the application with the main application file.
requirejs([
    
    "main"
    
]);