define([
    'app',
    'utt.stages',
    'tpl!modules/students/offers/favorites/templates/list.tpl',
    'tpl!modules/students/offers/favorites/templates/list_item.tpl',
    'tpl!modules/students/offers/favorites/templates/no_favorite.tpl'
], function(AppManager, UttStages, listTpl, listItemTpl, noFavoriteTpl){
    
    // OffersModule Validation View
    AppManager.module('OffersModule.Validation.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var API = new UttStages.Application(AppManager);
        
        View.noFavorite = Marionette.ItemView.extend({
            template: noFavoriteTpl,
            onRender: function(){
                setTimeout(function(){
                    AppManager.trigger('offers:list');
                },2000);
            }
        });
        
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
            onClose: function(){
                this.remove();
            }
        });
    });
    
    return AppManager.OffersModule.Validation.View;
})