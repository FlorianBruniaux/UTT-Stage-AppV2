define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "OFFERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.Company = Backbone.Model.extend({
            urlRoot: '/db/offer',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'company',
                name:'',
                address:{
                    country:'',
                    city:'',
                    details:''
                },
                website:'',
                contacts:[]
            }
        });
        
        // Collection
        Entities.CompanyCollection = Backbone.Collection.extend({
           url: '/db/offer',
           model: Entities.Company
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('companies:entities', function(){
            return API.entities.getEntities(new Entities.CompanyCollection());
        });
        
        AppManager.reqres.setHandler('company:entity', function(_id){
            return API.entities.getEntity(new Entities.Company({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('company:entity:new', function(_company){
            return new Entities.Company(_company);
        });
        
    });
})