define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet4/templates/sheet4_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet4FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet4Form;

        View.sheet4 = Marionette.ItemView.extend({
            template: sheet4FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        isConcordantWithWork:       { type: 'TextArea', validators: ['required']},
                        satisfaction:   { type: 'TextArea', validators: ['required']},
                        globalOpinion:   { type: 'TextArea', validators: ['required']},
                        'taxResp.firstName':     { type: 'Text', validators: ['required']},
                        'taxResp.lastName':      { type: 'Text', validators: ['required']},
                        'taxResp.position':      { type: 'Text', validators: ['required']},
                        'taxResp.email':         { type: 'Text', validators: ['required', 'email']},
                        'taxResp.phone':         { type: 'Text', validators: ['required', /^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                        'author.firstName':          { type: 'Text', validators: ['required']},
                        'author.lastName':           { type: 'Text', validators: ['required']},
                        'author.position':           { type: 'Text', validators: ['required']},
                        'author.email':              { type: 'Text', validators: ['required', 'email']},
                        'author.phone':              { type: 'Text', validators: ['required', /^(0[1-68])(?:[ _.-]?(\d{2})){4}$/]},
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet4Form = new Backbone.Form({
                        template: _.template($('#sheet4FormTemplate').html()),
                        model: bbformModel
                    }).render();

                    //  Put the form before submit btn
                    $('button.js-submit').before(sheet4Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet4Form, bbformModel);
                    
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

                if( API.views.forms.isFormValid(sheet4Form) ){
                    var data = sheet4Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});