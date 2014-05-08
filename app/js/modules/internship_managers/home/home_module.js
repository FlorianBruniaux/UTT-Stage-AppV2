define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){

    // Students HomeModule
    AppManager.module('HomeModule', function(HomeModule, AppManager, Backbone, Marionette, $, _){
        
        // To prevent auto start of the module and do it manually
        HomeModule.startWithParent = false;
        
        HomeModule.onStart = function(){
            if(DEBUG) console.info('Starting internship_managers home_module');
        }
        
        HomeModule.onStop = function(){
            if(DEBUG) console.info('Stopping internship_managers home_module');
        }
        
    });
    
    // Routers module > Home
    AppManager.module('Routers.HomeModule', function(HomeModuleRouter, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        HomeModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'home' : 'listRootOptions',
                
                //"*notFound": "notFound"
            }
        });
        
        // Executes the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('internship_managers.home.home_module.executeAction()');
            
            AppManager.startModule('HomeModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'home');
        };
       
       
        /****************************************/
        /*  RouterAPI                                 */
        /****************************************/
        
        var RouterAPI = {
            
            //  If the route does not exist
            notFound : function(){
                API.errors.e404();
            },
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('internship_managers.home.home_module.RouterAPI.showRoot()');
                
                require([
                    'modules/internship_managers/home/root/root_controller'    
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
        AppManager.on('internship_managers:home:root', function(){
            AppManager.navigate('home');
            RouterAPI.listRootOptions();
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize HomeModule
         */
        AppManager.addInitializer(function(){
            new HomeModuleRouter.Router({
                controller: RouterAPI
            });  
        });
    });

    return AppManager.HomeModuleRouter;
})