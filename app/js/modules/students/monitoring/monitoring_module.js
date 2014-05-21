define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // MonitoringModule
    AppManager.module('MonitoringModule', function(MonitoringModule, AppManager, Backbone, Marionette, $, _){
        
        // To prevent auto start of the module and do it manually
        MonitoringModule.startWithParent = false;
        
        MonitoringModule.onStart = function(){
            if(DEBUG) console.info('Starting monitoring_module'); 
        }
        
        MonitoringModule.onStop = function(){
            if(DEBUG) console.info('stopping monitoring_module');
        }
        
    });
    
    // MonitoringModule routes
    AppManager.module('Routers.MonitoringModule', function(MonitoringModuleRouter, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        MonitoringModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {

                'monitoring': 'showMonitoring',
                
                //  Sheets
                'monitoring/:sheet/edit': 'editSheet',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('students.monitoring.monitoring_module.executeAction()');
            
            AppManager.startModule('MonitoringModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'monitoring');
        };
        
        
        /****************************************/
        /*  RouterAPI                           */
        /****************************************/
        
        var RouterAPI = {
            
            //  If the route does not exist
            notFound : function(){
                API.errors.e404();
            },
            
            // To show a specific monitoring
            showMonitoring: function(){
                
                if(DEBUG) console.info('students.monitoring.monitoring_module.showMonitoring()');
                
                require([
                    'modules/students/monitoring/show/show_controller'    
                ], function(ShowController){
                    
                    var options = {};
                    options.userCategory = 'students';
                    
                    executeAction(ShowController.showMonitoring, options);
                });
            },
            
            // To edit a specific monitoring
            editSheet: function(_options){

                if(DEBUG) console.info('students.monitoring.monitoring_module.editSheet()');
                
                require([
                    'modules/common/monitoring/sheets/edit/'+((!_.isObject(_options))? _options:_options.sheet)+'/edit_controller'    
                ], function(EditController){
                    
                    if (!_.isObject(_options)) {
                        var temp = _options;
                        _options = {};
                        _options.sheet = temp;
                    }
                    
                    _options.userCategory = 'students';
                    
                    executeAction(EditController.editSheet, _options);
                });
                
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/
        
       
        /**
         *  Event = 'monitoring:edit:sheet'
         */
        AppManager.on('students:monitoring:edit:sheet',function(_options){
            AppManager.navigate('monitoring/'+_options.sheet+'/edit');
            RouterAPI.editSheet(_options);
        });
        
        /**
         *  Event = 'monitoring:show'
         */
        AppManager.on('students:monitoring:show', function(){
            AppManager.navigate('monitoring');
            RouterAPI.showMonitoring();
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize MonitoringModule
         */
        AppManager.addInitializer(function(){
            new MonitoringModuleRouter.Router({
                controller: RouterAPI
            })
        });
    });

    return AppManager.MonitoringModuleRouter;

})