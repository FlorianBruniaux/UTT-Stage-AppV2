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
                //'offers/research': 'showResearchForm',
                'offers/list(/filter)': 'listOffers',
                'offers/list(/filter?:parameters)': 'listOffers',
                'offers/:id': 'showOffer',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options){
            
            if(DEBUG) console.info('students.offers.offers_module.executeAction()');
            
            AppManager.startModule('OffersModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', 'offers/list');
        };
        
        
        /****************************************/
        /*  RouterAPI                                 */
        /****************************************/
        
        var RouterAPI = {
            
            //  If the route does not exist
            notFound : function(){
                API.errors.e404();
            },
            
            /*
            // To list all the offers
            showResearchForm: function(){
                
                if(DEBUG) console.info('students.offers.offers_module.showResearchForm()');
                
                require([
                    'modules/common/offers/research/research_controller'    
                ], function(ResearchController){
                    executeAction(ResearchController.showResearchForm, {});
                });
            },
            */
            
            // To list all the offers
            listOffers: function(){
                
                if(DEBUG) console.info('students.offers.offers_module.listOffers()');
                
                require([
                    'modules/common/offers/list/list_controller'    
                ], function(ListController){
                    executeAction(ListController.listOffers, {});
                });
            },
        
            // To show a specific offer
            showOffer: function(_id){
                
                if(DEBUG) console.info('students.offers.offers_module.showOffer()');
                
                require([
                    'modules/common/offers/show/show_controller'    
                ], function(ShowController){
                    executeAction(ShowController.showOffer, {'offerId':_id, 'userCategory':'students'} );
                });
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/

        /**
         *  Event = 'offers:research'
         */
        /*
        AppManager.on('offers:research', function(){
            AppManager.navigate('offers/research');
            RouterAPI.showResearchForm();
        });
        */
        
        /**
         *  Event = 'offers:list'
         */
        AppManager.on('offers:list', function(){
            AppManager.navigate('offers/list');
            RouterAPI.listOffers();
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