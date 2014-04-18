define([
    'app',
    'utt.stages',
    'modules/common/offers/list/list_view'
], function(AppManager, UttStages, View){
    
    // OffersModule List Controller
    AppManager.module('OffersModule.List', function(List, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        List.Controller = {
            
            // To list all the offers
            listOffers: function(arr){
                
                if(DEBUG) console.info('offers.list.list_controller.listOffers()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                var criterion = arr[0],
                    value = arr[1];
                        
                // Updates breadcrumb
               var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                    { name: 'offer.list', url: 'offers/list', navigationTrigger: 'offer:list' }
                ];
                if (criterion && value) {
                    path.push(
                        { name: criterion+' = '+value , url: 'offers/list/filter/'+criterion+':'+value, navigationTrigger: 'offers:filter' }
                    )
                } 
                AppManager.trigger('breadcrumb:update', path);
 
                // Gets all the offers (CF entities folder)
                // When all the offers are fetched (CF use of defer.promise() )
                var fetchingOffers = AppManager.request('offers:entities');
                $.when(fetchingOffers).done(function(offers){

                    var filteredOffers = MeeiTbApp.entities.filterCollection(offers);
                    if(criterion && value){
                        filteredOffers.filter(criterion,value);
                    }
                      
                    var offersListView = new View.Offers({
                        collection: filteredOffers
                    });
                    
                    offersListView.on('itemview:offer:show', function(childView, model){
                        AppManager.trigger('offer:show', model.get('_id'));
                    });
                    
                    offersListView.on('itemview:offer:edit', function(childView, model){
                        AppManager.trigger('offer:edit', model.get('_id'));
                    })
                    
                    AppManager.contentRegion.show(offersListView);
                });   

                
            }
        }
    });

    return AppManager.OffersModule.List.Controller;
})