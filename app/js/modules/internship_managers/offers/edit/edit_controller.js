define([
    'app',
    'utt.stages',
    'modules/internship_managers/offers/common/view'
], function(AppManager, UttStages, View){
    
    // OffersModule edit Controller
    AppManager.module('OffersModule.Edit', function(Edit, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        Edit.Controller = {
            
            // To edit an offer
            editOffer: function(_options){
                
                if(DEBUG) console.info("internship_managers.offers.edit.edit_controller.editOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                    { name: 'offer.edit', url: 'offers/edit', navigationTrigger: 'offer:edit' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets the offer
                // When the offer is fetched (CF use of defer.promise() )
                var fetchingOffer = AppManager.request('offer:entity', _options.offerId);
                $.when(fetchingOffer).done(function(_offer){
                    
                    if (_offer !== undefined) {
                        
                        var view = new View.Form({
                            model: _offer,
                            title: polyglot.t('offer.edit')
                        });
                        
                        view.on('form:submit', function(data){
                            
                            API.misc.showLoader();
                            
                            if (_offer.save(data)) {
                                AppManager.trigger("offer:show", _options.offerId);
                            }
                            
                        });
                        
                        AppManager.contentRegion.show(view);

                    }
                    else{
                        API.errors.e404();
                    }
                    
                });
                
                
            }
        }; 
    });
    
    return AppManager.OffersModule.Edit.Controller;
})