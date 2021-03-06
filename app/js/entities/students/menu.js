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
                    { name: "menu.home", url: "home", icon: "icon-home", navigationTrigger: "students:home:root" },
                    { name: "menu.offers", url: "offers/list", icon: "icon-newspaper", navigationTrigger: "offers:list" },
                    { name: "menu.favorites", url: "offers/favorites", icon: "icon-star4", navigationTrigger: "students:offers:favorites" },
                    { name: "menu.monitoring", url: "monitoring", icon: "icon-list", navigationTrigger: "students:monitoring:show" },
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