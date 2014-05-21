define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet1/templates/sheet1_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet1FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet1Form;

        View.sheet1 = Marionette.ItemView.extend({
            template: sheet1FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        naf:            { type: 'Select', validators: ['required'], options: this.options.nafCodes },
                        workforce:      { type: 'Select', validators: ['required'], options: ['<5', '5-10', '10-20', '20-50', '50-100', '100-500', '>500'] },
                        'administrativeResp.firstName':     { type: 'Text', validators: ['required']},
                        'administrativeResp.lastName':      { type: 'Text', validators: ['required']},
                        'administrativeResp.position':      { type: 'Text', validators: ['required']},
                        'administrativeResp.email':         { type: 'Text', validators: ['required', 'email']},
                        'administrativeResp.phone':         { type: 'Text', validators: ['required', /^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                        'technicalResp.firstName':          { type: 'Text', validators: ['required']},
                        'technicalResp.lastName':           { type: 'Text', validators: ['required']},
                        'technicalResp.position':           { type: 'Text', validators: ['required']},
                        'technicalResp.email':              { type: 'Text', validators: ['required', 'email']},
                        'technicalResp.phone':              { type: 'Text', validators: ['required', /^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet1Form = new Backbone.Form({
                        template: _.template($('#sheet1FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(sheet1Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet1Form, bbformModel);
                    
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

                if( API.views.forms.isFormValid(sheet1Form) ){
                    var data = sheet1Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});