define([
    'marionette',
    'utt.stages',
    'bootstrap'
], function (Marionette, UttStages) {

    'use strict';
    
    //  Creates new Marionnette App
    var AppManager = new Marionette.Application();
    
    if(DEBUG) console.info('AppManager started');
    
    // Creates regions
    AppManager.addRegions({
        mainlayoutRegion:'#main-layout-region',
        breadcrumbRegion: '#breadcrumb-region',
        menuRegion:'#menu-region',
        profileRegion: '#profile-region',
        contentRegion: '#content-region'
    })
    
    //  All navigation that is relative should be passed through the navigate
    //  method, to be processed by the router.
    AppManager.navigate = function(route, options){
        
        if(DEBUG) console.info('AppManager.navigate('+route+')');
        
        options || (options = {});
        Backbone.history.navigate(route, options);
    };
    
    //  To get the current route (backbone url)
    AppManager.getCurrentRoute = function(){
        
        if(DEBUG) console.info('AppManager.getCurrentRoute()');
        
        return Backbone.history.fragment;
    };
    
    //  Starts the chosen module
    AppManager.startModule = function(module, args){
        
        if(DEBUG) console.info('AppManager.startModule('+module+')');
        
        var currentModule = module ? AppManager.module(module) : null;
        
        if (AppManager.currentModule === currentModule) {
            return;
        }
        
        if (AppManager.currentModule) {
            AppManager.currentModule.stop();
        }
        
        AppManager.currentModule = currentModule;
        if (currentModule) {
            currentModule.start(args);
        }   
    };
    
    //  After initialization, run backbone history method
    AppManager.on('initialize:after', function(){
        
        if (Backbone.history) {
            
            require([
                'common/breadcrumb/breadcrumb_module'
            ], function(){
                
                var API = new UttStages.Application(AppManager);
                
                //  To init dropdowns
                API.misc.initDropDown();

                //  To check if user is auth
                //      If yes -> load the modules that correspond to his user category
                //      If no -> login page
                API.ajax.auth.isAuth();
                
            });
            
        }
    });
    
    return AppManager;
});