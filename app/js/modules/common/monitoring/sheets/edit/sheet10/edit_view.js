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

                data = this.options.model.get('sheets').sheet10;
                
                //console.log(data);
                
                var teachers = [];
                _.each(this.options.teachers, function(_value, _key){
                    teachers.push(_key); 
                });
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        date:           { type: 'Text', validators: ['required']},
                        time:           { type: 'Text', validators: ['required', /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/], editorAttrs: {placeholder: "Ex: 14:00" }},
                        room:           { type: 'Text', validators: ['required']},
                        jury1:          { type: 'Select', validators: ['required'], options: teachers},
                        jury2:          { type: 'Select', validators: ['required'], options: teachers},
                        nbParticipants:     { type: 'Number', validators: ['required']},
                        participants:       { type: 'TextArea', validators: ['required'], editorAttrs: {placeholder: polyglot.t('sheets.sheet10.participants.placeholder') }}
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
                    $('button.js-submit').parent().before(sheet10Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet10Form, bbformModel);
                    
                    //  To init datepicker
                    API.misc.initDatepicker();
                    
                    //  To set specifications (input disabled etc)
                    self.setUserCategorySpec();
                    
                },500);
                
            },
            
            setUserCategorySpec : function(){
                switch (this.options.userCategory) {
                    case 'teachers':
                        $('input, select, textarea').prop('disabled', true);
                        break;
                    
                    case 'internship_managers':
                        $('button.js-submit').before('<button class="btn btn-success js-validate"><i class="icon-checkmark3"></i>'+polyglot.t('validate')+'</button>');
                        break;
                }
            },
            
            formatSpecificData : function(_data){

                if (_data.jury1 != '') {
                    _data.jury1 = _data.jury1.firstName + ' ' + _data.jury1.lastName;
                }
                if (_data.jury2 != '') {
                    _data.jury2 = _data.jury2.firstName + ' ' + _data.jury2.lastName;
                }

                return _data
            
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
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