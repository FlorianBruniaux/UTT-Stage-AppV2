define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "USERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.User = Backbone.Model.extend({
            urlRoot: '/db/user',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'user',
                userCategory: 'students',
                lastConnexion: '',
                linkedinId: '',
                firstName : '',
                lastName : '',
                mobile: '',
                email: '',
                headline: '',
                summary: '',
                photoUrl: '',
                favorites:[],
                positions: {},
                educations: {},
                skills: {}
            }
        });
        
        // Collection
        Entities.UserCollection = Backbone.Collection.extend({
           url: '/db/user',
           model: Entities.User
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('users:entities', function(){
            return API.entities.getEntities(new Entities.UserCollection());
        });
        
        AppManager.reqres.setHandler('user:entity', function(_id){
            return API.entities.getEntity(new Entities.User({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('user:entity:new', function(_user){
            return new Entities.User(_user);
        });
        
    });
})