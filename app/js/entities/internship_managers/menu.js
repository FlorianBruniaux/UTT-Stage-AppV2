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
        
        AppManager.reqres.setHandler('internship_managers:menu:entities', function(){
            if (Entities.menuItems === undefined) {
                Entities.menuItems = new Entities.MenuCollection([
                    { name: "menu.home", url: "home", icon: "icon-home", navigationTrigger: "internship_managers:home:root" },
                    { name: "menu.offers", url: "offers", icon: "icon-newspaper", navigationTrigger: "internship_managers:offers:root" },
                    { name: "menu.monitoring", url: "monitoring", icon: "icon-list", navigationTrigger: "internship_managers:monitoring:root" },
                    { name: "menu.messages", url: "messages/list", icon: "icon-bubble4", navigationTrigger: "messages:list" },
                    { name: "menu.contacts", url: "contacts/list", icon: "icon-address-book", navigationTrigger: "contacts:list" },
                    { name: "menu.users", url: "users", icon: "icon-users", navigationTrigger: "internship_managers:users:list" },
                    { name: "menu.companies", url: "companies", icon: "icon-office", navigationTrigger: "internship_managers:companies:root" }
                ]);
            }
            return Entities.menuItems;
        });
        
        
    });

    return ;
})