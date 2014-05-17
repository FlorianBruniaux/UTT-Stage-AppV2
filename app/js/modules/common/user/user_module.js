define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // UserModule
    AppManager.module('UserModule', function(UserModule, AppManager, Backbone, Marionette, $, _){
        
        // To prevent auto start of the module and do it manually
        UserModule.startWithParent = false;
        
        UserModule.onStart = function(){
            if(DEBUG) console.info('Starting user_module'); 
        }
        
        UserModule.onStop = function(){
            if(DEBUG) console.info('stopping user_module');
        }
        
    });
    
    // UserModule routes
    AppManager.module('Routers.UserModule', function(UserModuleRouter, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        UserModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'user/profile': 'showUser',
                'user/profile/edit': 'editUser',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('internship_managers.user.user_module.executeAction()');
            
            AppManager.startModule('UserModule');
            
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
            
            // To show a specific user
            showUser: function(){
                
                if(DEBUG) console.info('user.user_module.showUser()');
                
                require([
                    'modules/common/user/profile/show/show_controller'    
                ], function(ShowController){
                    executeAction(ShowController.showUser, {});
                });
            },
            
            // To edit a specific user
            editUser: function(){
                
                if(DEBUG) console.info('user.user_module.editUser()');
                
                require([
                    'modules/common/user/profile/edit/edit_controller'    
                ], function(EditController){
                    executeAction(EditController.editUser, {});
                });
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/
        
        /**
         *  Event = 'user:edit'
         */
        AppManager.on('user:profile:edit',function(){
            AppManager.navigate('user/profile/edit');
            RouterAPI.editUser();
        });
        
        /**
         *  Event = 'user:show'
         */
        AppManager.on('user:profile:show', function(){
            AppManager.navigate('user/profile');
            RouterAPI.showUser();
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize UserModule
         */
        AppManager.addInitializer(function(){
            new UserModuleRouter.Router({
                controller: RouterAPI
            })
        });
    });

    return AppManager.UserModuleRouter;

})