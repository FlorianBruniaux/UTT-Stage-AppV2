define([
    'app',
    'utt.stages',
    'modules/internship_managers/offers/common/view'
], function(AppManager, UttStages, View){
    
    // OffersModule new Controller
    AppManager.module('OffersModule.New', function(New, AppManager, Backbone, Marionette, $, _){
        
       var API = new UttStages.Application(AppManager);
        
        New.Controller = {
            
            // To add a new user
            addNewOffer: function(){
                
                if(DEBUG) console.info("internship_managers.offers.new.new_controller.addNewOffer()");
                
                // Displays loader while data is loading
                API.misc.showLoader();
                
                // Updates breadcrumb
                var path = [
                    { name: 'offers', url: 'offers', navigationTrigger: 'offers:root' },
                    { name: 'offer.new', url: 'offers/new', navigationTrigger: 'offers:new' }
                ];
                AppManager.trigger('breadcrumb:update', path);

                // Gets a new user model (CF entities folder)
                var newOffer = AppManager.request('offer:entity:new');
                
                var view = new View.Form({
                    model: newOffer,
                    title: polyglot.t('offer.new')
                });
                
                view.on('form:submit', function(data){
                    
                    API.misc.showLoader();
                    
                    if (newOffer.save(data)) {
                        AppManager.trigger("offers:list");
                    }
                    
                });
                
                AppManager.contentRegion.show(view);
            }
        }; 
    });
    
    return AppManager.OffersModule.New.Controller;
})