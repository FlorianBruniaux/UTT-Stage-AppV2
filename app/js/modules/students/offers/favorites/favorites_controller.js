define([
    'app',
    'utt.stages',
    'modules/students/offers/favorites/favorites_view'
], function(AppManager, UttStages, View){
    
    // OffersModule Validation Controller
    AppManager.module('OffersModule.Validation', function(Validation, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Validation.Controller = {
            
            // To list all the offers
            listFavoritesOffers: function(_options){
                
                if(DEBUG) console.info('offers.validation.validation_controller.listFavoritesOffers()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers/list', navigationTrigger: 'students:offers:list' },
                    { name: 'offers.favorites', url: 'offers/favorites', navigationTrigger: 'students:offers:favorites' }
                ];
                AppManager.trigger('breadcrumb:update', path);
 
                
                
                // Gets all the offers (CF entities folder)
                // When all the offers are fetched (CF use of defer.promise() )
                var fetchingOffers = AppManager.request('offers:entities'),
                    fetchingUser = AppManager.request('user:entity', $('#user-id').html());
                    
                $.when(fetchingOffers, fetchingUser).done(function(_offers, _user){
                    
                    var filteredOffers = API.entities.filterCollection(_offers);
                    
                    if ( !_.isEmpty(_user.get('favorites'))) {
                        
                        var favoritesIds = '';
                        _.each(_user.get('favorites'), function(_offerId){
                            favoritesIds += _offerId+',';
                        });
                        
                        var prms = API.misc.getParmsFromURL(window.location.href),
                            //  We only display offers put in favorites
                            criterions = ['_id'],
                            values = [favoritesIds];
    
                        
                        if (criterions.length > 0 && values.length > 0) {
                            filteredOffers.filter(criterions, values);
                        }

                        var favoritesOffersListView = new View.Offers({
                            collection: filteredOffers,
                            params: prms
                        });
                        
                        favoritesOffersListView.on('itemview:offer:show', function(childView, model){
                            AppManager.trigger('offer:show', model.get('_id'));
                        });
     
                        AppManager.contentRegion.show(favoritesOffersListView);
                    }
                    else{
                        AppManager.contentRegion.show(new View.noFavorite());
                    }
                    
                });   
 
            }
        }
    });

    return AppManager.OffersModule.Validation.Controller;
})