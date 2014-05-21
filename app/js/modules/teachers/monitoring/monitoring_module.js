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

                'monitoring/list(/filter)': 'listMonitoring',
                'monitoring/list(/filter?:parameters)': 'listMonitoring',
                'monitoring/:id': 'showMonitoring',
                'monitoring/:id/edit': 'editMonitoring',
                
                //  Sheets
                'monitoring/:id/edit/:sheet': 'editSheet',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('teachers.monitoring.monitoring_module.executeAction()');
            
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
            
            // To list all the monitoring
            listMonitoring: function(){
                
                if(DEBUG) console.info('teachers.monitoring.monitoring_module.listMonitoring()');
                
                require([
                    'modules/common/monitoring/list/list_controller'    
                ], function(ListController){
                    executeAction(ListController.listMonitoring, {'teachers':'internship_managers'});
                });
            },
            
            // To show a specific monitoring
            showMonitoring: function(_options){
                
                if(DEBUG) console.info('teachers.monitoring.monitoring_module.showMonitoring()');
                
                require([
                    'modules/common/monitoring/show/show_controller'    
                ], function(ShowController){
                    
                    if (!_.isObject(_options)) {
                        var temp = _options;
                        _options = {};
                        _options.monitoringId = temp;
                    }
                    
                    _options.userCategory = 'teachers';
                    
                    executeAction(ShowController.showMonitoring, _options);
                });
            },
            
            // To edit a specific monitoring
            editMonitoring: function(_options){
                
                if(DEBUG) console.info('teachers.monitoring.monitoring_module.editMonitoring()');
                
                require([
                    'modules/teachers/monitoring/edit/edit_controller'    
                ], function(EditController){
                    
                    if (!_.isObject(_options)) {
                        var temp = _options;
                        _options = {};
                        _options.monitoringId = temp;
                    }
                    
                    executeAction(EditController.editMonitoring, _options);
                });
            },
            
            // To edit a specific monitoring
            editSheet: function(_options, _sheet){

                if(DEBUG) console.info('teachers.monitoring.monitoring_module.editSheet()');
                
                require([
                    'modules/common/monitoring/sheets/edit/'+((_sheet)? _sheet:_options.sheet)+'/edit_controller'    
                ], function(EditController){
                    
                    if (!_.isObject(_options)) {
                        var temp = _options;
                        _options = {};
                        _options.monitoringId = temp;
                        
                        
                    }
                    
                    _options.userCategory = 'teachers';
                    
                    executeAction(EditController.editSheet, _options);
                });
                
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/
        
        
        /**
         *  Event = 'monitoring:list'
         */
        AppManager.on('teachers:monitoring:list', function(){
            AppManager.navigate('monitoring/list');
            RouterAPI.listMonitoring();
        });
        
        /**
         *  Event = 'monitoring:filter'
         */
        AppManager.on('teachers:monitoring:filter', function(_params){
            if(_params){
                AppManager.navigate('monitoring/list/filter?'+_params);
                RouterAPI.listMonitoring();
            }else{
                AppManager.navigate('monitoring');
            }
        });
        
        /**
         *  Event = 'monitoring:edit'
         */
        AppManager.on('teachers:monitoring:edit',function(_options){
            AppManager.navigate('monitoring/'+_options.monitoringId+'/edit');
            RouterAPI.editMonitoring(_options);
        });
        
        /**
         *  Event = 'monitoring:edit:sheet'
         */
        AppManager.on('teachers:monitoring:edit:sheet',function(_options){
            AppManager.navigate('monitoring/'+_options.monitoringId+'/edit/'+_options.sheet);
            RouterAPI.editSheet(_options);
        });
        
        /**
         *  Event = 'monitoring:show'
         */
        AppManager.on('teachers:monitoring:show', function(_options){
            AppManager.navigate('monitoring/' + _options.monitoringId);
            RouterAPI.showMonitoring(_options);
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