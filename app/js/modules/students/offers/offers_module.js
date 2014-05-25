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
                'offers/favorites': 'listFavoritesOffers',
                'offers/list(/filter)': 'listOffers',
                'offers/list(/filter?:parameters)': 'listOffers',
                'offers/:id': 'showOffer',
                
                //"*notFound": "notFound"
            }
        });
        
        // Execute the actions given by RouterAPI functions (when they are triggered)
        var executeAction = function(_action, _options, _menuToSetActive){
            
            if(DEBUG) console.info('students.offers.offers_module.executeAction()');
            
            AppManager.startModule('OffersModule');
            
            //  Execute the actions with the options given
            _action(_options);
            
            // Sets the active menu item
            AppManager.execute('set:active:menu', _menuToSetActive);
        };
        
        
        /****************************************/
        /*  RouterAPI                                 */
        /****************************************/
        
        var RouterAPI = {
            
            //  If the route does not exist
            notFound : function(){
                API.errors.e404();
            },
            
            // To list all the offers
            listOffers: function(){
                
                if(DEBUG) console.info('students.offers.offers_module.listOffers()');
                
                require([
                    'modules/common/offers/list/list_controller'    
                ], function(ListController){
                    executeAction(ListController.listOffers, {'userCategory':'students'}, 'offers/list');
                });
            },
            
            // To list favorites offers
            listFavoritesOffers: function(){
                
                if(DEBUG) console.info('students.offers.offers_module.listFavoritesOffers()');
                
                require([
                    'modules/students/offers/favorites/favorites_controller'    
                ], function(FavoritesController){
                    executeAction(FavoritesController.listFavoritesOffers, {'userCategory':'students'}, 'offers/favorites');
                });
            },
        
            // To show a specific offer
            showOffer: function(_options){
                
                if(DEBUG) console.info('students.offers.offers_module.showOffer()');
                
                require([
                    'modules/common/offers/show/show_controller'    
                ], function(ShowController){
                    
                    if (!_.isObject(_options)) {
                        var temp = _options;
                        _options = {};
                        _options.offerId = temp;
                    }
                    
                    _options.userCategory = 'students';
                    
                    executeAction(ShowController.showOffer, _options, 'offers/list');
                });
            }
        };
        
        
        /****************************************/
        /*  EVENTS                              */
        /****************************************/

        
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
         *  Event = 'offers:favorites'
         */
        AppManager.on('students:offers:favorites', function(){
            AppManager.navigate('offers/favorites');
            RouterAPI.listFavoritesOffers();
        });
        
        /**
         *  Event = 'offer:show'
         */
        AppManager.on('offer:show', function(_options){
            AppManager.navigate('offers/' + _options.offerId);
            RouterAPI.showOffer(_options);
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