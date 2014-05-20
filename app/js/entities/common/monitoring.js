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
                    sh0: {
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
                        uttResp: {},//object
                        visits: [
                            {
                                date: '',
                                description: ''
                            }
                        ]
                    },
                    sh1 : {
                        name : 'Installation',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        
                        activityField: '',//52 - Commerce de détail..
                        workforce: '',// <5, 5-10, 10-20, 20-50, 50-100, 100-500, >500
                        APE: '',
                        administrativeResp: {
                            firstName: '',
                            lastName: '',
                            position: '',
                            email: '',
                            tel: ''
                        },
                        technicalResp: {
                            firstName: '',
                            lastName: '',
                            position: '',
                            email: '',
                            tel: ''
                        }
                    },
                    sh2 : {
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
                            isIntersting : '',
                            isConcordantWithProfessionalProject : '',
                        },
                        contactWithRespUtt : '',//None, Mail, Tel, Mail+Tel
                        whoseInitiative: ''//student/resp
                    },
                    sh3 : {
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
                    sh4 : {
                        name : 'Company Opinion',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        taxResp: '',
                        isConcordantWithWork: '',
                        satisfaction: '',
                        remark: '',
                        author:''                                            
                    },
                    sh5 : {
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
                        
                        enoughHelpFromUttResp : true
                        
                    },
                    sh6 : {
                        name : 'Auto evaluation',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        criterions : [
                            {
                                name: '',
                                mark: 0
                            }
                        ]
                    },
                    sh7 : {
                        name : 'Company evaluation',
                        openingDate: '',
                        deadline: '',
                        validation: {
                            validated: false,
                            msg: '',
                            by: '',
                            date: ''
                        },
                        
                        criterions : [
                            {
                                name: '',
                                mark: 0
                            }
                        ]
                    },
                    sh8 : {
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
                        reportIsConfidential: false,
                        presentationIsConfidential: false,
                    },
                    sh9 : {
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
                    sh10 : {
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
                                tel: '',
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