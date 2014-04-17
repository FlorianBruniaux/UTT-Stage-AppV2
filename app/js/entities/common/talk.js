define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "USERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.Talk = Backbone.Model.extend({
            urlRoot: '/db/talk',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'talk',
                members: [],
                messages: {
                    
                    '10/02/2014': {
                        hour: '',
                        from: '',
                        content: '',
                    }
                    
                }

            }
        });
        
        // Collection
        Entities.TalkCollection = Backbone.Collection.extend({
           url: '/db/talk',
           model: Entities.Talk
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('talks:entities', function(){
            return API.entities.getEntities(new Entities.TalkCollection());
        });
        
        AppManager.reqres.setHandler('talk:entity', function(_id){
            return API.entities.getEntity(new Entities.Talk({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('talk:entity:new', function(_talk){
            return new Entities.Talk(_talk);
        });
        
    });
})