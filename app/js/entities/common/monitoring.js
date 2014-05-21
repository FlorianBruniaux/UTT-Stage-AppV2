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
                        name: 'Global information',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        dates: {
                            from: '',
                            to: ''
                        },
                        semester: '',//A12,P13 ..
                        uttResp: {}//object
                    },
                    sheet1 : {
                        name : 'Installation',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        
                        naf: '',//52 - Commerce de détail..
                        workforce: '',// <5, 5-10, 10-20, 20-50, 50-100, 100-500, >500
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
                        name : 'Definition',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        subject : {
                            description : '',
                            objectives : '',
                            conditions : '',
                            isInteresting : '',
                            isConcordantWithProfessionalProject : '',
                        },
                        contactWithRespUtt : '',//None, Mail, Tel, Mail+Tel
                        whoseInitiative: ''//student/resp
                    },
                    sheet3 : {
                        name : 'Progress',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        subjectHasBeenModified: false, //if true subject object
                        planningDesc: '',
                        progress: '',
                        difficulties: '',
                        observations: ''
                    },
                    sheet4 : {
                        name : 'Company Opinion',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                         
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
                        name : 'Student Opinion',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        project: '',
                        team: '',
                        company: '',
                        help: '',
                        internshipContribution: '',
                        odds: '',
                        rem: 0,
                        bonus: 0,
                        HelpFromUttResp : {
                            enough: true,
                            explanations: ''
                        }
                        
                    },
                    sheet6 : {
                        name : 'Auto evaluation',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
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
                        name : 'Company evaluation',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
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
                        name : 'Record privacy',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        receptionDate: '',
                        reportIsConfidential: 'no',
                        presentationIsConfidential: 'no',
                    },
                    sheet9 : {
                        name : 'Report',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        receptionDate: '',
                        remark: ''
                    },
                    sheet10 : {
                        name : 'Presentation',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },

                        date: '',
                        time: '',
                        room: '',
                        
                        jury: [
                            {}//object
                        ],
                        
                        participants : [
                            {
                                firstName: '',
                                lastName: '',
                                position: '',
                                email: '',
                                phone: '',
                                lunch: true
                            }
                        ]
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