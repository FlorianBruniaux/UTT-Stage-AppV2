define([
    'app',
    'utt.stages',
    'tpl!modules/common/offers/validation/templates/list.tpl',
    'tpl!modules/common/offers/validation/templates/list_item.tpl',
    'socket.io'
], function(AppManager, UttStages, listTpl, listItemTpl, io){
    
    // OffersModule Validation View
    AppManager.module('OffersModule.Validation.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        View.Offer = Marionette.ItemView.extend({
            tagName: 'tr',
            template: listItemTpl,
            events: {
                'click td a.js-show': API.views.events.showClicked
            }
        })
        
        View.Offers = Marionette.CompositeView.extend({
            template: listTpl,
            itemView: View.Offer,
            itemViewContainer: 'tbody',
            initialize: function(){
                
                var self = this;
                
                //  To update view when a new offer is created
                socket = io.connect("http://127.0.0.1:8080");
                socket.on('update:offers:validation:view', function () {
                    if (AppManager.getCurrentRoute() == 'offers/validation') {
                        $('#new-offer-msg').fadeIn(500);
                        setTimeout(function(){
                            AppManager.trigger('offers:validation')
                        }, 1000);
                    }
                });
                
                setTimeout(function(){
                    API.misc.initDataTable();
                }, 100);
                
            },
            onClose: function(){
                this.remove();
            }
        });
    });
    
    return AppManager.OffersModule.Validation.View;
})