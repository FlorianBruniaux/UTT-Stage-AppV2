define([
    'app'
], function(AppManager){
    
    // "ROOTS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){
        
        // Model
        Entities.Roots = Backbone.Model.extend({
        });
        
        // Collection
        Entities.RootsCollection = Backbone.Collection.extend({
            model : Entities.Roots,
        });
        
        //Home
        AppManager.reqres.setHandler('teachers:homeRoot:entities', function(){
            if (Entities.homeRootListItems === undefined) {
                Entities.homeRootListItems = new Entities.RootsCollection([
                    { name: "home.panel.actions.offers.list", url: "offers", icon: "icon-newspaper", navigationTrigger: "teachers:offers:list", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.research", url: "research", icon: "icon-search3", navigationTrigger: "teachers:research:root", bg_class:" bg-info", msg: "<br />" },
                    { name: "home.panel.actions.validation", url: "validation", icon: "icon-checkmark3", navigationTrigger: "teachers:analyze:root", bg_class:"bg-danger", msg: "2 offres à analyser" },
                    { name: "home.panel.actions.messages", url: "messages", icon: "icon-bubble4", navigationTrigger: "teachers:messages:list", bg_class:"bg-success", msg: "2 nouveaux messages" },
                    { name: "home.panel.actions.contacts", url: "contacts", icon: "icon-users", navigationTrigger: "contacts:root", bg_class:" bg-info", msg: "<br />" }
                ]);
            }
            return Entities.homeRootListItems;
        });
        
        
    });

    return ;
})