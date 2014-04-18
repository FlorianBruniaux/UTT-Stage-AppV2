define([
    'app',
    'meeitb',
    'tpl!modules/users/list/templates/list.tpl',
    'tpl!modules/users/list/templates/list_item.tpl'
], function(AppManager, MeeiTb, listTpl, listItemTpl){
    
    // UsersModule List View
    AppManager.module('UsersModule.List.View', function(View, AppManager, Backbone, Marionette, $, _){
    
        var MeeiTbApp = new MeeiTb.Application(AppManager);
        
        View.User = Marionette.ItemView.extend({
            tagName: 'tr',
            template: listItemTpl,
            events: {
                'click td a.js-show': MeeiTbApp.views.events.showClicked,
                'click td a.js-edit': MeeiTbApp.views.events.editClicked,
                'click td .js-delete': MeeiTbApp.views.events.deleteClicked
            }
        })
        
        View.Users = Marionette.CompositeView.extend({
            template: listTpl,
            itemView: View.User,
            itemViewContainer: 'tbody',
            
            initialize: function(){
                
                setTimeout(function(){
                    MeeiTbApp.misc.initDataTable('user-array',4);
                }, 200);
                
            },

        });
    });
    
    return AppManager.UsersModule.List.View;
})