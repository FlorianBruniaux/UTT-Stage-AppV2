define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "OFFERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.Company = Backbone.Model.extend({
            urlRoot: '/db/company',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'company',
                //  'c_' to solve a problem with new/edit form and geocomplete
                //  Geocomplete fill 'name' with the name of the address...
                cname:'',
                description:'',
                lat: '',
                lng: '',
                fullAdress: '',
                website:''
            }
        });
        
        // Collection
        Entities.CompanyCollection = Backbone.Collection.extend({
           url: '/db/company',
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