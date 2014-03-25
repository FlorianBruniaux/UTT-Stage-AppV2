define([
    'app'
], function(AppManager){
    
    // "BREADCRUMB" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){
        
        // Model
        Entities.Breadcrumb = Backbone.Model.extend({
        });
        
        // Collection
        Entities.BreadcrumbCollection = Backbone.Collection.extend({
            model : Entities.Breadcrumb
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('breadcrumb:entities', function(_path){
           return new Entities.BreadcrumbCollection(_path);
        });
        
    });

    return ;
})