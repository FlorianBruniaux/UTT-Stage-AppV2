define([
    'app'
], function(AppManager){

    // Students HomeModule
    AppManager.module('HomeModule', function(HomeModule, AppManager, Backbone, Marionette, $, _){
        
        // To prevent auto start of the module and do it manually
        HomeModule.startWithParent = false;
        
        HomeModule.onStart = function(){
            if(DEBUG) console.info('Starting teachers home_module');
        }
        
        HomeModule.onStop = function(){
            if(DEBUG) console.info('Stopping teachers home_module');
        }
        
    });
    
    // Routers module > Home
    AppManager.module('Routers.HomeModule', function(HomeModuleRouter, AppManager, Backbone, Marionette, $, _){
        
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        HomeModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'home' : 'listRootOptions'
            }
        });
        
        // Executes the actions given by API functions (when they are triggered)
        var executeAction = function(action, arg){
            
            if(DEBUG) console.info('teachers.home.home_module.executeAction()');
            
            AppManager.startModule('HomeModule');
            action(arg);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'home');
        };
       
       
        /****************************************/
        /*  API                                 */
        /****************************************/
        
        var API = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('teachers.home.home_module.API.showRoot()');
                
                require([
                    'modules/teachers/home/root/root_controller'    
                ], function(RootController){
                    executeAction(RootController.listRootOptions, {});
                });
            }
            
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/
        
        /**
         *  Event = 'home:root'
         */
        AppManager.on('teachers:home:root', function(){
            AppManager.navigate('home');
            API.listRootOptions();
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize HomeModule
         */
        AppManager.addInitializer(function(){
            new HomeModuleRouter.Router({
                controller: API
            });  
        });
    });

    return AppManager.HomeModuleRouter;
})