define([
    'app'
], function(AppManager){
    
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
        
        /****************************************/
        /*  Routes                              */
        /****************************************/
        OffersModuleRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'offers': 'listRootOptions',
                'offers/research': 'showResearchForm',
                'offers/list(/filter)': 'listOffers',
                'offers/list(/filter?:parameters)': 'listOffers',
                'offers/new': 'addNewOffer',
                'offers/:id': 'showOffer',
                'offers/:id/edit': 'editOffer'
            }
        });
        
        // Execute the actions given by API functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('internship_managers.offers.offers_module.executeAction()');
            
            AppManager.startModule('OffersModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'offers');
        };
        
        
        /****************************************/
        /*  API                                 */
        /****************************************/
        
        var API = {
            
            // To list all the options of root.
            listRootOptions: function(){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.showRoot()');
                
                require([
                    'modules/internship_managers/offers/root/root_controller'    
                ], function(RootController){
                    executeAction(RootController.listRootOptions, {});
                });
            },
            
            // To list all the offers
            showResearchForm: function(){
                
                if(DEBUG) console.info('internship_managers.offers.offers_module.showResearchForm()');
                
                require([
                    'modules/common/offers/research/research_controller'    
                ], function(ResearchController){
                    executeAction(ResearchController.showResearchForm, {});
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
                    executeAction(EditController.editOffer, _id);
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
            API.listRootOptions();
        });
        
        /**
         *  Event = 'offers:research'
         */
        AppManager.on('offers:research', function(){
            AppManager.navigate('offers/research');
            API.showResearchForm();
        });
        
        /**
         *  Event = 'offers:list'
         */
        AppManager.on('offers:list', function(){
            AppManager.navigate('offers/list');
            API.listOffers();
        });
        
        /**
         *  Event = 'offer:new'
         */
        AppManager.on('internship_managers:offer:new', function(){
            AppManager.navigate('offers/new');
            API.addNewOffer();
        });
        
        /**
         *  Event = 'offers:filter'
         */
        AppManager.on('offers:filter', function(_params){
            if(_params){
                AppManager.navigate('offers/list/filter?'+_params);
                API.listOffers();
            }else{
                AppManager.navigate('offers');
            }
        });
        
        /**
         *  Event = 'offer:edit'
         */
        AppManager.on('internship_managers:offer:edit',function(_id){
            AppManager.navigate('offers/'+_id+'/edit');
            API.editOffer(_id);
        });
        
        /**
         *  Event = 'offer:show'
         */
        AppManager.on('internship_managers:offer:show', function(_id){
            AppManager.navigate('offers/' + _id);
            API.showOffer(_id);
        });
        
        
        /****************************************/
        /*  INITIALIZER                         */
        /****************************************/
        
        /**
         *  @Description: To Initialize OffersModule
         */
        AppManager.addInitializer(function(){
            new OffersModuleRouter.Router({
                controller: API
            })
        });
    });

    return AppManager.OffersModuleRouter;

})