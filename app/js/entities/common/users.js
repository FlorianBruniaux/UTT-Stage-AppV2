define([
    'app',
    'meeitb'
], function(AppManager, MeeiTb){
    
    // "USERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var MeeiTbApp = new MeeiTb.Application(AppManager);
        
        // Model
        Entities.User = Backbone.Model.extend({
            urlRoot: '/db/user',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'user',
                userCategory: '',
                linkedinId: '',
                nom : '',
                prenom : '',
                mobile: '',
                email: '',
                headline: '',
                photoUrl: ''
            },
            
            // To validate form (new & edit)
            validate: function(_attrs, _options){
                var errors = {};
                
                if (!_.isEmpty(errors)) return errors;
            }
        });
        
        // Collection
        Entities.UserCollection = Backbone.Collection.extend({
           url: '/db/user',
           model: Entities.User,
           comparator: 'nom'
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('users:entities', function(){
            return MeeiTbApp.entities.getEntities(new Entities.UserCollection());
        });
        
        AppManager.reqres.setHandler('user:entity', function(_id){
            return MeeiTbApp.entities.getEntity(new Entities.User({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('user:entity:new', function(_user){
            return new Entities.User(_user);
        });
        
    });
})