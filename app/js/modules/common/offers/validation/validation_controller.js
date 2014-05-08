define([
    'app',
    'utt.stages',
    'modules/common/offers/validation/validation_view'
], function(AppManager, UttStages, View){
    
    // OffersModule Validation Controller
    AppManager.module('OffersModule.Validation', function(Validation, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Validation.Controller = {
            
            // To list all the offers
            listNotValidatedOffers: function(){
                
                if(DEBUG) console.info('offers.validation.validation_controller.listOffers()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                    { name: 'offers.validation', url: 'offers/validation', navigationTrigger: 'offer:validation' }
                ];
                AppManager.trigger('breadcrumb:update', path);
 
                // Gets all the offers (CF entities folder)
                // When all the offers are fetched (CF use of defer.promise() )
                var fetchingOffers = AppManager.request('offers:entities');
                $.when(fetchingOffers).done(function(_offers){
                    
                    var filteredOffers = API.entities.filterCollection(_offers);
                    
                    var prms = API.misc.getParmsFromURL(window.location.href),
                        //  We only display offers that are not yet validated
                        criterions = ['validation.state'],
                        values = ['not yet treated,denied'];
                    
                    _.each(prms, function(_value, _key){
                        if (_value != 'all' && _value != '' && _key != 'fullAddress') {
                            criterions.push(_key);
                            values.push(_value);
                        }
                    });
                    
                    if (criterions.length > 0 && values.length > 0) {
                        filteredOffers.filter(criterions, values);
                    }

                    var notValidatedOffersListView = new View.Offers({
                        collection: filteredOffers,
                        params: prms
                    });
                    
                    notValidatedOffersListView.on('itemview:offer:show', function(childView, model){
                        AppManager.trigger('offer:show', model.get('_id'));
                    });
 
                    AppManager.contentRegion.show(notValidatedOffersListView);
                });   
 
            }
        }
    });

    return AppManager.OffersModule.Validation.Controller;
})