define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "OFFERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.Sheet = Backbone.Model.extend({
            urlRoot: '/db/sheet',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'sheet',
                num:'',
                deadline:'',
                specific:{}
            }
        });
        
        // Collection
        Entities.SheetCollection = Backbone.Collection.extend({
           url: '/db/sheet',
           model: Entities.Sheet
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('sheets:entities', function(){
            return API.entities.getEntities(new Entities.SheetCollection());
        });
        
        AppManager.reqres.setHandler('sheet:entity', function(_id){
            return API.entities.getEntity(new Entities.Sheet({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('sheet:entity:new', function(_sheet){
            return new Entities.Sheet(_sheet);
        });
        
    });
})