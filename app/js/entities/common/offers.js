define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "OFFERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.Offer = Backbone.Model.extend({
            urlRoot: '/db/offer',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'offer',
                type: '',//TN05/TN09/TN10/TN07/Alternance
                ref:'',
                department:'',//ISI/SRT/SM/SI/MTE/Master
                departmentSpec:'',// empty/MPL/MSI/MRI etc.
                address:{
                    country:'',
                    city:'',
                    details:''
                },
                company: {},
                mission:'',
                profile:'',
                rem:'',
                tags:[]
            }
        });
        
        // Collection
        Entities.OfferCollection = Backbone.Collection.extend({
           url: '/db/offer',
           model: Entities.Offer
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('offers:entities', function(){
            return API.entities.getEntities(new Entities.OfferCollection());
        });
        
        AppManager.reqres.setHandler('offer:entity', function(_id){
            return API.entities.getEntity(new Entities.Offer({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('offer:entity:new', function(_offer){
            return new Entities.Offer(_offer);
        });
        
    });
})