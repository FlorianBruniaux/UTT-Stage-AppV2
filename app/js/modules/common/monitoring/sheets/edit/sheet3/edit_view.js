define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet3/templates/sheet3_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet3FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet3Form;

        View.sheet3 = Marionette.ItemView.extend({
            template: sheet3FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'TextArea', validators: ['required']},
                        deadline:       { type: 'TextArea', validators: ['required']},
                        subjectHasBeenModified:     { type: 'TextArea', validators: ['required']},
                        planningDesc:   { type: 'TextArea', validators: ['required']},
                        progress:       { type: 'TextArea', validators: ['required']},
                        difficulties:   { type: 'TextArea', validators: ['required']},
                        observations:   { type: 'TextArea', validators: ['required']}
                    }
                });
                
               

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet3Form = new Backbone.Form({
                        template: _.template($('#sheet3FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(sheet3Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet3Form, bbformModel);
                    
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

                if( API.views.forms.isFormValid(sheet3Form) ){
                    var data = sheet3Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});