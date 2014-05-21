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

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        project:        { type: 'TextArea', validators: ['required']},
                        team:           { type: 'TextArea', validators: ['required']},
                        company:        { type: 'TextArea', validators: ['required']},
                        help:           { type: 'TextArea', validators: ['required']},
                        internshipContribution:       { type: 'TextArea', validators: ['required']},
                        rem:            { type: 'Number', validators: ['required']},
                        bonus:          { type: 'Number', validators: ['required']},
                        odds:           { type: 'TextArea', validators: ['required']},
                        'HelpFromUttResp.enough':           { type: 'Select', validators: ['required'], options: ['yes','no'] },
                        'HelpFromUttResp.explanations':     { type: 'TextArea', validators: ['required']}
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
                    $('button.js-submit').before(sheet5Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet5Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                    
                },300);
                
            },
            
            formatSpecificData : function(_data){
                //nothing to format
                return _data
            },
            
            events: {
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet5Form) ){
                    var data = sheet5Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});