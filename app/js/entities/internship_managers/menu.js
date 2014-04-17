define([
    'app',
    'backbone.picky'
], function(AppManager){
    
    // "MENU" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){
        
        // Model
        Entities.Menu = Backbone.Model.extend({
           initialize: function(){
                var selectable = new Backbone.Picky.Selectable(this);
                _.extend(this, selectable);
           }
        });
        
        // Collection
        Entities.MenuCollection = Backbone.Collection.extend({
            model : Entities.Menu,
            initialize: function(){
                var singleSelect = new Backbone.Picky.SingleSelect(this);
                _.extend(this, singleSelect);
            }
        });
        
        AppManager.reqres.setHandler('students:menu:entities', function(){
            if (Entities.menuItems === undefined) {
                Entities.menuItems = new Entities.MenuCollection([
                    { name: "menu.home", url: "home", icon: "icon-home", navigationTrigger: "home:root" },
                    { name: "menu.offers", url: "offers", icon: "icon-newspaper", navigationTrigger: "offers:list" },
                    { name: "menu.research", url: "research", icon: "icon-search3", navigationTrigger: "search:root" },
                    { name: "menu.monitoring", url: "monitoring", icon: "icon-list", navigationTrigger: "monitoring:root" },
                    { name: "menu.messages", url: "messages", icon: "icon-bubble4", navigationTrigger: "messages:list" },
                    { name: "menu.contacts", url: "users", icon: "icon-users", navigationTrigger: "users:list" }
                ]);
            }
            return Entities.menuItems;
        });
        
        
    });

    return ;
})