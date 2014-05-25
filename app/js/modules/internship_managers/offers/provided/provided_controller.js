define([
    'app',
    'utt.stages',
    'modules/common/offers/list/list_view'
], function(AppManager, UttStages, View){
    
    // OffersModule Provided Controller
    AppManager.module('OffersModule.Provided', function(Provided, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Provided.Controller = {
            
            // To provided all the offers
            listProvidedOffers: function(_options){
                
                if(DEBUG) console.info('offers.provided.provided_controller.listProvidedOffers()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                 
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger:'internship_managers:offers:root' },
                    { name: 'offers.provided', url: 'offers/list/provided', navigationTrigger: 'offer:list:provided' }
                ];
                AppManager.trigger('breadcrumb:update', path);
 
                // Gets all the offers (CF entities folder)
                // When all the offers are fetched (CF use of defer.promise() )
                var fetchingOffers = AppManager.request('offers:entities');
                $.when(fetchingOffers).done(function(_offers){
                    
                    var filteredOffers = API.entities.filterCollection(_offers);
                    
                    //  Get the params in the URL
                    //  RQ: They are not directly passed to the function but taken in the url
                    //      because the app has to be restful! (If you send the url to a friend he should see the same thing)
                    var prms = API.misc.getParmsFromURL(window.location.href),
                    
                        //  We only display offers that have already been validated
                        criterions = ['validation.state', 'provided.by.firstName'],
                        values = ['validated', '[NOTempty]'];
                    
                    _.each(prms, function(_value, _key){
                        if (_value != 'all' && _value != '' && _key != 'fullAddress') {
                            criterions.push(_key);
                            values.push(_value);
                        }
                    });
                    
                    if (criterions.length > 0 && values.length > 0) {
                        filteredOffers.filter(criterions, values);
                    }

                    var offersProvidedView = new View.Offers({
                        collection: filteredOffers,
                        params: prms,
                        providedMode: true
                    });
                    
                    offersProvidedView.on('itemview:offer:show', function(childView, model){
                        AppManager.trigger('offer:show', model.get('_id'));
                    });
 
                    AppManager.contentRegion.show(offersProvidedView);
                });   
 
            }
        }
    });

    return AppManager.OffersModule.Provided.Controller;
})