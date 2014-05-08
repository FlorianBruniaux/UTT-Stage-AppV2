define([
    'app',
    'utt.stages',
    'modules/common/offers/show/show_view'
], function(AppManager, UttStages, View){
  
    // OffersModule Show Controller
    AppManager.module('OffersModule.Show', function(Show, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        Show.Controller = {
            
            // To show a specific offer
            showOffer: function(_options){
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.id);
                $.when(fetchingOffer).done(function(_offer){

                    
                    if (_offer !== undefined) {
                        
                        _offer.set('userCategory', _options.userCategory);
                        
                        // Updates breadcrumb
                        var path = [
                            { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                            { name: 'offers.list', url: 'offers/list', navigationTrigger: 'offers:list' },
                            { name: 'n° '+_offer.get('ref'), url: 'offers/'+_offer.get('_id'), navigationTrigger: 'offer:show', id:_offer.get('_id') }
                        ];
                        AppManager.trigger('breadcrumb:update', path);

                        var view = new View.Offer({
                            model: _offer
                        });
                        
                        AppManager.contentRegion.show(view);
                        
                    }else{
                        API.errors.e404();
                    }
                }); 
            } 
        }
    });
    
    return AppManager.OffersModule.Show.Controller;
});
