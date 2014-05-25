define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet2/templates/sheet2_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet2FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet2Form;

        View.sheet2 = Marionette.ItemView.extend({
            template: sheet2FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.get('sheets').sheet2;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
                        'subject.description':          { type: 'TextArea'},
                        'subject.objectives':           { type: 'TextArea'},
                        'subject.conditions':           { type: 'TextArea'},
                        'subject.isIntersting':         { type: 'TextArea'},
                        'subject.isConcordantWithProfessionalProject':      { type: 'TextArea'},
                        contactWithRespUtt:     { type: 'Select', options: [polyglot.t('none.m'), 'Mail', polyglot.t('phone'), 'Mail + '+polyglot.t('phone')] },
                        whoseInitiative:        { type: 'Select', options: [polyglot.t('mine'), polyglot.t('his/her')] }
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet2Form = new Backbone.Form({
                        template: _.template($('#sheet2FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').parent().before(sheet2Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet2Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                    
                    //  To set specifications (input disabled etc)
                    self.setUserCategorySpec();
                    
                },300);
                
            },
            
            setUserCategorySpec : function(){
                switch (this.options.userCategory) {
                    case 'teachers':
                        $('input, select, textarea').prop('disabled', true);
                        break;
                    
                    case 'internship_managers':
                        $('button.js-submit').before('<button class="btn btn-success js-validate"><i class="icon-checkmark3"></i>'+polyglot.t('validate')+'</button>');
                        break;
                    
                    case 'students':
                        $('input[name="openingDate"], input[name="deadline"]').prop('disabled', true);
                        
                        var openingDate = this.options.model.get('sheets').sheet2.openingDate;
                        API.views.sheets.checkOpeningDate(openingDate);
                        
                        var deadline = this.options.model.get('sheets').sheet2.deadline;
                        API.views.sheets.checkDeadline(deadline);
                        
                        var sheetValidation = this.options.model.get('sheets').sheet2.validation;
                        API.views.sheets.checkValidation(sheetValidation);
                        
                        break;
                }

            },
            
            formatSpecificData : function(_data){
                    
                //  To set to format DD/MM/YYYY
                _data.openingDate = _data.openingDate;
                _data.deadline = _data.deadline;
                
                _data['subject.description'] = _data.description;
                _data['subject.objectives'] = _data.objectives;
                _data['subject.conditions'] = _data.conditions;
                _data['subject.isInteresting'] = _data.isInteresting;
                _data['subject.isConcordantWithProfessionalProject'] = _data.isConcordantWithProfessionalProject;
                            
                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet2Form) ){
                    var data = sheet2Form.getValue();

                    data = {
                        openingDate: data.openingDate,
                        deadline: data.deadline,

                        subject : {
                            description : data['subject.description'],
                            objectives : data['subject.objectives'],
                            conditions : data['subject.conditions'],
                            isInteresting : data['subject.isInteresting'],
                            isConcordantWithProfessionalProject : data['subject.isConcordantWithProfessionalProject'],
                        },
                        contactWithRespUtt : data.contactWithRespUtt,
                        whoseInitiative: data.whoseInitiative
                    }
                    
                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});