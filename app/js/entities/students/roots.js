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
                    { name: "Consulter les offres", url: "offers", icon: "icon-newspaper", navigationTrigger: "students:offers:list", bg_class:"bg-success", msg: "4 nouvelles offres" },
                    { name: "Faire une recherche", url: "research", icon: "icon-search3", navigationTrigger: "students:research:root", bg_class:" bg-info", msg: "<br />" },
                    { name: "Gérer mon suivi", url: "monitoring", icon: "icon-list", navigationTrigger: "students:monitoring:root", bg_class:"bg-danger", msg: "1 tâche à effectuer" },
                    { name: "Consulter les échanges", url: "messages", icon: "icon-bubble4", navigationTrigger: "students:messages:list", bg_class:"bg-success", msg: "2 nouveaux messages" },
                    { name: "Voir mes contacts", url: "users", icon: "icon-users", navigationTrigger: "students:users:root", bg_class:" bg-info", msg: "<br />" }
                ]);
            }
            return Entities.homeRootListItems;
        });
        
        
    });

    return ;
})