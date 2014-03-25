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
        
        AppManager.reqres.setHandler('menu:entities', function(){
            if (Entities.menuItems === undefined) {
                Entities.menuItems = new Entities.MenuCollection([
                    { name: "Accueil", url: "home", icon: "icon-home", navigationTrigger: "home:root" },
                    { name: "Utilisateurs", url: "users", icon: "icon-users", navigationTrigger: "users:root" }
                ]);
            }
            return Entities.menuItems;
        });
        
    });

    return ;
})