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
                    { name: "home.panel.actions.offers.monitoring", url: "offers", icon: "icon-newspaper", navigationTrigger: "teachers:offers:root", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.monitoring.teachers", url: "validation", icon: "icon-list", navigationTrigger: "teachers:analyze:root", bg_class:"bg-info", msg: "<br />" },
                    { name: "home.panel.actions.messages", url: "messages/list", icon: "icon-bubble4", navigationTrigger: "messages:list", bg_class:"bg-success", msg: "2 nouveaux messages" },
                    { name: "home.panel.actions.contacts", url: "contacts/list", icon: "icon-address-book", navigationTrigger: "contacts:list", bg_class:" bg-info", msg: "<br />" },
                    { name: "home.panel.actions.companies.list", url: "companies/list", icon: "icon-office", navigationTrigger: "companies:list", bg_class:" bg-info", msg: "<br />" }
                ]);
            }
            return Entities.homeRootListItems;
        });
        
        //  Offers
        AppManager.reqres.setHandler('teachers:offersRoot:entities', function(){
            if (Entities.offersRootListItems === undefined) {
                Entities.offersRootListItems = new Entities.RootsCollection([
                    { name: "offers.panel.actions.validation", url: "offers/validation", icon: "icon-warning", navigationTrigger: "offers:validation", bg_class:"bg-danger", msg: "2 offres à valider" },
                    { name: "offers.panel.actions.list", url: "offers/list", icon: "icon-newspaper", navigationTrigger: "offers:list", bg_class:"bg-info", msg: "<br />" }
                ]);
            }
            return Entities.offersRootListItems;
        });
        
    });

    return ;
})