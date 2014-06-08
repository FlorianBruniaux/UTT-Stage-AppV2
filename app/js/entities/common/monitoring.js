define([
    'app',
    'utt.stages'
], function(AppManager, UttStages){
    
    // "OFFERS" ENTITIES
    AppManager.module('Entities', function(Entities, AppManager, Backbone, Marionette, $, _){

        var API = new UttStages.Application(AppManager);
        
        // Model
        Entities.Monitoring = Backbone.Model.extend({
            urlRoot: '/db/monitoring',
            idAttribute: "_id", 
            defaults: {
                _id: null,
                _objectType : 'monitoring',
                offer: {},
                sheets : {
                    sheet0: {
                        openingDate: '',
                        deadline: '',
                        
                        dates: {
                            from: '',
                            to: ''
                        },
                        semester: '',
                        uttResp: ''
                    },
                    sheet1 : {
                        openingDate: '',
                        deadline: '',

                        naf: '',
                        workforce: '',
                        administrativeResp: {
                            firstName: '',
                            lastName: '',
                            position: '',
                            email: '',
                            phone: ''
                        },
                        technicalResp: {
                            firstName: '',
                            lastName: '',
                            position: '',
                            email: '',
                            phone: ''
                        }
                    },
                    sheet2 : {
                        openingDate: '',
                        deadline: '',
                        
                        subject : {
                            description : '',
                            objectives : '',
                            conditions : '',
                            isInteresting : '',
                            isConcordantWithProfessionalProject : '',
                        },
                        contactWithRespUtt : '',
                        whoseInitiative: ''
                    },
                    sheet3 : {
                        openingDate: '',
                        deadline: '',
                        
                        subjectHasBeenModified: '',
                        planningDesc: '',
                        progress: '',
                        difficulties: '',
                        observations: ''
                    },
                    sheet4 : {
                        openingDate: '',
                        deadline: '',
                        
                        isConcordantWithWork: '',
                        satisfaction: '',
                        globalOpinion: '',
                        taxResp: {
                            firstName: '',
                            lastName: '',
                            position: '',
                            email: '',
                            phone: ''
                        },
                        author:{
                            firstName: '',
                            lastName: '',
                            position: '',
                            email: '',
                            phone: ''
                        }                                     
                    },
                    sheet5 : {
                        openingDate: '',
                        deadline: '',
                        
                        project: '',
                        team: '',
                        company: '',
                        help: '',
                        internshipContribution: '',
                        odds: '',
                        rem: 0,
                        bonus: 0,
                        helpFromUttResp : {
                            enough: 'yes',
                            explanations: ''
                        }
                        
                    },
                    sheet6 : {
                        openingDate: '',
                        deadline: '',
                        
                        adaptability: '',
                        initiative: '',
                        abilityToInform: '',
                        efficiency: '',
                        abilityToWorkInTeam: '',
                        humanRelations: '',
                        attendance: '',
                        skillset: '',
                        innovation: '',
                        organization: '',
                        writtenReportsQuality: '',
                        oralReportsQuality: '',
                        achievementsQuality: '',
                        evolution: ''                      

                    },
                    sheet7 : {
                        openingDate: '',
                        deadline: '',

                        adaptability: '',
                        initiative: '',
                        abilityToInform: '',
                        efficiency: '',
                        abilityToWorkInTeam: '',
                        humanRelations: '',
                        attendance: '',
                        skillset: '',
                        innovation: '',
                        organization: '',
                        writtenReportsQuality: '',
                        oralReportsQuality: '',
                        achievementsQuality: '',
                        evolution: ''
                    },
                    sheet8 : {
                        openingDate: '',
                        deadline: '',
                        
                        receptionDate: '',
                        reportIsConfidential: 'no',
                        presentationIsConfidential: 'no',
                    },
                    sheet9 : {
                        openingDate: '',
                        deadline: '',

                        receptionDate: '',
                        remark: ''
                    },
                    sheet10 : {
                        date: '',
                        time: '',
                        room: '',
                        
                        jury1: '',
                        jury2: '',
                        
                        nbParticipants: '',
                        
                        participants : ''
                    }
                }
            }
        });
        
        // Collection
        Entities.MonitoringCollection = Backbone.Collection.extend({
           url: '/db/monitoring',
           model: Entities.Monitoring
        });
        
        /****************************************/
        /*  EVENTS HANDLERS                     */
        /****************************************/
        
        // Get all the entities
        AppManager.reqres.setHandler('monitoring:entities', function(){
            return API.entities.getEntities(new Entities.MonitoringCollection());
        });
        
        AppManager.reqres.setHandler('monitoring:entity', function(_id){
            return API.entities.getEntity(new Entities.Monitoring({'_id': _id}));
        });
        
        AppManager.reqres.setHandler('monitoring:entity:new', function(_monitoring){
            return new Entities.Monitoring(_monitoring);
        });
        
    });
})