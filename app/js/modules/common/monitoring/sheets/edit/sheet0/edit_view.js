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

                data = this.options.model.get('sheets').sheet0;
                
                var teachers = [];
                _.each(this.options.teachers, function(_value, _key){
                    teachers.push(_key); 
                });
                
                //  New model with just a schema
                var bbformSchema = Backbone.Model.extend({
                    schema: {
                        openingDate:    { type: 'Text', validators: ['required'] },
                        deadline:       { type: 'Text', validators: ['required'] },
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
                    $('button.js-submit').parent().before(sheet0Form.el);
                    
                    //  Add title
                    $('h6.panel-title').append(title);

                    //  To set blur event listener
                    API.views.forms.setBlurListener(sheet0Form, bbformModel);
                    
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

                if (_data.uttResp != '') {
                    _data.uttResp =  (_data.uttResp.firstName + ' ' + _data.uttResp.lastName)
                }
                
                //  To set to format DD/MM/YYYY
                _data.openingDate = _data.openingDate;
                _data.deadline = _data.deadline;
                
                //  cf eSubmitClicked for explanatiosn
                _data['dates.from'] = _data.dates.from;
                _data['dates.to'] = _data.dates.to;
                
                return _data
            },
            
            events: {
                'click button.js-validate': API.views.events.validateSheet,
                'click button.js-submit': 'eSubmitClicked'
            },
            
            eSubmitClicked: function(_e){
                
                _e.preventDefault();

                if( API.views.forms.isFormValid(sheet0Form) ){
                    var data = sheet0Form.getValue();

                    //  Bug with bb-forms object type..
                    //  Need to be improved !
                    //  Issue known : https://github.com/powmedia/backbone-forms/issues/376
                    data = {
                        openingDate: data.openingDate,
                        deadline: data.deadline,
                        
                        dates: {
                            from : data['dates.from'],
                            to: data['dates.to']
                        },
                        semester: data.semester,
                        uttResp: data.uttResp
                    }
                    
                    this.trigger('form:submit',data)
                }
                
            }
        });
    
    });
    
    return AppManager.MonitoringModule.Sheets.Edit.View;
});