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

                data = this.options.model.get('sheets').sheet3;
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
                        subjectHasBeenModified:     { type: 'TextArea', editorAttrs: {placeholder: polyglot.t('letEmptyIfNotModified') }},
                        planningDesc:   { type: 'TextArea'},
                        progress:       { type: 'TextArea'},
                        difficulties:   { type: 'TextArea'},
                        observations:   { type: 'TextArea'}
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
                    $('button.js-submit').parent().before(sheet3Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet3Form, bbformModel);
                    
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
                        
                        var openingDate = this.options.model.get('sheets').sheet3.openingDate;
                        API.views.sheets.checkOpeningDate(openingDate);
                        
                        var deadline = this.options.model.get('sheets').sheet3.deadline;
                        API.views.sheets.checkDeadline(deadline);
                        
                        var sheetValidation = this.options.model.get('sheets').sheet3.validation;
                        API.views.sheets.checkValidation(sheetValidation);
                        
                        break;
                }

            },
            
            formatSpecificData : function(_data){
                    
                //  To set to format DD/MM/YYYY
                _data.openingDate = _data.openingDate;
                _data.deadline = _data.deadline;
                
                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
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