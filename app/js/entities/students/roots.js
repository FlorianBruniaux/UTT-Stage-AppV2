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
        AppManager.reqres.setHandler('students:homeRoot:entities', function(){
            if (Entities.homeRootListItems === undefined) {
                Entities.homeRootListItems = new Entities.RootsCollection([
                    { name: "home.panel.actions.offers.list", url: "offers/list", icon: "icon-newspaper", navigationTrigger: "offers:list", bg_class:"bg-success", msg: "<br />" },
                    { name: "home.panel.actions.monitoring.students", url: "monitoring", icon: "icon-list", navigationTrigger: "students:monitoring:root", bg_class:"bg-danger", msg: "1 tâche à effectuer" },
                    { name: "home.panel.actions.messages", url: "messages", icon: "icon-bubble4", navigationTrigger: "students:messages:list", bg_class:"bg-success", msg: "2 nouveaux messages" },
                    { name: "home.panel.actions.contacts", url: "contacts", icon: "icon-users", navigationTrigger: "contacts:root", bg_class:" bg-info", msg: "<br />" }
                ]);
            }
            return Entities.homeRootListItems;
        });
        
        
    });

    return ;
})