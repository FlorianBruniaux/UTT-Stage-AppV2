define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet5/templates/sheet5_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet5FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet5Form;

        View.sheet5 = Marionette.ItemView.extend({
            template: sheet5FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.get('sheets').sheet5;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
                        project:        { type: 'TextArea'},
                        team:           { type: 'TextArea'},
                        company:        { type: 'TextArea'},
                        help:           { type: 'TextArea'},
                        internshipContribution:       { type: 'TextArea'},
                        rem:            { type: 'Number'},
                        bonus:          { type: 'Number'},
                        odds:           { type: 'TextArea'},
                        'helpFromUttResp.enough':           { type: 'Select', options: ['yes','no'] },
                        'helpFromUttResp.explanations':     { type: 'TextArea'}
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet5Form = new Backbone.Form({
                        template: _.template($('#sheet5FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').parent().before(sheet5Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet5Form, bbformModel);
                    
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
                        
                        var openingDate = this.options.model.get('sheets').sheet5.openingDate;
                        API.views.sheets.checkOpeningDate(openingDate);
                        
                        var deadline = this.options.model.get('sheets').sheet5.deadline;
                        API.views.sheets.checkDeadline(deadline);
                        
                        var sheetValidation = this.options.model.get('sheets').sheet5.validation;
                        API.views.sheets.checkValidation(sheetValidation);
                        
                        break;
                }

            },
            
            formatSpecificData : function(_data){
                    
                //  To set to format DD/MM/YYYY
                _data.openingDate = _data.openingDate;
                _data.deadline = _data.deadline;
            
                _data['helpFromUttResp.enough'] = _data.enough;
                _data['helpFromUttResp.explanations'] = _data.explanations;
                
                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet5Form) ){
                    var data = sheet5Form.getValue();

                    data = {
                        openingDate: data.openingDate,
                        deadline: data.deadline,
                        
                        project: data.project,
                        team: data.team,
                        company: data.company,
                        help: data.help,
                        internshipContribution: data.internshipContribution,
                        odds: data.odds,
                        rem: data.rem,
                        bonus: data.bonus,
                        helpFromUttResp : {
                            enough: data['helpFromUttResp.enough'],
                            explanations: data['helpFromUttResp.explanations'],
                        } 
                    }
                    
                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});