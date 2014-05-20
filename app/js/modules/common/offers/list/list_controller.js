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
            listOffers: function(_options){
                
                if(DEBUG) console.info('offers.list.list_controller.listOffers()');
                
                // Displays loader while data is loading
                API.misc.showLoader();
                 
                // Updates breadcrumb
                var path = [];
                
                if (_options.isProvidedMode) {
                    path.push(
                        { name: 'offers.list.provided', url: 'offers/list/provided', navigationTrigger: 'offers:list:provided' }
                    )
                }
                else{
                    path.push(
                        { name: 'offers.list', url: 'offers/list', navigationTrigger: 'offers:list' }
                    )
                }
                
                if (_options.userCategory != 'students') {
                    path.unshift(
                        { name: 'offers', url: 'offers', navigationTrigger: _options.userCategory+':offers:root' }
                    )
                }
                        
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
                        criterions = ['validation.state'],
                        values = ['validated'];
                        
                    if (_options.isProvidedMode) {
                        criterions.push('provided.by.firstName'),
                        values.push('[NOTempty]');
                    }
                    else{
                        criterions.push('provided.by.firstName'),
                        values.push('[isEmpty]');
                    }
                    
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
                        params: prms,
                        isProvidedMode: ((_options.isProvidedMode) ? true:false)
                    });
                    
                    offersListView.on('itemview:offer:show', function(childView, model){
                        AppManager.trigger('offer:show', model.get('_id'));
                    });
 
                    AppManager.contentRegion.show(offersListView);
                });   
 
            }
        }
    });

    return AppManager.OffersModule.List.Controller;
})