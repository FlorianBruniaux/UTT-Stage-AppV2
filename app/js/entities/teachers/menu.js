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
        
        AppManager.reqres.setHandler('teachers:menu:entities', function(){
            if (Entities.menuItems === undefined) {
                Entities.menuItems = new Entities.MenuCollection([
                    { name: "menu.home", url: "home", icon: "icon-home", navigationTrigger: "teachers:home:root" },
                    { name: "menu.offers", url: "offers", icon: "icon-newspaper", navigationTrigger: "teachers:offers:root" },
                    { name: "menu.monitoring", url: "monitoring/list", icon: "icon-list", navigationTrigger: "teachers:monitoring:list" },
                    { name: "menu.messages", url: "messages/list", icon: "icon-bubble4", navigationTrigger: "messages:list" },
                    { name: "menu.contacts", url: "contacts/list", icon: "icon-address-book", navigationTrigger: "contacts:list" },
                    { name: "menu.companies", url: "companies/list", icon: "icon-office", navigationTrigger: "companies:list" }
                ]);
            }
            return Entities.menuItems;
        });
        
        
    });

    return ;
})