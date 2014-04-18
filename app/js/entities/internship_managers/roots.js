define([
    'app'
], function(AppManager){
    
    //  "ROOTS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){
        
        //  Model
        Entities.Roots = Backbone.Model.extend({
        });
        
        //  Collection
        Entities.RootsCollection = Backbone.Collection.extend({
            model : Entities.Roots,
        });
        
        //  Home
        AppManager.reqres.setHandler('internship_managers:homeRoot:entities', function(){
            if (Entities.homeRootListItems === undefined) {
                Entities.homeRootListItems = new Entities.RootsCollection([
                    { name: "home.panel.actions.offers.internship_managers", url: "offers", icon: "icon-newspaper", navigationTrigger: "internship_managers:offers:root", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.research", url: "research", icon: "icon-search3", navigationTrigger: "internship_managers:research:root", bg_class:" bg-info", msg: "<br />" },
                    { name: "home.panel.actions.monitoring.internship_managers", url: "monitoring", icon: "icon-list", navigationTrigger: "internship_managers:monitoring:root", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.messages", url: "messages", icon: "icon-bubble4", navigationTrigger: "internship_managers:messages:list", bg_class:"bg-success", msg: "3 nouveaux messages" },
                    { name: "home.panel.actions.contacts", url: "contacts", icon: "icon-users", navigationTrigger: "contacts:root", bg_class:" bg-info", msg: "<br />" }
                ]);
            }
            return Entities.homeRootListItems;
        });
        
        //  Offers
        AppManager.reqres.setHandler('internship_managers:offersRoot:entities', function(){
            if (Entities.offersRootListItems === undefined) {
                Entities.offersRootListItems = new Entities.RootsCollection([
                    { name: "offers.panel.actions.new", url: "offers/new", icon: "icon-plus-circle", navigationTrigger: "internship_managers:offer:new", bg_class:"bg-info", msg: "<br />" },
                    { name: "offers.panel.actions.list", url: "offers/list", icon: "icon-newspaper", navigationTrigger: "internship_managers:offers:list", bg_class:"bg-info", msg: "<br />" }
                ]);
            }
            return Entities.offersRootListItems;
        });
        
        
    });

    return ;
})