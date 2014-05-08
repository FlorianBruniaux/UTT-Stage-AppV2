define([
    'app',
    'utt.stages',
    'tpl!modules/teachers/offers/validation/templates/list.tpl',
    'tpl!modules/teachers/offers/validation/templates/list_item.tpl'
], function(AppManager, UttStages, listTpl, listItemTpl){
    
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
                
                setTimeout(function(){
                    API.misc.initDataTable();
                }, 100);
                
            },
            
            onRender: function(){

                
            }
        });
    });
    
    return AppManager.OffersModule.Validation.View;
})