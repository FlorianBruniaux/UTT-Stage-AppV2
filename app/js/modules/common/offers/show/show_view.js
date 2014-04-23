define([
    'app',
    'tpl!modules/common/offers/show/templates/offer_details.tpl'
], function(AppManager, offerDetailsTpl){
    
    // OffersModule Show View
    AppManager.module('OffersModule.Show.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        View.Offer = Marionette.ItemView.extend({
            template: offerDetailsTpl
        });
        
    });
    
    return AppManager.OffersModule.Show.View;
})