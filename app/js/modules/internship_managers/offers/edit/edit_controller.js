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
            editOffer: function(_id){
                
                if(DEBUG) console.info("internship_managers.offers.edit.edit_controller.addEditOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                    { name: 'offer.edit', url: 'offers/edit', navigationTrigger: 'offer:edit' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets a edit user model (CF entities folder)
                var offer = AppManager.request('offer:entity', _id);
                
                var view = new View.Form({
                    model: offer,
                    title: polyglot.t('offer.edit')
                });
                
                view.on('form:submit', function(data){
                    
                    API.misc.showLoader();
                    
                    if (offer.save(data)) {
                        AppManager.trigger("offer:show", _id);
                    }
                    
                });
                
                AppManager.contentRegion.show(view);
            }
        }; 
    });
    
    return AppManager.OffersModule.Edit.Controller;
})