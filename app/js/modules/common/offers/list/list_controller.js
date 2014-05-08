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
            listOffers: function(){
                
                if(DEBUG) console.info('offers.list.list_controller.listOffers()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                 
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                    { name: 'offers.list', url: 'offers/list', navigationTrigger: 'offer:list' }
                ];
                AppManager.trigger('breadcrumb:update', path);
 
                // Gets all the offers (CF entities folder)
                // When all the offers are fetched (CF use of defer.promise() )
                var fetchingOffers = AppManager.request('offers:entities');
                $.when(fetchingOffers).done(function(_offers){
                    
                    var filteredOffers = API.entities.filterCollection(_offers);
                    
                    var prms = API.misc.getParmsFromURL(window.location.href),
                        //  We only display offers that have already been validated
                        criterions = ['validation.isValidated'],
                        values = ['true'];
                    
                    _.each(prms, function(_value, _key){
                        if (_value != 'all' && _value != '' && _key != 'fullAddress') {
                            criterions.push(_key);
                            values.push(_value);
                        }
                    });
                    
                    if (criterions.length > 0 && values.length > 0) {
                        filteredOffers.filter(criterions, values);
                    }

                    var offersListView = new View.Offers({
                        collection: filteredOffers,
                        params: prms
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