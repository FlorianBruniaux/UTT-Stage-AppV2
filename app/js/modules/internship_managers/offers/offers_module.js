define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // OffersModule
    AppManager.module('OffersModule', function(OffersModule, AppManager, Backbone, Marionette, $, _){
        
        // To prevent auto start of the module and do it manually
        OffersModule.startWithParent = false;
        
        OffersModule.onStart = function(){
            if(DEBUG) console.info('Starting offers_module'); 
        }
        
        OffersModule.onStop = function(){
            if(DEBUG) console.info('stopping offers_module');
        }
        
    });
    
    // OffersModule routes
    AppManager.module('Routers.OffersModule', function(OffersModuleRouter, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        OffersModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'offers': 'listRootOptions',
                'offers/validation': 'listNotValidatedOffers',
                //'offers/research': 'showResearchForm',
                'offers/list(/filter)': 'listOffers',
                'offers/list(/filter?:parameters)': 'listOffers',
                'offers/new': 'addNewOffer',
                'offers/:id': 'showOffer',
                'offers/:id/edit': 'editOffer',
                'offers/:id/provide': 'provideOffer',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('internship_managers.offers.offers_module.executeAction()');
            
            AppManager.startModule('OffersModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'offers');
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
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.showRoot()');
                
                require([
                    'modules/internship_managers/offers/root/root_controller'    
                ], function(RootController){
                    executeAction(RootController.listRootOptions, {});
                });
            },
            
            // To list the offers that need to be validated
            listNotValidatedOffers: function(){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.listNotValidatedOffers()');
                
                require([
                    'modules/common/offers/validation/validation_controller'    
                ], function(ValidationController){
                    executeAction(ValidationController.listNotValidatedOffers, {});
                });
            },
            
            // To list all the offers
            listOffers: function(){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.listOffers()');
                
                require([
                    'modules/common/offers/list/list_controller'    
                ], function(ListController){
                    executeAction(ListController.listOffers, {});
                });
            },
            
            // To add a new offer
            addNewOffer: function(){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.listOffers()');
                
                require([
                    'modules/internship_managers/offers/new/new_controller'    
                ], function(NewController){
                    executeAction(NewController.addNewOffer, {});
                });
            },
            
            // To show a specific offer
            showOffer: function(_id){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.showOffer()');
                
                require([
                    'modules/common/offers/show/show_controller'    
                ], function(ShowController){
                    executeAction(ShowController.showOffer, {'offerId':_id, 'userCategory':'internship_managers'});
                });
            },
            
            // To edit a specific offer
            editOffer: function(_id){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.editOffer()');
                
                require([
                    'modules/internship_managers/offers/edit/edit_controller'    
                ], function(EditController){
                    executeAction(EditController.editOffer, {'offerId':_id});
                });
            },
            
            // To edit a specific offer
            provideOffer: function(_id){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.provideOffer()');
                
                require([
                    'modules/internship_managers/offers/provide/provide_controller'    
                ], function(ProvideController){
                    executeAction(ProvideController.provideOffer, {'offerId':_id});
                });
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/
        
        /**
         *  Event = 'offers:root'
         */
        AppManager.on('internship_managers:offers:root', function(){
            AppManager.navigate('offers');
            RouterAPI.listRootOptions();
        });
        
        /**
         *  Event = 'offers:validation'
         */
        AppManager.on('offers:validation', function(){
            AppManager.navigate('offers/validation');
            RouterAPI.listNotValidatedOffers();
        });
        
        /*
        /**
         *  Event = 'offers:list'
         */
        AppManager.on('offers:list', function(){
            AppManager.navigate('offers/list');
            RouterAPI.listOffers();
        });
        
        /**
         *  Event = 'offer:new'
         */
        AppManager.on('internship_managers:offer:new', function(){
            AppManager.navigate('offers/new');
            RouterAPI.addNewOffer();
        });
        
        /**
         *  Event = 'offers:filter'
         */
        AppManager.on('offers:filter', function(_params){
            if(_params){
                AppManager.navigate('offers/list/filter?'+_params);
                RouterAPI.listOffers();
            }else{
                AppManager.navigate('offers');
            }
        });
        
        /**
         *  Event = 'offer:edit'
         */
        AppManager.on('internship_managers:offer:edit',function(_id){
            AppManager.navigate('offers/'+_id+'/edit');
            RouterAPI.editOffer(_id);
        });
        
        /**
        *  Event = 'offer:provided'
        */
        AppManager.on('internship_managers:offer:provide',function(_id){
            AppManager.navigate('offers/'+_id+'/provide');
            RouterAPI.provideOffer(_id);
        });
        
        /**
         *  Event = 'offer:show'
         */
        AppManager.on('offer:show', function(_id){
            AppManager.navigate('offers/' + _id);
            RouterAPI.showOffer(_id);
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize OffersModule
         */
        AppManager.addInitializer(function(){
            new OffersModuleRouter.Router({
                controller: RouterAPI
            })
        });
    });

    return AppManager.OffersModuleRouter;

})