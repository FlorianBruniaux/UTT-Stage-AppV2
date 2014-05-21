define([
    'app',
    'utt.stages',
    'tpl!modules/common/monitoring/sheets/edit/sheet0/templates/sheet0_form.tpl',
    'backbone.forms',
    'backbone.forms.bootstrap',
    'css!vendors/bower/backbone-forms/css/bootstrap3.css'
], function(AppManager, UttStages, sheet0FormTpl){
    
    AppManager.module('MonitoringModule.Sheets.Edit.View', function(View, AppManager, Backbone, Marionette, $, _){
        
        var API = new UttStages.Application(AppManager);
        
        var sheet0Form;
        
        View.sheet0 = Marionette.ItemView.extend({
            template: sheet0FormTpl,
            data : '',
            onRender: function(){

                var title = this.options.title;

                data = this.options.model.attributes;
                
                console.log(sheet0Form);
                
                var teachers = [];
                _.each(this.options.teachers, function(_value, _key){
                    teachers.push(_key); 
                });
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required']},
                        deadline:       { type: 'Text', validators: ['required']},
                        'dates.from':   { type: 'Text', validators: ['required']},
                        'dates.to':     { type: 'Text', validators: ['required']},
                        semester:       { type: 'Text', validators: ['required']},
                        uttResp:        { type: 'Select', validators: ['required'], options: teachers},
                    }
                });

                //  The schema of the future bbform
                var bbformModel = new bbformSchema(this.formatSpecificData(data));
                
                
                var self = this;
                setTimeout(function(){

                    //  New bbform with a template
                    sheet0Form = new Backbone.Form({
                        template: _.template($('#sheet0FormTemplate').html()),
                        model: bbformModel
                    }).render();
                    
                    //  Put the form before submit btn
                    $('button.js-submit').before(sheet0Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet0Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                    
                },500);
                
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

                if( API.views.forms.isFormValid(sheet0Form) ){
                    var data = sheet0Form.getValue();

                    this.trigger('form:submit',data)
                }
                
            }
        });
    
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});