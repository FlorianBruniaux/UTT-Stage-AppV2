define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet10/templates/sheet10_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet10FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet10Form;

        View.sheet10 = Marionette.ItemView.extend({
            template: sheet10FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        date:           { type: 'Text', validators: ['required']},
                        time:           { type: 'Text', validators: ['required', /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/], editorAttrs: {placeholder: "Ex: 14:00" }},
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet10Form = new Backbone.Form({
                        template: _.template($('#sheet10FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(sheet10Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet10Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                    
                    //  To init datepicker
                    //API.misc.initTimePicker();
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

                if( API.views.forms.isFormValid(sheet10Form) ){
                    var data = sheet10Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});