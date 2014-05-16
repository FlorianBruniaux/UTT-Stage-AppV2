define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // CompaniesModule
    AppManager.module('CompaniesModule', function(CompaniesModule, AppManager, Backbone, Marionette, $, _){
        
        // To prevent auto start of the module and do it manually
        CompaniesModule.startWithParent = false;
        
        CompaniesModule.onStart = function(){
            if(DEBUG) console.info('Starting companies_module'); 
        }
        
        CompaniesModule.onStop = function(){
            if(DEBUG) console.info('stopping companies_module');
        }
        
    });
    
    // CompaniesModule routes
    AppManager.module('Routers.CompaniesModule', function(CompaniesModuleRouter, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        CompaniesModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'companies': 'listRootOptions',
                'companies/list(/filter)': 'listCompanies',
                'companies/list(/filter?:parameters)': 'listCompanies',
                'companies/new': 'addNewCompany',
                'companies/:id': 'showCompany',
                'companies/:id/edit': 'editCompany',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('internship_managers.companies.companies_module.executeAction()');
            
            AppManager.startModule('CompaniesModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'companies');
        };
        
        
        /****************************************/
        /*  RouterAPI                           */
        /****************************************/
        
        var RouterAPI = {
            
            //  If the route does not exist
            notFound : function(){
                API.errors.e404();
            },
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('internship_managers.companies.companies_module.showRoot()');
                
                require([
                    'modules/internship_managers/companies/root/root_controller'    
                ], function(RootController){
                    executeAction(RootController.listRootOptions, {});
                });
            },
            
            // To list all the companies
            listCompanies: function(){
                
                if(DEBUG) console.info('internship_managers.companies.companies_module.listCompanies()');
                
                require([
                    'modules/common/companies/list/list_controller'    
                ], function(ListController){
                    executeAction(ListController.listCompanies, {});
                });
            },
            
            // To add a new company
            addNewCompany: function(){
                
                if(DEBUG) console.info('internship_managers.companies.companies_module.listCompanies()');
                
                require([
                    'modules/internship_managers/companies/new/new_controller'    
                ], function(NewController){
                    executeAction(NewController.addNewCompany, {});
                });
            },
            
            // To show a specific company
            showCompany: function(_id){
                
                if(DEBUG) console.info('internship_managers.companies.companies_module.showCompany()');
                
                require([
                    'modules/common/companies/show/show_controller'    
                ], function(ShowController){
                    executeAction(ShowController.showCompany, {'companyId':_id, 'userCategory':'internship_managers'});
                });
            },
            
            // To edit a specific company
            editCompany: function(_id){
                
                if(DEBUG) console.info('internship_managers.companies.companies_module.editCompany()');
                
                require([
                    'modules/internship_managers/companies/edit/edit_controller'    
                ], function(EditController){
                    executeAction(EditController.editCompany, {'companyId':_id});
                });
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/
        
        /**
         *  Event = 'companies:root'
         */
        AppManager.on('internship_managers:companies:root', function(){
            AppManager.navigate('companies');
            RouterAPI.listRootOptions();
        });
        
        /**
         *  Event = 'companies:list'
         */
        AppManager.on('companies:list', function(){
            AppManager.navigate('companies/list');
            RouterAPI.listCompanies();
        });
        
        /**
         *  Event = 'company:new'
         */
        AppManager.on('internship_managers:company:new', function(){
            AppManager.navigate('companies/new');
            RouterAPI.addNewCompany();
        });
        
        /**
         *  Event = 'companies:filter'
         */
        AppManager.on('companies:filter', function(_params){
            if(_params){
                AppManager.navigate('companies/list/filter?'+_params);
                RouterAPI.listCompanies();
            }else{
                AppManager.navigate('companies');
            }
        });
        
        /**
         *  Event = 'company:edit'
         */
        AppManager.on('internship_managers:company:edit',function(_id){
            AppManager.navigate('companies/'+_id+'/edit');
            RouterAPI.editCompany(_id);
        });
        
        /**
         *  Event = 'company:show'
         */
        AppManager.on('company:show', function(_id){
            AppManager.navigate('companies/' + _id);
            RouterAPI.showCompany(_id);
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize CompaniesModule
         */
        AppManager.addInitializer(function(){
            new CompaniesModuleRouter.Router({
                controller: RouterAPI
            })
        });
    });

    return AppManager.CompaniesModuleRouter;

})