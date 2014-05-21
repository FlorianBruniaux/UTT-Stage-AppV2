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

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        'subject.description':          { type: 'TextArea', validators: ['required']},
                        'subject.objectives':           { type: 'TextArea', validators: ['required']},
                        'subject.conditions':           { type: 'TextArea', validators: ['required']},
                        'subject.isIntersting':         { type: 'TextArea', validators: ['required']},
                        'subject.isConcordantWithProfessionalProject':      { type: 'TextArea', validators: ['required']},
                        contactWithRespUtt:     { type: 'Select', validators: ['required'], options: ['none', 'mail', 'phone', 'mail + phone'] },
                        whoseInitiative:        { type: 'Select', validators: ['required'], options: ['mine', 'his/her'] }
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
                    $('button.js-submit').before(sheet2Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet2Form, bbformModel);
                    
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

                if( API.views.forms.isFormValid(sheet2Form) ){
                    var data = sheet2Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});